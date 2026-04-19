"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const user = {
    name: "Chiamaka Okechukwu",
    email: "chiama@example.com",
    phone: "+234 800 000 0000",
    country: "Nigeria",
    status: "Unverified", // Verified | Pending | Rejected
  };

  const getStatusStyle = () => {
    if (user.status === "Verified")
      return "bg-green-500/10 text-green-400";
    if (user.status === "Pending")
      return "bg-yellow-500/10 text-yellow-400";
    return "bg-red-500/10 text-red-400";
  };

  return (
    <main className="min-h-screen bg-[#0F172A] px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full 
                          bg-gradient-to-br from-[#2E5E99] to-cyan-500
                          flex items-center justify-center
                          text-lg font-semibold
                          shadow-[0_0_20px_rgba(46,94,153,0.6)]">
            CO
          </div>

          <div>
            <h1 className="text-2xl font-semibold">
              {user.name}
            </h1>
            <p className="text-sm text-slate-400">
              Manage your personal information and security
            </p>
          </div>
        </div>

        {/* ================= IDENTITY INFO ================= */}
        <Card className="bg-[#1E293B] border border-[#334155]">
          <CardContent className="p-6 space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="font-medium text-[#2E5E99]">
                Identity Information
              </h2>

              <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle()}`}>
                {user.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <Info label="Full Name" value={user.name} />
              <Info label="Email Address" value={user.email} />
              <Info label="Phone Number" value={user.phone} />
              <Info label="Country" value={user.country} />
            </div>

          </CardContent>
        </Card>

        {/* ================= VERIFICATION ================= */}
        <Card className="bg-[#1E293B] border border-[#334155]">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="font-medium text-[#2E5E99]">
                Identity Verification
              </h2>
              <p className="text-sm text-slate-400">
                Complete verification to unlock full platform access
              </p>
            </div>

            <Button
              asChild
              className="bg-gradient-to-r from-[#2E5E99] to-cyan-500 text-white hover:opacity-90"
            >
              <a href="/user/verify">Start Verification</a>
            </Button>

          </CardContent>
        </Card>

        {/* ================= SECURITY ================= */}
        <Card className="bg-[#1E293B] border border-[#334155]">
          <CardContent className="p-6 space-y-4">

            <h2 className="font-medium text-[#2E5E99]">
              Security
            </h2>

            <div className="flex flex-col md:flex-row gap-3">

              <Button
                variant="outline"
                className="border-[#334155] text-slate-300 hover:bg-[#263244]"
              >
                Change Password
              </Button>

              <Button
                variant="outline"
                className="border-[#334155] text-slate-300 hover:bg-[#263244]"
              >
                Enable 2FA
              </Button>

              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Logout
              </Button>

            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}

/* reusable info row */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  );
}