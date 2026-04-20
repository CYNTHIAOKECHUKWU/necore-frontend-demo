"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {

  //state
  const [open, setOpen] = React.useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D2440] text-white">

      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-150 h-150 bg-[#2E5E99]/20 blur-[160px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-125 h-125 bg-[#2E5E99]/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px] animate-pulse" />
      </div>

      {/* ===== Grid Overlay ===== */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />


      {/* ================= HEADER ================= */}

      <header className="w-full px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-lg font-semibold">NECore</h1>

          {/* NAV LINKS (desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#product" className="hover:text-white transition">Product</a>
            <a href="#developers" className="hover:text-white transition">Developers</a>
            <a href="#security" className="hover:text-white transition">Security</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* DESKTOP CTA */}
            <Button className="hidden md:inline-flex bg-[#2E5E99] hover:bg-[#244a7a] text-white rounded-full px-6">
              Developer Docs
            </Button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white text-2xl"
            >
              {open ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-6 flex flex-col gap-4 md:hidden text-sm text-slate-300">

            <a href="#product" onClick={() => setOpen(false)}>Product</a>
            <a href="#developers" onClick={() => setOpen(false)}>Developers</a>
            <a href="#security" onClick={() => setOpen(false)}>Security</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>

            <Button className="mt-4 bg-[#2E5E99] hover:bg-[#244a7a] text-white rounded-full">
              Developer Docs
            </Button>

          </div>
        )}
      </header>

      {/* ================= HERO ================= */}

      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center gap-8">

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          Verify Identity Once.
          <br />
          <span className="bg-linear-to-r from-[#2E5E99] via-cyan-400 to-[#2E5E99] bg-clip-text text-transparent">
            Accepted Everywhere.
          </span>
        </h1>

        <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
          NECore enables businesses and developers to verify users with precision and speed.
          From document validation to biometric authentication, our intelligence-driven system
          reduces fraud while protecting user privacy.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">

          <Button className="rounded-full px-8 py-3 text-sm font-medium bg-[#2E5E99] text-white hover:bg-[#244a7a]">
            View API Docs
          </Button>

          <Button
            variant="outline"
            className="rounded-full px-8 py-3 text-sm font-medium border-[#2E5E99] text-white hover:bg-[#2E5E99]/20"
          >
            Request Integration
          </Button>

        </div>

      </section>



      {/* ================= TRUST SECTION ================= */}

      <section id="product" className="px-6 py-20 max-w-4xl mx-auto text-center">

        <h2 className="text-2xl font-semibold mb-6">
          Built for Accuracy, Speed, and Global Compliance
        </h2>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Our system combines machine learning, biometric intelligence,
          and secure encryption to deliver reliable identity verification at scale.
        </p>

      </section>



      {/* ================= FEATURES ================= */}

      <section className="px-6 py-24">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                title: "AI Identity Verification",
                desc: "Real-time document analysis, biometric validation, and fraud detection powered by advanced artificial intelligence.",
              },
              {
                title: "Biometric Authentication",
                desc: "Facial recognition and liveness detection designed to prevent spoofing and identity theft.",
              },
              {
                title: "Privacy-First Architecture",
                desc: "Encrypted data handling, strict minimization policies, and compliance-ready infrastructure.",
              },
            ].map((item, i) => (

              <Card
                key={i}
                className="bg-[#0F172A] border border-[#1E293B] hover:border-[#2E5E99] transition-all duration-300"
              >

                <CardContent className="p-6">

                  <h3 className="font-medium text-lg text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {item.desc}
                  </p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>

      {/* ================= TRUST & COMPLIANCE ================= */}
<section className="px-6 py-20 border-t border-[#1E293B]">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-2xl font-semibold text-white mb-6">
      Trusted. Compliant. Secure.
    </h2>

    <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-12">
      Built with global compliance standards, enterprise-grade encryption,
      and AI-powered fraud detection to protect your digital ecosystem.
    </p>

    <div className="flex flex-wrap justify-center gap-6">

      {[
        "GDPR Compliant",
        "SOC 2 Ready",
        "Encrypted Infrastructure",
        "AI Fraud Detection",
      ].map((item, i) => (
        <div
          key={i}
          className="
            px-6 py-3
            rounded-full
            bg-[#0F172A]
            border border-[#1E293B]
            text-sm text-slate-300
            hover:border-[#2E5E99]
            transition duration-300
          "
        >
          {item}
        </div>
      ))}

    </div>
  </div>
</section>



      {/* ================= WHO IT’S FOR ================= */}

      <section className="px-6 py-24 bg-[#0F172A]/60 border-t border-[#1E293B]">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-14">
            WHO IT’S FOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                title: "For Businesses",
                desc: "Reduce fraud, accelerate onboarding, and maintain regulatory compliance.",
              },
              {
                title: "For Developers",
                desc: "Integrate secure identity verification APIs in minutes.",
              },
              {
                title: "For Platforms",
                desc: "Enable reusable trusted identities across ecosystems.",
              },
            ].map((item, i) => (

              <Card
                key={i}
                className="bg-[#0F172A] border border-[#1E293B] hover:border-[#2E5E99] transition-all"
              >

                <CardContent className="p-6">

                  <h3 className="font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    {item.desc}
                  </p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>

      



      {/* ================= CTA ================= */}

      <section className="px-6 py-24 text-center border-t border-[#1E293B]">

        <h2 className="text-3xl font-semibold">
          Build with Trust. Scale with Confidence.
        </h2>

        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-4">
          Deploy secure identity verification in minutes and protect your digital ecosystem
          from fraud and impersonation.
        </p>

        <div className="mt-10">

          <Button className="px-10 py-3 rounded-full bg-linear-to-r from-[#2E5E99] to-cyan-400 hover:opacity-90">
            View Documentation
          </Button>

        </div>

      </section>

    </main>
  );
}