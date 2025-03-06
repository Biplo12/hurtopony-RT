"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const NotFound = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-2 py-20">
            <h3 className="text-xl font-semibold">404</h3>
            <p className="max-w-md text-center text-muted-foreground">
              Oops! Page not found. Please check the URL and try again.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default NotFound;
