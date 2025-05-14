"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/hooks/UseToast";
import { Link } from "@/lib/navigation";
import { DonateCard } from "./components/DonateCard";
import { DonationMethods } from "./constants";

export default function SupportUsPage() {
  const t = useTranslations("SupportUsPage");
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string>("");

  const copyToClipboard = (accountNumber: string, id: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    toast({
      title: t("clipboard.title"),
      description: t("clipboard.description"),
    });
    setTimeout(() => setCopiedId(""), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="container mx-auto max-w-7xl space-y-10 px-5 pt-32 pb-16"
    >
      <section className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <h1 className="text-hmc-base-blue mb-2 text-4xl font-bold">Donate to Make bigger Impact!</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.5,
          }}
          className="mb-8 text-lg"
        >
          {t("brief")}. <br />
          <a
            className="text-blue-500 underline"
            href="https://docs.google.com/spreadsheets/d/1ZgmZXxf6ep4BvNC0oQ9B_cBKO3sVFO2IxS-m7RoR_xU/edit?gid=0#gid=0"
            target="_blank"
          >
            {t("budget")}
          </a>
        </motion.p>
        <motion.div
          className="grid gap-8 py-4 lg:grid-cols-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.4,
                delayChildren: 1,
                duration: 0.7,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {DonationMethods.map((method) => (
            <DonateCard key={method.id} method={method} copiedId={copiedId} onCopy={copyToClipboard} />
          ))}
        </motion.div>
      </section>

      <section className="py-12 text-center">
        <h3 className="mb-4 text-2xl font-black">Let's Chat</h3>
        <div className="flex flex-col justify-center gap-4 py-2 md:flex-row">
          <Button size="lg" asChild variant="tertiary" className="flex items-center gap-2">
            <Link href="https://wa.me/6281355893352" target="_blank">
              Whatsapp <MessageSquare className="w-5 lg:w-6" />
            </Link>
          </Button>

          <Button size="lg" asChild variant="tertiary" className="flex items-center gap-2">
            <Link href="mailto:hammercode28@gmail.com" target="_blank">
              Email Us <Send className="w-5 lg:w-6" />
            </Link>
          </Button>

          {/* TODO: add sponsor button: paypal, patreon, opencollective or gh sponsor */}
        </div>
      </section>

      {/* TODO: impact and financial reports */}
    </motion.div>
  );
}
