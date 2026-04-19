"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ShieldCheck } from "lucide-react";

const API_BASE = "https://necore-backend-deploy.onrender.com/api/verifications";

export default function VerificationFlow() {
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [aiSteps, setAiSteps] = useState<string[]>([]);
  const [trustScore, setTrustScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const documents = [
    { id: "passport", label: "International Passport" },
    { id: "voters_card", label: "Voter's Card" },
    { id: "drivers_license", label: "Driver's License" },
    { id: "national_id", label: "National ID" },
  ];

  /* ================= FILE ================= */
  const handleFile = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  /* ================= START ================= */
  const startVerification = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/start`,
        {
          userId: `user_${Date.now()}`,
          businessId: "demo_bank",
          documentType: selectedDoc,
        },
        {
          headers: {
            "x-api-key": "necore_super_secret_key_123",
          },
        }
      );

      return response.data.verificationId;
    } catch (error) {
      console.error("START ERROR", error);
      return null;
    }
  };

  /* ================= UPLOAD ================= */
  const uploadDocument = async (id: string) => {
    const formData = new FormData();
    formData.append("verificationId", id);
    formData.append("file", file as File);

    await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": "necore_super_secret_key_123",
      },
    });
  };

  /* ================= RESULT ================= */
  const fetchResult = async (id: string) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      setTrustScore(res.data.trustScore);

      // safe transition trigger
      setTimeout(() => {
        setRedirect(true);
      }, 800);
    } catch (error) {
      console.error("RESULT ERROR", error);
    }
  };

  /* ================= FLOW ================= */
  const handleContinue = async () => {
    if (!file || !selectedDoc) return;

    setLoading(true);

    const id = await startVerification();
    if (!id) {
      setLoading(false);
      return;
    }

    await uploadDocument(id);

    setVerificationId(id);
    setStep(2);
    setLoading(false);
  };

  /* ================= AI SIMULATION ================= */
  useEffect(() => {
    if (step !== 2 || !verificationId) return;

    const steps = [
      "Initializing verification engine...",
      "Scanning uploaded document...",
      "Extracting identity metadata...",
      "Cross-checking national records...",
      "Running fraud detection...",
      "Calculating trust score...",
    ];

    let i = 0;

    const interval = setInterval(() => {
      if (i < steps.length) {
        setAiSteps((prev) => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        fetchResult(verificationId);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [step, verificationId]);

  /* ================= SAFE NAVIGATION ================= */
  useEffect(() => {
    if (!redirect || !verificationId) return;

    const timer = setTimeout(() => {
      window.location.replace(`/user/dashboard?vid=${verificationId}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [redirect, verificationId]);

  return (
    <main className="min-h-screen bg-[#0F172A] px-6 py-14 text-white">
      <div className="max-w-3xl mx-auto space-y-10">

        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Identity Verification
          </h1>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`cursor-pointer border ${
                    selectedDoc === doc.id
                      ? "border-[#2E5E99]"
                      : "border-[#1E293B]"
                  }`}
                >
                  <CardContent className="p-5">
                    {doc.label}
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedDoc && (
              <label>
                <input
                  type="file"
                  hidden
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    e.target.files && handleFile(e.target.files[0])
                  }
                />

                <div className="border-2 border-dashed border-slate-600 p-10 text-center cursor-pointer">
                  <Upload className="mx-auto mb-3" />
                  {file ? file.name : "Click to upload document"}
                </div>
              </label>
            )}

            <div className="mt-10 flex justify-center">
              <Button
                disabled={!file || loading}
                onClick={handleContinue}
                className="bg-linear-to-r from-[#2E5E99] to-cyan-500 text-white px-8 flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Start Verification"
                )}
              </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="text-center space-y-6">
            <ShieldCheck className="mx-auto text-[#2E5E99]" size={48} />

            <div className="space-y-2 text-sm text-left max-w-md mx-auto">
              {aiSteps.map((msg, i) => (
                <p key={i}>• {msg}</p>
              ))}
            </div>

            {trustScore !== null && (
              <div className="text-green-400 text-lg">
                Trust Score: {trustScore}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}