import Image from "next/image";
import { courseData } from "../constants";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

const ClassSection = () => {
  const t = useTranslations("HomePage.section-class");

  return (
    <div className="bg-sky-50 dark:bg-slate-900">
      <div className="container mx-auto md:py-14 py-10 my-10 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-tertiary md:text-3xl text-2xl font-bold">{t("title")}</h2>
          <p className="max-w-3xl md:text-base text-center text-sm text-slate-500 dark:text-slate-400 md:leading-7">
            {t("description")}
          </p>
        </div>

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
                <Card className="flex items-center gap-2 rounded-full w-full">
                  <CardHeader className="p-2">
                    <div className="p-5 md:w-20 w-20 md:h-20 h-20 bg-sky-50 dark:bg-slate-900 rounded-full shrink-0">
                      <Image src={data.logo} alt={data.title} width={100} height={100} className="" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      <h3 className="text-tertiary md:text-xl text-lg font-semibold">{data.title}</h3>
                      <p className="md:text-sm text-sm text-slate-500 dark:text-slate-400">{data.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ClassSection;
