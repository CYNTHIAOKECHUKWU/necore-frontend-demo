"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Something went wrong</h2>

      <p className="text-sm text-gray-600 max-w-md text-center">
        {error.message}
      </p>

      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
