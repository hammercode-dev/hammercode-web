import { notFound } from "next/navigation";
import { EventCertificate, CertificatePage } from "@/features/certificate";

function getCertificateData(slug: string): Promise<EventCertificate> {
  return fetch(`https://moonlight.hammercode.org/v1/certificates/${slug}`).then((res) => res.json());
}

type CertificateDetailProps = {
  params: {
    slug: string;
  };
};

const CertificateDetail = async ({ params }: CertificateDetailProps) => {
  const data = await getCertificateData(params.slug);

  if (!data.name) {
    return notFound();
  }

  return <CertificatePage certificate={data} />;
};

export default CertificateDetail;
