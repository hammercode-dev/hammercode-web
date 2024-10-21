import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

const ContactSection = () => {
  const t = useTranslations("HomePage.section-contact");

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center md:gap-8 gap-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-tertiary md:text-3xl text-2xl text-center font-bold">{t("title")}</h2>
          <p className="max-w-3xl md:text-base text-center text-sm text-slate-500 dark:text-slate-400 md:leading-7">
            {t("description")}
          </p>
        </div>

        <Button asChild variant="tertiary" className="flex items-center gap-2">
          <Link href="https://wa.me/6281355893352" target="_blank">
            {t("contact-button")} <Send className="lg:w-6 w-5" />
          </Link>
        </Button>
      </div>

      {/* {} */}
    </div>
  );
};

export default ContactSection;
