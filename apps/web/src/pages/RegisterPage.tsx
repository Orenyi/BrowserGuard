import Container from "../components/common/Container";
import LoginHeader from "../components/login/LoginHeader";
import RegisterShowcase from "../components/register/RegisterShowcase";
import RegisterForm from "../components/register/RegisterForm";

import DottedBG from "../assets/images/DottedBG.webp";

function RegisterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[var(--bg)]">
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-[var(--primary)] opacity-[0.035] blur-[150px]"
      />

      {/* Full-width dotted wave at the bottom */}
      <img
        src={DottedBG}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-0 z-0 block h-auto w-full max-w-none select-none opacity-40 md:-bottom-28 lg:-bottom-36 xl:-bottom-44"
      />

      {/* Shared application container */}
      <Container className="relative z-10 flex min-h-screen flex-col">
        <LoginHeader />

        <div className="grid flex-1 grid-cols-1 items-start gap-8 pb-12 pt-5 sm:gap-8 sm:pb-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-4 xl:gap-16">
          {/* Left: registration showcase */}
          <div className="min-w-0">
            <RegisterShowcase />
          </div>

          {/* Right: registration form */}
          <section className="flex min-w-0 justify-start lg:justify-end">
            <div className="w-full max-w-[560px] rounded-2xl border border-[var(--border-green)] bg-[rgba(5,18,9,0.78)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7 lg:p-6 xl:p-8">
              <RegisterForm />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default RegisterPage;
