"use client";

import NotFoundPage from "@/components/layout/NotFoundPage";
// import Error from "next/error";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="flex h-screen w-full items-center justify-center">
        {/* <Error statusCode={404} />; */}
        <NotFoundPage />
      </body>
    </html>
  );
}
