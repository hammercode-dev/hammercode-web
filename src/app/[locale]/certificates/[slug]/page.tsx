import { notFound } from "next/navigation";
import { EventCertificate, CertificatePage } from "@/features/certificate";

const getCertificateData = async (slug: string): Promise<EventCertificate | null> => {
  const res = await fetch(`https://moonlight.hammercode.org/v1/certificates/${slug}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

type CertificateDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CertificateDetail = async (props: CertificateDetailProps) => {
  const params = await props.params;
  const data = await getCertificateData(params.slug);

  if (!data) {
    return notFound();
  }

  return <CertificatePage certificate={data} />;
};

export default CertificateDetail;
