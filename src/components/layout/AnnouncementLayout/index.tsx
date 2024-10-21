import Announcement from "@/components/ui/Announcement";
import { useTranslations } from "next-intl";

export default function AnnouncementLayout() {
  const t = useTranslations("Announcement");
  const pdd: { message: string; url: string } = {
    message: t("pdd-2024"),
    url: "https://pdd2024.hammercode.org/",
  };

  return (
    <div>
      <Announcement message={pdd.message} url={pdd.url} />
    </div>
  );
}
