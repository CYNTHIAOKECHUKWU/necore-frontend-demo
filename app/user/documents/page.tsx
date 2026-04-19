"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function DocumentPage() {
  const [dragging, setDragging] = useState(false);

  const documents = [
    {
      name: "Passport",
      status: "verified",
      date: "2 days ago",
      score: 98,
    },
    {
      name: "Driver’s License",
      status: "pending",
      date: "5 mins ago",
      score: 76,
    },
    {
      name: "Utility Bill",
      status: "rejected",
      date: "Yesterday",
      reason: "Image too blurry",
      score: 42,
    },
  ];

  const getStatus = (status: string) => {
    if (status === "verified") {
      return {
        color: "text-green-400",
        bg: "bg-green-500/10",
        icon: <CheckCircle2 size={14} />,
        label: "Verified",
      };
    }
    if (status === "pending") {
      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        icon: <Clock size={14} />,
        label: "Pending",
      };
    }
    return {
      color: "text-red-400",
      bg: "bg-red-500/10",
      icon: <AlertCircle size={14} />,
      label: "Rejected",
    };
  };

  return (
    <main className="min-h-screen bg-[#0F172A] px-4 md:px-6 py-8 md:py-10 text-white">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Document Center
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage and track your identity documents
            </p>
          </div>

          <Button
            className="bg-gradient-to-r from-[#2E5E99] to-cyan-500 text-white flex items-center justify-center gap-2 w-full md:w-auto"
            onClick={() => (window.location.href = "/user/upload-document")}
          >
            <UploadCloud size={16} />
            Upload Document
          </Button>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

          <Card className="bg-[#1E293B] border border-[#334155]">
            <CardContent className="p-4">
              <p className="text-xs text-slate-400">Total</p>
              <h2 className="text-lg md:text-xl font-semibold mt-1">3</h2>
            </CardContent>
          </Card>

          <Card className="bg-[#1E293B] border border-[#334155]">
            <CardContent className="p-4">
              <p className="text-xs text-slate-400">Verified</p>
              <h2 className="text-lg md:text-xl font-semibold text-green-400 mt-1">
                2
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-[#1E293B] border border-[#334155] col-span-2 md:col-span-1">
            <CardContent className="p-4">
              <p className="text-xs text-slate-400">Pending</p>
              <h2 className="text-lg md:text-xl font-semibold text-yellow-400 mt-1">
                1
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* ================= DRAG & DROP ================= */}
        <div
          className={`border-2 border-dashed rounded-xl p-6 md:p-10 text-center transition
          ${dragging ? "border-[#2E5E99] bg-[#1E293B]" : "border-[#334155]"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
        >
          <UploadCloud className="mx-auto text-[#2E5E99] mb-3" size={36} />

          <p className="text-sm text-slate-300">
            Drag & drop your document here
          </p>

          <p className="text-xs text-slate-500 mt-1">
            or click upload button above
          </p>
        </div>

        {/* ================= DOCUMENT LIST ================= */}
        <Card className="bg-[#1E293B] border border-[#334155]">
          <CardContent className="p-4 md:p-6 space-y-5">

            <h2 className="text-sm text-slate-400">
              Uploaded Documents
            </h2>

            <div className="space-y-4">

              {documents.map((doc, index) => {
                const status = getStatus(doc.status);

                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#334155] pb-4"
                  >
                    {/* LEFT */}
                    <div className="flex items-start gap-3">

                      <div className="p-2 rounded-lg bg-[#0F172A]">
                        <FileText size={18} className="text-[#2E5E99]" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {doc.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          Uploaded {doc.date}
                        </p>

                        {/* AI SCORE */}
                        <p className="text-xs text-[#2E5E99] mt-1">
                          Confidence: {doc.score}%
                        </p>

                        {doc.status === "rejected" && (
                          <p className="text-xs text-red-400 mt-1">
                            Reason: {doc.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                      {/* STATUS */}
                      <span
                        className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 w-fit ${status.bg} ${status.color}`}
                      >
                        {status.icon}
                        {status.label}
                      </span>

                      {/* ACTIONS */}
                      <div className="flex gap-2">

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#334155] text-slate-300 hover:bg-[#263244]"
                        >
                          View
                        </Button>

                        {doc.status !== "verified" && (
                          <Button
                            size="sm"
                            className="bg-[#2E5E99] hover:bg-[#244c80] text-white"
                          >
                            Replace
                          </Button>
                        )}

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

          </CardContent>
        </Card>

        {/* ================= SECURITY NOTE ================= */}
        <p className="text-xs text-slate-500 text-center px-4">
          Your documents are encrypted and securely stored using NECore identity infrastructure.
        </p>

      </div>
    </main>
  );
}