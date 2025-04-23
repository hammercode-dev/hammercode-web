import { IconBankBSI, IconBankMandiri } from "@/components/icon";
import { DonationMethod } from "./type";

export const DonationMethods: DonationMethod[] = [
  {
    id: "bsi",
    name: "Bank Syariah Indonesia",
    accountName: "Pegiat Teknologi Palu Berkarya",
    accountNumber: "7203000768",
    qrCode: "/assets/images/support-us/qr_hmc_bsi.png",
    icon: "BSI",
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    accountName: "Hammercode",
    accountNumber: "9360000801259673598",
    qrCode: "/assets/images/support-us/qr_hmc_mandiri.png",
    icon: "Mandiri",
  },
];

export const DonationIcons = {
  BSI: IconBankBSI,
  Mandiri: IconBankMandiri,
} as const;
