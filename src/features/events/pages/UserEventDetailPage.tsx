"use client";

import { useParams } from "next/navigation";
import { useRouter } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EventDetailModal } from "../components/EventDetailModal";
import { useGetPaymentDetail } from "../hooks/useEvent";
import Loader from "@/components/common/Loader";

const UserEventDetailPage = () => {
  const t = useTranslations("MyEventDetailPage");
  const router = useRouter();
  const params = useParams();

  const order_no = params?.transactionId as string;
  const { data: paymentData, isLoading, isError } = useGetPaymentDetail(order_no);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !paymentData?.data) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">{t("not-found-title")}</h1>
          <p className="mb-8 text-gray-600">
            {t("not-found-description")}
          </p>
          <Button onClick={() => router.push("/my-events")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back-to-my-events")}
          </Button>
        </div>
      </div>
    );
  }
  const eventData = paymentData.data;
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push("/my-events")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back-to-my-events")}
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold">{t("event-details")}</h1>
        <EventDetailModal event={eventData} />
      </div>
    </div>
  );
};

export default UserEventDetailPage;
