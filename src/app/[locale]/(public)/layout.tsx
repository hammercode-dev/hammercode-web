"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useParams, usePathname } from "next/navigation";
const authPaths = ["sign-in", "sign-up", "forgot-password", "reset-password", "payment/success"];

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  const isAuthPage = authPaths.some((path) => pathname.includes(path));
  const isCertificateDetailPage = !!params?.slug && pathname.includes("certificates");

  if (isAuthPage || isCertificateDetailPage) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default WrapperLayout;
