"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/provider/AuthProvider";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { useParams, usePathname } from "next/navigation";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  const authPaths = ["sign-in", "sign-up", "forgot-password", "reset-password"];
  const isAuthPage = authPaths.some((path) => pathname.includes(path));
  const isCertificateDetailPage = !!params?.slug && pathname.includes("certificates");

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {isCertificateDetailPage || isAuthPage ? (
          children
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
};
export default WrapperLayout;
