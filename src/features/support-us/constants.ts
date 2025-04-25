import { IconBankBSI, IconQRIS } from "@/components/icon";
import { DonationMethod } from "./types";
import IconSaweria from "@/components/icon/IconSaweria";

export const DonationMethods: DonationMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    accountName: "Hammercode",
    accountNumber: "9360000801259673598",
    qrCode: "/assets/images/support-us/qr_hmc_qris.png",
    icon: "QRIS",
  },
  {
    id: "bsi",
    name: "Bank Syariah Indonesia",
    accountName: "Pegiat Teknologi Palu Berkarya",
    accountNumber: "7203000768",
    qrCode: "/assets/images/support-us/qr_hmc_bsi.png",
    icon: "BSI",
  },
  {
    id: "saweria",
    name: "Saweria",
    accountName: "Hammercode",
    accountNumber: "https://saweria.co/hammercode",
    qrCode: "/assets/images/support-us/qr_hmc_saweria.png",
    icon: "Saweria",
  },
];

export const DonationIcons = {
  QRIS: IconQRIS,
  BSI: IconBankBSI,
  Saweria: IconSaweria,
} as const;
