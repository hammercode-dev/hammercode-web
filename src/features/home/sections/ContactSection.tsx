import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

const ContactSection = () => {
  const t = useTranslations("HomePage.section-contact");

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-tertiary text-center text-2xl font-bold md:text-3xl"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-3xl text-center text-sm text-slate-500 md:text-base md:leading-7 dark:text-slate-400"
          >
            {t("description")}
          </motion.p>
        </div>

        <Button asChild variant="tertiary" className="group flex items-center gap-2">
          <Link href="https://wa.me/6281355893352" target="_blank">
            {t("contact-button")} <Send className="w-5 group-hover:animate-bounce lg:w-6" />
          </Link>
        </Button>
      </div>

      {/* {} */}
    </div>
  );
};

export default ContactSection;
