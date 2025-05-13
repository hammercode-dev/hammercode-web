import { Card, CardContent } from "@/components/ui/Card";
import { PROGRAM } from "../constant";
import { FC } from "react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

const OurProgram: FC = () => {
  const t = useTranslations("AboutPage");
  return (
    <Card className="space-y-4 p-4">
      <h2 className="text-hmc-primary text-2xl font-semibold">{t("side.title-2")}</h2>
      {PROGRAM.map(({ id, title, desc, icon }) => (
        <CardContent key={id} className="flex items-center gap-2 p-0">
          <motion.div
            whileHover={{ rotate: id % 2 === 0 ? 15 : -15 }}
            transition={{ duration: 0.4 }}
            className="bg-card flex size-12 items-center justify-center rounded-full border"
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};
export default OurProgram;
