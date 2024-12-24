// import { notFound } from "next/navigation";
import { EventCertificate, CertificatePage } from "@/features/certificate";

const getCertificateData = async (slug: string): Promise<EventCertificate> => {
  const res = await fetch(`https://moonlight.hammercode.org/v1/certificates/${slug}`);
  const resData = await res.json();
  return resData;
};

type CertificateDetailProps = {
  params: {
    slug: string;
  };
};

const CertificateDetail = async ({ params }: CertificateDetailProps) => {
  const data = await getCertificateData(params.slug);
  console.log(data);

  // if (!data.name) {
  //   return notFound();
  // }

  return <CertificatePage certificate={data} />;
};

export default CertificateDetail;
