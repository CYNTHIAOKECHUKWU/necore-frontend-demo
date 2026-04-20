"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  ShieldCheck,
  Lock,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

   const navItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Verification", href: "/user/verify", icon: ShieldCheck },
    //{ name: "Security", href: "/user/security", icon: Lock },
    //{ name: "Profile", href: "/user/profile", icon: User },
    //{ name: "Documents", href: "/user/document", icon: FileText },
  ]

  const Sidebar = () => (
    <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] flex flex-col justify-between px-5 py-6 h-screen">
      
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/necore-logo.png"
            alt="NECore Logo"
            className="h-10 w-auto"
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

        {/* NAV */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    active
                      ? "bg-[#2E5E99] text-white shadow-md"
                      : "bg-[#1E293B] text-slate-300 hover:bg-[#334155]"
                  }
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="space-y-3">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-900/20">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="bg-[#0D2440] min-h-screen text-slate-200 flex">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0 z-40">
        <Sidebar />
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 min-h-screen">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between bg-[#0F172A] px-4 py-3 border-b border-[#1E293B]">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>

          <span className="font-semibold text-white">
            NECore
          </span>

          <div className="w-6" />
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>

      </main>
    </div>
  );
}