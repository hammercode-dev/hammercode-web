"use client";

import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "./ThemeProvider";
import Footer from "@/components/layout/Footer";
import { useParams, usePathname } from "next/navigation";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  // const isAuthPage = pathname.includes("login") || pathname.includes("register");
  const isCertificateDetailPage = !!params?.slug && pathname.includes("certificates");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {isCertificateDetailPage ? (
        children
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};
export default WrapperLayout;
