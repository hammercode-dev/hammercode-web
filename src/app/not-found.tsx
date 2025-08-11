"use client";

import NotFoundPage from "@/components/layout/NotFoundPage";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="flex h-screen w-full items-center justify-center">
        <NotFoundPage />
      </body>
    </html>
  );
}
