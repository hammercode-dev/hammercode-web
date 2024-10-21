import { Link } from "@/lib/navigation";
import Image from "next/image";
import { socialMedia } from "../constants";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { HandCoins } from "lucide-react";

const HeroSection = () => {
  const t = useTranslations("HomePage.section-hero");
  return (
    <div className="container mx-auto py-32 flex lg:flex-row flex-col items-center gap-6 justify-between">
      <div className="basis-[50%]">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h1 className="text-hmc-primary md:text-[44px] text-3xl font-bold md:leading-[60px]">{t("title")}</h1>
            <p className="text-slate-600 dark:text-slate-400">{t("description")}</p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2">
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link href="https://discord.com/invite/M9mNK6MBbu" target="_blank">
                {t("join-button")} <HandCoins className="lg:w-6 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              {socialMedia.map((data) => (
                <Button asChild key={data.id} size="icon">
                  <Link
                    href={data.navigate_url}
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
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="basis-[50%]">
        <Image src="/assets/images/illustrations/hero-section.webp" alt="hero-section" width={1500} height={1500} />
      </div>
    </div>
  );
};

export default HeroSection;
