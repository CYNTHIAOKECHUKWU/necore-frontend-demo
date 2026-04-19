// app/layout.tsx
import type { Metadata } from "next";

import "./globals.css";





export const metadata: Metadata = {
  title: "NECore",
  description: "Privacy-first AI identity verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
        
          antialiased 
          flex 
          flex-col 
          min-h-screen
          bg-[#0D2440]
          text-slate-200
          dark:bg-[#0B1120] 
          dark:text-slate-200
          transition-colors duration-300
        `}
      >
        
          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center">
            <nav className="flex justify-center gap-6 text-sm mb-2">
              <a href="/privacy" className="hover:text-[#2E5E99] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-[#2E5E99] transition-colors">
                Terms
              </a>
              <a href="/docs" className="hover:text-[#2E5E99] transition-colors">
                Docs
              </a>
            </nav>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} NECore Inc. All rights reserved.
            </p>
          </footer>
        
      </body>
    </html>
  );
}