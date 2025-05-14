"use client";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DonationMethod } from "../types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

type Props = {
  method: DonationMethod;
  copiedId: string | null;
  onCopy: (accountNumber: string, id: string) => void;
};

export function DonateCard({ method, copiedId, onCopy }: Props) {
  const t = useTranslations("SupportUsPage");

  const handleDownloadQr = () => {
    const link = document.createElement("a");
    link.download = method.downloadQr.split("/").pop() as string;
    link.href = method.downloadQr;
    link.click();
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: {
            stiffness: 50,
            damping: 20,
          },
        },
      }}
      className="bg-card relative overflow-hidden rounded-xl border hover:shadow-2xl hover:shadow-white/20"
    >
      <div className="bg-muted/30 border-b p-5 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          {method.icon && (
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-hmc-primary/10 rounded-lg p-1"
            >
              <Image src={method.icon} alt={method.name} width={24} height={24} />
            </motion.div>
          )}
          <h3 className="text-lg font-semibold">{method.name}</h3>
        </div>
      </div>

      <div className="space-y-8 p-8">
        <motion.div
          className="group relative flex justify-center"
          whileHover={{ scale: 1.02 }}
          onClick={handleDownloadQr}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  alt="QR Code"
                  src={method.qrCode}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="size-60 rounded-xl bg-white p-4 shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-white/25"
                />
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100"
                  whileHover={{ scale: 1.02 }}
                />
              </TooltipTrigger>
              <TooltipContent>{t("donate.downloadQr")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        <div className="space-y-4">
          <p className="text-center font-mono text-xs md:text-sm">{method.accountName}</p>
          <motion.div
            className="bg-muted/50 border-border/50 rounded-lg border p-4 font-mono text-sm break-all"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {method.accountNumber}
          </motion.div>
          <Button
            variant="outline"
            className="hover:bg-hmc-primary/5 hover:text-hmc-primary w-full py-6 text-sm font-medium transition-colors"
            onClick={() => onCopy(method.accountNumber, method.id)}
          >
            {copiedId === method.id ? (
              <Check className="mr-2 size-5 text-green-500" />
            ) : (
              <Copy className="mr-2 size-5" />
            )}
            {copiedId === method.id ? t("clipboard.copied") : t("clipboard.copy")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
