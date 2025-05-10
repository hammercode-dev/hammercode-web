import Image from "next/image";
import * as motion from "motion/react-client";
import { partnersData } from "../constants";
import { useTranslations } from "next-intl";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";

const PartnerSection = () => {
  const t = useTranslations("HomePage.section-partner");
  return (
    <div className="bg-sky-50 dark:bg-slate-900">
      <div className="container mx-auto md:py-14 py-10 my-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-tertiary md:text-3xl text-2xl font-bold">{t("title")}</h2>
          <p className="md:text-base text-sm text-slate-500 dark:text-slate-400 md:text-center">{t("description")}</p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="px-12 md:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {partnersData.map(({ id, logo, alt }) => (
                <CarouselItem key={id} className="flex justify-center items-center sm:basis-1/5">
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                  >
                    <Image src={logo} alt={alt} width={174} height={70} className="object-cover" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="sm:hidden" />
            <CarouselNext className="sm:hidden" />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerSection;
