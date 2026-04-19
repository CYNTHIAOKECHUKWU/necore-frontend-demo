import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0D2440]">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to continue to NECore
          </p>
        </div>

        <LoginForm />

      </div>
    </main>
  );
}
