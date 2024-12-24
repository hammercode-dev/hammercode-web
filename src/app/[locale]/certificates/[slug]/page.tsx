import { notFound } from "next/navigation";
import { EventCertificate, CertificatePage } from "@/features/certificate";

const getCertificateData = async (slug: string): Promise<EventCertificate | null> => {
  try {
    const res = await fetch(`https://moonlight.hammercode.org/v1/certificates/${slug}`);
    if (!res.ok) {
      console.error("Failed to fetch certificate:", res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

type CertificateDetailProps = {
  params: {
    slug: string;
  };
};

const CertificateDetail = async ({ params }: CertificateDetailProps) => {
  const data = await getCertificateData(params.slug);

  if (!data) {
    return notFound();
  }

  return <CertificatePage certificate={data} />;
};

export default CertificateDetail;
