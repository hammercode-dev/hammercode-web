"use client";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";
import { MessageSquare, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Saweria() {
  return (
    <div className="flex gap-4 mb-12">
      <div style={{ width: 120 }}>
        <a href="https://saweria.co/hammercode" target="_blank">
          <Image src="/assets/images/support-us/saweria-logo.png" alt="saweria logo" height={120} width={120} />
        </a>
      </div>
      <div>
        <p className="text-xl font-bold mb-3">Donate via Saweria</p>
        <a className="underline text-blue-500" href="https://saweria.co/hammercode" target="_blank">
          https://saweria.co/hammercode
        </a>
      </div>
    </div>
  );
}

function BankTransfer() {
  return (
    <div className="flex gap-4">
      <div style={{ width: 120 }}>
        <a href="#">
          <Image src="/assets/images/support-us/bsi.png" alt="bsi logo" height={120} width={120} />
        </a>
      </div>
      <div>
        <p className="text-xl font-bold mb-3">Donate via Bank Transfer</p>
        <table>
          <tbody>
            <tr>
              <td className="pr-2 py-1">Bank Name</td>
              <td className="pr-2 py-1 font-bold">Bank Syariah Indonesia</td>
            </tr>
            <tr>
              <td className="pr-2 py-1">Account Number</td>
              <td className="pr-2 py-1 font-bold">7203000768</td>
            </tr>
            <tr>
              <td className="pr-2 py-1">Account Name</td>
              <td className="pr-2 py-1 font-bold">Pegiat Teknologi Palu Berkarya</td>
            </tr>
            <tr>
              <td className="pr-2 py-1">Swift Code</td>
              <td className="pr-2 py-1 font-bold">BSMDIDJA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SupportUsPage() {
  const t = useTranslations("SupportUsPage");

  return (
    <div className="pt-32 pb-16 container mx-auto px-5">
      <section>
        <h1 className="text-3xl font-bold mb-2 text-hmc-base-blue">Donate to Make bigger Impact!</h1>
        <p className="mb-8 text-lg">{t("brief")}</p>

        <div className="flex flex-col md:flex-row gap-4 justify-around">
          <Saweria />
          <BankTransfer />
        </div>
      </section>

      <section className="text-center py-12">
        <h3 className="mb-6 text-2xl font-black">Let's Chat</h3>
        <div className="flex py-8 flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" asChild variant="tertiary" className="flex items-center gap-2">
            <Link href="https://wa.me/6281355893352" target="_blank">
              Whatsapp <MessageSquare className="lg:w-6 w-5" />
            </Link>
          </Button>

          <Button size="lg" asChild variant="tertiary" className="flex items-center gap-2">
            <Link href="mailto:hammercode28@gmail.com" target="_blank">
              Email Us <Send className="lg:w-6 w-5" />
            </Link>
          </Button>

          {/* TODO: add sponsor button: paypal, patreon, opencollective or gh sponsor */}
        </div>
      </section>

      {/* TODO: impact and financial reports */}
    </div>
  );
}
