const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
).replace(/\/+$/, "");

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
}

interface CsrfTokenResponse {
  success: boolean;
  message: string;
  code?: string;
  data?: {
    csrfToken: string;
  };
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export class ApiError extends Error {
  status: number;
  success: boolean;
  code?: string;

  constructor(message: string, status: number, success = false, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.success = success;
    this.code = code;
  }
}

let csrfToken: string | null = null;
let csrfTokenRequest: Promise<string> | null = null;

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Retrieves a CSRF token from the backend.
 * Reuses an existing token and prevents duplicate requests.
 */
export const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  if (!csrfTokenRequest) {
    csrfTokenRequest = (async (): Promise<string> => {
      const response = await fetch(`${API_BASE_URL}/csrf/token`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      const result = (await response
        .json()
        .catch(() => null)) as CsrfTokenResponse | null;

      const token = result?.data?.csrfToken;

      if (!response.ok || typeof token !== "string" || !token) {
        throw new ApiError(
          result?.message || "Unable to initialize security token.",
          response.status,
          result?.success ?? false,
          result?.code,
        );
      }

      csrfToken = token;

      return token;
    })().finally(() => {
      csrfTokenRequest = null;
    });
  }

  return csrfTokenRequest;
};

/**
 * Clears the in-memory CSRF token.
 * The next state-changing request will retrieve a new one.
 */
export const clearCsrfToken = (): void => {
  csrfToken = null;
};

/**
 * Sends an HTTP request to the BrowserGuard API.
 * Automatically includes cookies and CSRF protection.
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> => {
  const method = (options.method || "GET").toUpperCase();

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  let body: BodyInit | undefined;

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  // Attach CSRF token to state-changing requests.
  if (!safeMethods.has(method)) {
    const token = await getCsrfToken();

    headers.set("X-CSRF-Token", token);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    method,
    headers,
    body,
    credentials: "include",
  });

  const result = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok) {
    throw new ApiError(
      result?.message || "Something went wrong. Please try again.",
      response.status,
      result?.success ?? false,
      result?.code,
    );
  }

  if (!result) {
    throw new ApiError(
      "The server returned an invalid response. Please try again.",
      response.status,
    );
  }

  return result;
};
