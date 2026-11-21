import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-sm text-[var(--primary)]">
          BROWSERGUARD / DASHBOARD
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          Welcome, {user?.displayName}
        </h1>

        <p className="mt-2 text-[var(--text-secondary)]">
          Your authenticated dashboard route is ready.
        </p>
      </div>
    </main>
  );
}

export default DashboardPage;
