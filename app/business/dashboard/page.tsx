"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

function Stats() {
  const [counts, setCounts] = useState({
    total: 0,
    success: 0,
    time: 0,
    fraud: 0,
  });

  useEffect(() => {
    let t = 0;
    let s = 0;
    let time = 0;
    let f = 0;

    const interval = setInterval(() => {
      if (t < 12482) t += 320;
      if (s < 96) s += 2;
      if (time < 84) time += 2;
      if (f < 213) f += 3;

      setCounts({
        total: t,
        success: s,
        time: time,
        fraud: f,
      });

      if (t >= 12482 && s >= 96 && time >= 84 && f >= 213) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-[#1E293B] border-none">
        <CardContent className="p-5">
          <p className="text-xs text-slate-400">Total Verifications</p>
          <h2 className="text-xl font-semibold mt-1">
            {counts.total.toLocaleString()}
          </h2>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-none">
        <CardContent className="p-5">
          <p className="text-xs text-slate-400">Success Rate</p>
          <h2 className="text-xl font-semibold text-green-400 mt-1">
            {counts.success}%
          </h2>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-none">
        <CardContent className="p-5">
          <p className="text-xs text-slate-400">Avg Time</p>
          <h2 className="text-xl font-semibold text-[#7BA4D0] mt-1">
            {counts.time}s
          </h2>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-none">
        <CardContent className="p-5">
          <p className="text-xs text-slate-400">Fraud Flags</p>
          <h2 className="text-xl font-semibold text-red-400 mt-1">
            {counts.fraud}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BusinessDashboard() {
  const DEMO_API_KEY = "NECORE_DEMO_KEY_2026"; // ✅ SAFE

  const requests = [
    {
      name: "John Doe",
      type: "NIN + Voter Card",
      status: "Verified",
      time: "1 min ago",
    },
    {
      name: "Ada Nwoye",
      type: "NIN + Bank Statement",
      status: "Pending",
      time: "5 min ago",
    },
    {
      name: "Michael James",
      type: "Passport",
      status: "Flagged",
      time: "12 min ago",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0F172A] px-6 py-8 text-white">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <img
              src="/necore-logo.png"
              alt="NECore Logo"
              className="h-14 w-auto scale-120"
            />

            <div>
              <h1 className="text-xl font-semibold leading-none">
                NECore
              </h1>
              <p className="text-xs text-slate-400">
                Identity Infrastructure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
            ● API LIVE
          </div>
        </div>

        <Stats />

        {/* RECENT */}
        <div className="bg-[#1E293B] rounded-xl p-6">
          <h2 className="text-sm text-slate-400 mb-5">
            Recent Verifications
          </h2>

          <div className="space-y-4">
            {requests.map((req, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-slate-700 pb-3"
              >
                <div>
                  <p className="text-sm font-medium">{req.name}</p>
                  <p className="text-xs text-slate-400">{req.type}</p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xs font-medium ${
                      req.status === "Verified"
                        ? "text-green-400"
                        : req.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {req.status}
                  </p>
                  <p className="text-xs text-slate-500">
                    {req.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API SECTION */}
        <div className="bg-[#1E293B] rounded-xl p-6 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-sm text-slate-400">
              API Integration
            </h2>

            <button
              onClick={() => {
                navigator.clipboard.writeText(DEMO_API_KEY);
                alert("API Key copied");
              }}
              className="text-xs bg-[#2E5E99] px-3 py-1 rounded-md hover:opacity-80"
            >
              Copy Key
            </button>
          </div>

          {/* API KEY DISPLAY */}
          <div className="bg-[#0F172A] p-4 rounded-lg text-xs font-mono text-slate-300 break-all">
            {DEMO_API_KEY}
          </div>

          {/* ENDPOINTS */}
          <div className="space-y-3 text-sm">

            <div className="flex items-center justify-between bg-[#0F172A] p-3 rounded-lg">
              <div>
                <p className="text-green-400 text-xs">POST</p>
                <p className="text-slate-300 font-mono">
                  /api/verify-user
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText("/api/verify-user");
                  alert("Endpoint copied");
                }}
                className="text-xs bg-[#2E5E99] px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#0F172A] p-3 rounded-lg">
              <div>
                <p className="text-blue-400 text-xs">GET</p>
                <p className="text-slate-300 font-mono">
                  /api/verification-status
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText("/api/verification-status");
                  alert("Endpoint copied");
                }}
                className="text-xs bg-[#2E5E99] px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>

          </div>

          {/* RESPONSE */}
          <div className="bg-[#0F172A] p-4 rounded-lg text-xs font-mono text-slate-400">
{`{
  "user_id": "12345",
  "status": "verified",
  "trust_score": 82,
  "risk_level": "low"
}`}
          </div>

        </div>

      </div>
    </main>
  );
}