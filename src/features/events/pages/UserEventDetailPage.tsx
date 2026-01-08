"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventDetailModal } from "../components/EventDetailModal";
import { useGetPaymentDetail } from "../hooks/useEvent";
import Loader from "@/components/common/Loader";

const UserEventDetailPage = () => {
  const router = useRouter();
  const params = useParams();

  const transactionId = params?.transactionId as string;
  const { data: paymentData, isLoading } = useGetPaymentDetail(transactionId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!paymentData?.data) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Transaction Not Found</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            The transaction you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => router.push("/my-events")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Events
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
          Back to My Events
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-6 text-2xl font-bold">Event Details</h1>
        <EventDetailModal event={eventData} />
      </div>
    </div>
  );
};

export default UserEventDetailPage;
