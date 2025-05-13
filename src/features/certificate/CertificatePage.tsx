import Image from "next/image";
import { EventCertificate } from "./types";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";
import { Linkedin, TwitterIcon } from "lucide-react";

type Props = {
  certificate: EventCertificate;
};

const CertificatePage = ({ certificate }: Props) => {
  const { _id, event, image_link, name, share_link } = certificate;
  return (
    <div className="w-full">
      <div className="my-12 p-4">
        <div className="space-y-2">
          <h3 className="text-hmc-primary text-center text-xl font-semibold md:text-2xl">
            Terima Kasih kepada <strong className="font-extrabold">{name}</strong>!
          </h3>
          <p className="text-center text-sm text-slate-500 md:text-base dark:text-slate-400">
            Kamu telah berpartisipasi dalam acara ini.
          </p>
        </div>
        <div className="relative h-full w-full">
          <div className="flex justify-center">
            <Image
              src={image_link}
              className="my-4 h-auto w-auto rounded-lg object-cover object-center shadow-md"
              width="640"
              height="480"
              alt={`Sertikat ${event} - ${name}`}
              priority
            />
          </div>
          <p className="mb-8 text-center text-sm text-slate-500 md:text-base dark:text-slate-400">
            Sertifikat : <b>{_id}</b>
          </p>

          <div className="flex justify-center">
            <Button asChild variant="tertiary">
              <Link href={share_link} target="_blank">
                UNDUH SERTIFIKAT
              </Link>
            </Button>
          </div>
          <div>
            <p className="my-4 text-center text-sm text-slate-500 md:text-base dark:text-slate-400">
              <strong className="text-md md:text-lg">Pamerkan</strong> sertifikat ini ke teman-temanmu!
            </p>

            <div className="flex justify-center space-x-6">
              <Button variant="secondary" size="icon">
                <Link
                  href={`https://twitter.com/intent/tweet?text=Saya telah mengikuti kegiatan ${event} yang diadakan oleh Hammercode.org&url=${share_link}`}
                  target={"_blank"}
                >
                  <TwitterIcon className="w-full text-3xl text-sky-600 hover:text-sky-700" size={24} />
                </Link>
              </Button>
              <Button variant="secondary" size="icon">
                <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${share_link}`} target={"_blank"}>
                  <Linkedin className="text-3xl text-sky-600 hover:text-sky-700" size={24} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
