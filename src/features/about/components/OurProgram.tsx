import { Card, CardContent } from "@/components/ui/Card";
import { PROGRAM } from "../constant";
import { FC } from "react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

const OurProgram: FC = () => {
  const t = useTranslations("AboutPage");
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold text-hmc-primary">{t("side.title-2")}</h2>
      {PROGRAM.map(({ id, title, desc, icon }) => (
        <CardContent key={id} className="p-0 flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: id % 2 === 0 ? 15 : -15 }}
            transition={{ duration: 0.4 }}
            className="size-12 bg-card border rounded-full flex items-center justify-center"
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
