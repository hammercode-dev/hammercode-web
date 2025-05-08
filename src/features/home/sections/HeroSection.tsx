import { HandCoins } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { socialMedia } from "../constants";

const HeroSection = () => {
  const t = useTranslations("HomePage.section-hero");
  return (
    <div className="container mx-auto py-32 flex lg:flex-row flex-col items-center gap-6 justify-between">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="basis-[50%] space-y-4"
      >
        <div className="space-y-1.5">
          <h1 className="text-hmc-primary md:text-[44px] text-3xl font-bold md:leading-[60px]">{t("title")}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t("description")}</p>
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  staggerChildren: 0.4,
                  delayChildren: 0.2,
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2"
          >
            <Button asChild size="lg" className="flex items-center gap-2 hover:scale-[1.05]">
              <Link href="https://discord.com/invite/M9mNK6MBbu" target="_blank">
                {t("join-button")} <HandCoins className="lg:w-6 w-5" />
              </Link>
            </Button>
            {socialMedia.map((data) => (
              <motion.div
                key={data.id}
                variants={{
                  hidden: { x: 20, opacity: 0 },
                  show: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                    },
                  },
                }}
                whileHover={{ scale: 1.07 }}
              >
                <Button asChild size="icon">
                  <Link
                    href={data.navigate_url}
                    target="_blank"
                    style={{
                      background: data.is_gradient
                        ? `linear-gradient(135deg, ${data.color_one} 0%, ${data.color_two} 100%)`
                        : data.color_one,
                    }}
                    className="p-2 rounded-md flex justify-center md:w-12 w-10 md:h-12 h-10"
                  >
                    <Image src={data.icon} alt={data.icon} width={55} height={55} className="w-full" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="basis-[50%]"
      >
        <Image src="/assets/images/illustrations/hero-section.webp" alt="hero-section" width={640} height={560} />
      </motion.div>
    </div>
  );
};

export default HeroSection;
