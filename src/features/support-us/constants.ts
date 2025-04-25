import { DonationMethod } from "./types";

export const DonationMethods: DonationMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    accountName: "Hammercode",
    accountNumber: "9360000801259673598",
    qrCode: "/assets/images/support-us/qr_hmc-qris.svg",
    icon: "/assets/icons/ic_qris.svg",
  },
  {
    id: "bsi",
    name: "Bank Syariah Indonesia",
    accountName: "Pegiat Teknologi Palu Berkarya",
    accountNumber: "7203000768",
    qrCode: "/assets/images/support-us/qr_hmc-bsi.svg",
    icon: "/assets/icons/ic_bank-bsi.svg",
  },
  {
    id: "saweria",
    name: "Saweria",
    accountName: "Hammercode",
    accountNumber: "https://saweria.co/hammercode",
    qrCode: "/assets/images/support-us/qr_hmc-saweria.svg",
    icon: "/assets/icons/ic_saweria.svg",
  },
];
