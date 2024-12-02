import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Linkedin, Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { FOUNDERS } from "../constant";

const OurFounder: FC = () => {
  const t = useTranslations("AboutPage");
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold text-hmc-primary">{t("side.title-1")}</h2>
      {FOUNDERS.map(({ id, image, name, linkedin, email }) => (
        <CardContent key={id} className="p-0 flex justify-center flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={image}
              alt={name}
              width={512}
              height={512}
              className="lg:w-14 w-16 lg:h-14 h-16 object-cover border-2 rounded-full"
            />
            <div className="flex flex-col">
              <h3>{name}</h3>
              {/* <p className="sm:text-sm text-xs text-slate-400 dark:text-slate-400">{role}</p> */}
              <div className="flex mt-2 space-x-2">
                <Link href={linkedin} target="_blank">
                  <Badge>
                    <Linkedin className="w-4 h-4" />
                  </Badge>
                </Link>
                <Link href={email} target="_blank">
                  <Badge className="bg-gray-600 hover:bg-gray-700">
                    <Mail className="w-4 h-4" />
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default OurFounder;
