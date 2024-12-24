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
      <div className="p-4 my-12">
        <div className="space-y-2">
          <h3 className="text-hmc-primary md:text-2xl text-xl font-semibold text-center">
            Terima Kasih kepada <strong className="font-extrabold">{name}</strong>!
          </h3>
          <p className="md:text-base text-sm text-center text-slate-500 dark:text-slate-400">
            Kamu telah berpartisipasi dalam acara ini.
          </p>
        </div>
        <div className="w-full h-full relative">
          <div className="flex justify-center">
            <Image
              src={image_link}
              className="my-4 rounded-lg shadow-md object-cover object-center w-auto h-auto"
              width="640"
              height="480"
              alt={`Sertikat ${event} - ${name}`}
              priority
            />
          </div>
          <p className="md:text-base text-sm text-center text-slate-500 dark:text-slate-400 mb-8">
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
            <p className="md:text-base text-sm text-center text-slate-500 dark:text-slate-400 my-4">
              <strong className="md:text-lg text-md">Pamerkan</strong> sertifikat ini ke teman-temanmu!
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
