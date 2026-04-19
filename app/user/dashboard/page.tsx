"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  FileText,
  Wallet
} from "lucide-react";

const API_BASE = "https://necore-backend-deploy.onrender.com/api/verifications";

export default function UserDashboard() {

  const router = useRouter();
   const searchParams = useSearchParams(); 

  const [verificationData, setVerificationData] = useState({
    trustScore: 0,
    verificationId: "",
    status: "pending",
    progress: 0
  });

  const [documents] = useState([
    { name: "Passport", status: "verified" },
    { name: "Driver License", status: "verified" },
    { name: "National ID", status: "pending" }
  ]);

  /* ================= FETCH RESULT ================= */

 
 useEffect(() => {
    const vid = searchParams.get("vid");
  if (!vid) return;

  axios
    .get(`${API_BASE}/${vid}`)
     .then((res: { data: any }) => {
      const data = res.data;

      setVerificationData({
        trustScore: data.trustScore || 0,
        verificationId: data.verificationId,
        status: data.status,
        progress: data.status === "verified" ? 100 : 60
      });
    })
    .catch((err: unknown) => {
      console.error("DASHBOARD FETCH ERROR", err);
    });

}, [searchParams]);

  /* ================= PROGRESS CIRCLE ================= */

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (verificationData.progress / 100) * circumference;

  return (

    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            NECore Identity Dashboard
          </h1>

          <p className="text-sm text-slate-400">
            Manage your verified digital identity
          </p>
        </div>

        <Button
          onClick={() => router.push("/user/verify")}
          className="bg-linear-to-r from-[#2E5E99] to-cyan-500 text-white"
        >
          Verify Identity
        </Button>

      </div>

      {/* VERIFICATION STATUS */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-[#2E5E99]" />

            <h3 className="text-white font-medium">
              Verification Status
            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* CIRCULAR PROGRESS */}

            <div className="flex items-center justify-center">

              <div className="relative w-32 h-32">

                <svg className="w-full h-full -rotate-90">

                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="#1E293B"
                    strokeWidth="10"
                    fill="transparent"
                  />

                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />

                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#2E5E99" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>

                </svg>

                <div className="absolute inset-0 flex items-center justify-center flex-col">

                  <p className="text-2xl font-semibold text-white">
                    {verificationData.progress}%
                  </p>

                  <p className="text-xs text-slate-400">
                    Verified
                  </p>

                </div>

              </div>

            </div>

            {/* VERIFICATION INFO */}

            <div className="space-y-4">

              <div>
                <p className="text-xs text-slate-400">
                  Verification ID
                </p>

                <p className="text-white text-sm">
                  {verificationData.verificationId}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Status
                </p>

                <p className="text-green-400">
                  {verificationData.status}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Trust Score
                </p>

                <p className="text-[#2E5E99] text-xl font-semibold">
                  {verificationData.trustScore}
                </p>
              </div>

            </div>

          </div>

        </CardContent>

      </Card>

      <div className="grid md:grid-cols-3 gap-6">
      {/* DOCUMENTS */}

    <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <h3 className="text-white font-medium">
            Uploaded Documents
          </h3>

          {documents.map((doc, i) => (

            <div
              key={i}
              className="flex justify-between items-center"
            >

              <div className="flex items-center gap-3">

                <FileText
                  className="text-[#2E5E99]"
                  size={16}
                />

                <p className="text-sm text-slate-300">
                  {doc.name}
                </p>

              </div>

              <span
                className={`text-xs ${
                  doc.status === "verified"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {doc.status}
              </span>

            </div>

          ))}

        </CardContent>

      </Card>

      {/* IDENTITY WALLET */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <div className="flex items-center gap-3">

            <Wallet className="text-[#2E5E99]" />

            <h3 className="text-white font-medium">
              Identity Wallet
            </h3>

          </div>

          <p className="text-sm text-slate-400">

            Your verified credentials are securely stored and
            reusable across businesses integrated with NECore.

          </p>

          <Button
           onClick={() => {
             const params = new URLSearchParams(window.location.search);
              const vid = params.get("vid");

             if (!vid) return;

              router.push(`/user/wallet_id?vid=${vid}`);
     }}
            className="w-full bg-linear-to-r from-[#2E5E99] to-cyan-500 text-white"
          >
            Open Wallet
          </Button>

        </CardContent>

      </Card>
      

            {/* ================= AI VERIFICATION ENGINE ================= */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <h3 className="text-white font-medium">
            AI Verification Engine
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <p className="text-slate-400">Document Authenticity</p>
              <span className="text-green-400">Passed</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Face Match Confidence</p>
              <span className="text-[#2E5E99]">92%</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Fraud Detection</p>
              <span className="text-yellow-400">Low Risk</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Database Cross-Check</p>
              <span className="text-green-400">Verified</span>
            </div>

          </div>

        </CardContent>

      </Card>
       </div>

          <div className="grid md:grid-cols-3 gap-6">
      {/* ================= SECURITY CENTER ================= */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <h3 className="text-white font-medium">
            Security Center
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <p className="text-slate-400">Encryption</p>
              <span className="text-green-400">AES-256 Active</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Biometric Lock</p>
              <span className="text-green-400">Enabled</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Fraud Monitoring</p>
              <span className="text-[#2E5E99]">Active</span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-400">Identity Protection</p>
              <span className="text-green-400">Protected</span>
            </div>

          </div>

        </CardContent>

      </Card>


        
      {/* ================= RECENT IDENTITY ACTIVITY ================= */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-5">

          <h3 className="text-white font-medium">
            Recent Identity Activity
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <p className="text-slate-300">
                Document uploaded
              </p>
              <span className="text-slate-500">
                2 minutes ago
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-300">
                AI verification completed
              </p>
              <span className="text-slate-500">
                1 minute ago
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-300">
                Trust score generated
              </p>
              <span className="text-slate-500">
                Just now
              </span>
            </div>

          </div>

        </CardContent>

      </Card>



      {/* ================= TRUST CERTIFICATE ================= */}

      <Card className="bg-[#0F172A] border border-[#1E293B]">

        <CardContent className="p-6 space-y-6">

          <h3 className="text-white font-medium">
            NECore Trust Certificate
          </h3>

          <p className="text-sm text-slate-400">

            This identity has been verified using NECore's
            multi-layer AI verification infrastructure.

          </p>

          <div className="flex justify-between items-center">

            <span className="text-xs bg-[#052e1a] text-green-400 px-3 py-1 rounded-md">
              Trusted Identity
            </span>

            <span className="text-sm text-[#2E5E99] font-semibold">
              Score: {verificationData.trustScore}
            </span>

          </div>

        </CardContent>

      </Card>
      </div>

    </div>

  );

}