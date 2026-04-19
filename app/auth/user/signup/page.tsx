import SignupForm from '@/components/auth/user/signup-form';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      
      <div className="w-full max-w-lg bg-white shadow-sm border border-slate-200 rounded-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0D2440]">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Register to begin your identity verification process.
          </p>
        </div>

        {/* Form Component */}
        <SignupForm />

      </div>
    </main>
  );
}
