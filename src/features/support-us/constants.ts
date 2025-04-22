import { DonateMethod } from "./type";

export const DonateMethods: DonateMethod[] = [
  {
    id: "bsi",
    name: "Bank Syariah Indonesia",
    accountName: "Pegiat Teknologi Palu Berkarya",
    accountNumber: "7203000768",
    qrCode: "/assets/images/support-us/qr_hmc_bsi.png",
    icon: {
      src: "/assets/images/support-us/bsi.png",
      alt: "Bank Syariah Indonesia Logo",
    },
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    accountName: "Hammercode",
    accountNumber: "9360000801259673598",
    qrCode: "/assets/images/support-us/qr_hmc_mandiri.png",
    icon: {
      src: "/assets/images/support-us/mandiri.png",
      alt: "Bank Mandiri Logo",
    },
  },
];
