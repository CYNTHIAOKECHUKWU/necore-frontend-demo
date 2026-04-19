"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Wallet, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = "https://necore-backend-deploy.onrender.com/api/verifications";

export default function VerificationWallet() {
  const searchParams = useSearchParams();

  const [trustScore, setTrustScore] = useState<number>(0);
  const [documentType, setDocumentType] = useState<string>("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setDate(new Date().toLocaleDateString());

    const vid = searchParams.get("vid");
    if (!vid) return;

    axios
      .get(`${API_BASE}/${vid}`)
      .then((res) => {
        setTrustScore(res.data.trustScore || 0);
        setDocumentType(res.data.documentType || "passport");
      })
      .catch((err) => {
        console.error("WALLET FETCH ERROR", err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#0F172A] px-6 py-14 text-white">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <Wallet className="mx-auto text-[#2E5E99]" size={48} />
          <h1 className="text-2xl font-semibold">
            NECore Verification Wallet
          </h1>
          <p className="text-sm text-slate-400">
            Your verified identity credentials
          </p>
        </div>

        {/* CARD */}
        <Card className="border border-[#334155] bg-[#1E293B] shadow-lg">
          <CardContent className="p-8 space-y-8">

            {/*  LOADING STATE */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">

                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-[#2E5E99] border-t-transparent rounded-full animate-spin" />

                <p className="text-sm text-slate-400">
                  Fetching your credentials...
                </p>

              </div>
            ) : (
              <>
                {/* VERIFIED */}
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-400" size={30} />
                  <div>
                    <p className="text-lg font-semibold">
                      Identity Verified
                    </p>
                    <p className="text-sm text-slate-400">
                      Stored securely in your NECore wallet
                    </p>
                  </div>
                </div>

                {/* TRUST SCORE */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">Trust Score</p>

                  <div className="w-full bg-[#334155] rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-[#2E5E99] to-cyan-500 transition-all duration-700"
                      style={{ width: `${trustScore}%` }}
                    />
                  </div>

                  <p className="text-green-400 font-semibold">
                    {trustScore}
                  </p>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-6 text-sm">

                  <div>
                    <p className="text-slate-400">Verified Document</p>
                    <p className="font-medium capitalize">
                      {documentType || "passport"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className="font-medium text-green-400">
                      Verified
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Verification Date</p>
                    <p className="font-medium">{date}</p>
                  </div>

                  <div>
                    <p className="text-slate-400">Issued By</p>
                    <p className="font-medium">
                      NECore Identity Network
                    </p>
                  </div>

                </div>

                {/* BUTTON */}
                <div className="text-center">
                  <Button className="bg-gradient-to-r from-[#2E5E99] to-cyan-500 text-white flex items-center gap-2">
                    <Share2 size={16} />
                    Share Verification
                  </Button>
                </div>
              </>
            )}

          </CardContent>
        </Card>

      </div>
    </main>
  );
}