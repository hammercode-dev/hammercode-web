"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFormatPrice } from "@/lib/format";
import { Skeleton } from "@/components/ui/Skeleton";
import TitleContainer from "@/components/ui/TitleContainer";
import EventInfo from "../components/EventInfo";
import EventBreadcrumbs from "../components/EventBreadcrumb";
import EventFormRegistration from "../components/EventFormRegistration";
import { useEventById } from "../hooks/useEvent";
import { Separator } from "@/components/ui/Separator";

interface EventDetailPageProp {
  eventId: string;
}

const EventDetailPage: FC<EventDetailPageProp> = ({ eventId }) => {
  const t = useTranslations("EventsPage");
  const { event, isLoading } = useEventById(eventId);

  return (
    <div className="container mx-auto space-y-6 py-24">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="w-full rounded-lg">
            {!isLoading ? (
              <Image
                src={event?.image ?? "/assets/images/events/fallbackImage.webp"}
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="rounded-lg"
              />
            ) : (
              <Skeleton className="h-24 w-full rounded-lg sm:h-96" />
            )}
          </div>
          <EventBreadcrumbs />
          <div className="space-y-6">
            <h1 className="text-xl font-bold sm:text-3xl md:mt-8">{event?.title}</h1>
            {!isLoading ? (
              <EventInfo event={event} className="lg:hidden" />
            ) : (
              <Skeleton className="h-10 w-full rounded-lg" />
            )}
            <div className="space-y-4">
              <TitleContainer>
                <h2 className="font-semibold sm:text-xl">{t("EventDetail.desc-title")}</h2>
              </TitleContainer>
              <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                {event?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, doloremque?
                Blanditiis a aspernatur eveniet, similique magni pariatur autem debitis odit suscipit laboriosam
                repellat consequuntur distinctio consequatur, doloribus ea deserunt? Voluptatibus quaerat, facere ipsa
                eum temporibus eaque ad commodi? Temporibus esse minima vitae nisi reprehenderit obcaecati doloremque
                voluptatibus autem accusantium delectus, voluptatem hic ipsam aspernatur voluptatum quod necessitatibus?
                Ad exercitationem molestiae voluptas dolorem excepturi, earum deserunt ab. Aspernatur molestias impedit
                repudiandae blanditiis eaque minima, a quasi laudantium cumque quo, neque possimus sunt, inventore
                minus. Quae eius facere cupiditate libero excepturi incidunt qui temporibus? Molestiae sint fugiat
                delectus. Alias ea doloremque totam veritatis fuga sequi labore, numquam unde, natus nostrum illum neque
                facilis laudantium corporis hic fugiat ullam. Voluptatum ut fuga placeat molestiae nobis quasi corrupti
                in, iure itaque quae tempora doloribus error dolore, totam quo rerum rem quos ex consequatur! Vel
                laudantium harum, libero inventore eum velit eveniet cumque, illum modi ducimus accusantium quas,
                mollitia distinctio ratione molestias ipsam impedit repudiandae itaque. Eligendi sed architecto ex
                explicabo nostrum aspernatur accusantium ratione veritatis delectus laudantium eius magnam voluptatibus
                autem, quas cum enim consequuntur veniam incidunt quisquam saepe aliquid sequi eveniet officiis atque!
                Inventore alias odit debitis sunt, animi ea maiores porro dolorem sint ipsa? Saepe, molestiae cumque
                voluptate, a quaerat ad, quia placeat explicabo animi ullam totam aliquam! Distinctio beatae aliquam eos
                dicta vero, placeat praesentium voluptas labore nesciunt illum at esse, ducimus recusandae veniam
                accusamus optio minima earum cumque. Nostrum corrupti fuga provident quibusdam repellendus, molestias ut
                vel aspernatur eum mollitia in quisquam praesentium minus doloremque esse? Fugiat, distinctio fuga
                repellendus pariatur illo fugit, quisquam odio neque, dignissimos reprehenderit eveniet. Aspernatur
                praesentium tempora perspiciatis excepturi, exercitationem, dolores non labore deserunt assumenda ab
                animi debitis obcaecati nemo est corrupti sint laudantium ipsa quibusdam explicabo nobis, saepe sunt
                nostrum perferendis optio! Ullam, quisquam!
              </p>
            </div>
          </div>
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex w-full items-center justify-between gap-4 self-start rounded-lg bg-white lg:sticky lg:top-24 lg:flex-col lg:justify-start lg:bg-transparent lg:px-4 dark:bg-slate-950">
          <div className="hidden w-full space-y-6 rounded-lg border p-4 lg:block">
            {!isLoading ? <EventInfo event={event} /> : <Skeleton className="h-4 w-full rounded-lg" />}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-lg border-t px-6 py-4 sm:border">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-semibold sm:text-lg dark:text-slate-200">
                {t("EventDetail.price-title")}
              </span>
              <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(event?.price)}</p>
            </div>
            <Separator />
            <EventFormRegistration data={event} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
