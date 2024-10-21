import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import { usePathname, useRouter } from "@/lib/navigation";
import { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

const LocaleToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleSwitch = (value: string) => {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };
  return (
    <Button
      onClick={() => handleSwitch(locale !== "id" ? "id" : "en")}
      size="sm"
      variant="outline"
      className={`w-[3rem] font-normal`}
      disabled={isPending}
    >
      {locale === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
      <span className="sr-only">Toggle locale</span>
    </Button>
  );
};

export default LocaleToggle;
