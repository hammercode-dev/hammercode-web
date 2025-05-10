import Image from "next/image";
import * as motion from "motion/react-client";
import { courseData } from "../constants";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { useTranslations } from "next-intl";

const ClassSection = () => {
  const t = useTranslations("HomePage.section-class");

  return (
    <div className="bg-sky-50 dark:bg-slate-900">
      <div className="container mx-auto md:py-14 py-10 my-10 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-tertiary md:text-3xl text-2xl font-bold"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-3xl md:text-base text-center text-sm text-slate-500 dark:text-slate-400 md:leading-7"
          >
            {t("description")}
          </motion.p>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 20,
              active: true,
            }}
          >
            <CarouselContent>
              {courseData.map((data) => (
                <CarouselItem
                  key={data.id}
                  className="flex justify-center items-center xl:basis-1/4 lg:basis-1/3 sm:basis-1/2"
                >
                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          stiffness: 50,
                          damping: 20,
                        },
                      },
                    }}
                    className="flex items-center gap-2 rounded-full w-full border border-slate-200 bg-white text-slate-950 shadow-xs dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                  >
                    <div className="p-2">
                      <div className="p-5 md:w-20 w-20 md:h-20 h-20 bg-sky-50 dark:bg-slate-900 rounded-full shrink-0">
                        <Image src={data.logo} alt={data.title} width={100} height={100} />
                      </div>
                    </div>
                    <div className="p-0">
                      <div className="space-y-1">
                        <h3 className="text-tertiary md:text-xl text-lg font-semibold">{data.title}</h3>
                        <p className="md:text-sm text-sm text-slate-500 dark:text-slate-400">{data.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassSection;
