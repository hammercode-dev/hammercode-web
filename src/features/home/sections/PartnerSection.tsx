import Image from "next/image";
import { partnersData } from "../constants";
import { useTranslations } from "next-intl";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";

const PartnerSection = () => {
  const t = useTranslations("HomePage.section-partner");
  return (
    <div className="bg-sky-50 dark:bg-slate-900">
      <div className="container mx-auto md:py-14 py-10 my-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-tertiary md:text-3xl text-2xl text-[#4c4a4a] font-bold">{t("title")}</h2>
          <p className="md:text-base text-sm text-slate-500 dark:text-slate-400 md:text-center">{t("description")}</p>
        </div>

        <div className="px-12 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            // isDots={true}
          >
            <CarouselContent>
              {partnersData.map(({ id, logo, alt }) => (
                <CarouselItem key={id} className="flex justify-center items-center sm:basis-1/5">
                  <Image src={logo} alt={alt} width={174} height={20} className="object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="sm:hidden" />
            <CarouselNext className="sm:hidden" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
