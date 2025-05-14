import { FC } from "react";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { ACTIVITIES } from "../constant";

const ImagesList: FC = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {ACTIVITIES.map(({ id, logo, alt }) => (
          <CarouselItem key={id} className="flex items-center justify-center sm:basis-1/3">
            <Image src={logo} alt={alt} width={200} height={20} className="w-full rounded-lg shadow-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export default ImagesList;
