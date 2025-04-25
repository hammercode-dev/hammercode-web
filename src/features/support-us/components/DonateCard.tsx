"use client";
import React from "react";
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
    link.download = method.qrCode.split("/").pop() as string;
    link.href = method.qrCode;
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
      className="relative bg-card border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-white/20"
    >
      <div className="p-5 border-b bg-muted/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          {method.icon && (
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-1 rounded-lg bg-hmc-primary/10"
            >
              <Image src={method.icon} alt={method.name} width={24} height={24} />
            </motion.div>
          )}
          <h3 className="font-semibold text-lg">{method.name}</h3>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <motion.div
          className="flex justify-center relative group"
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
                  className="size-60 bg-white p-4 rounded-xl shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-white/25"
                />
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                />
              </TooltipTrigger>
              <TooltipContent>{t("donate.downloadQr")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-center font-mono">{method.accountName}</p>
          <motion.div
            className="text-sm font-mono p-4 bg-muted/50 rounded-lg break-all border border-border/50"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {method.accountNumber}
          </motion.div>
          <Button
            variant="outline"
            className="w-full py-6 text-sm font-medium hover:bg-hmc-primary/5 hover:text-hmc-primary transition-colors"
            onClick={() => onCopy(method.accountNumber, method.id)}
          >
            {copiedId === method.id ? (
              <Check className="size-5 mr-2 text-green-500" />
            ) : (
              <Copy className="size-5 mr-2" />
            )}
            {copiedId === method.id ? t("clipboard.copied") : t("clipboard.copy")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
