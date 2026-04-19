"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-2xl font-semibold">Page Not Found</h1>

      <p className="text-sm text-muted-foreground max-w-md text-center">
        This page is not part of the current NECore MVP or the route may be incorrect.
      </p>
               {/*
      <a href="/">
        <button className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2">
          Return Home
        </button>
      </a> */}
    </div>
  );
}
