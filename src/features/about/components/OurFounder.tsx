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
    <Card className="space-y-4 p-4">
      <h2 className="text-hmc-primary text-2xl font-semibold">{t("side.title-1")}</h2>
      {FOUNDERS.map(({ id, image, name, linkedin, email }) => (
        <CardContent key={id} className="flex flex-col justify-center gap-4 p-0">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={image}
              alt={name}
              width={512}
              height={512}
              className="h-16 w-16 rounded-full border-2 object-cover lg:h-14 lg:w-14"
            />
            <div className="flex flex-col">
              <h3>{name}</h3>
              {/* <p className="sm:text-sm text-xs text-slate-400 dark:text-slate-400">{role}</p> */}
              <div className="mt-2 flex space-x-2">
                <Link href={linkedin} target="_blank">
                  <Badge>
                    <Linkedin className="h-4 w-4" />
                  </Badge>
                </Link>
                <Link href={email} target="_blank">
                  <Badge className="bg-gray-600 hover:bg-gray-700">
                    <Mail className="h-4 w-4" />
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
