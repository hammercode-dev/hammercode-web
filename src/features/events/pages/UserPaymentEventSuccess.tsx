"use client";

import { CircleCheckBig, ArrowLeft, MessageSquare } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useGetPaymentDetail } from "../hooks/useEvent";

const UserPaymentEventSuccess = () => {
  const router = useRouter();
  const params = useParams();

  const { data: paymentData, isLoading: isLoadingPaymentDetail } = useGetPaymentDetail(params?.orderNo as string);

  const handleBackToEvents = () => {
    router.push("/my-events");
  };

  if (isLoadingPaymentDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50 dark:bg-green-950">
            <CircleCheckBig className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="mb-3 text-center text-3xl font-bold text-slate-900 dark:text-slate-50">Payment Successful!</h1>

        <p className="mb-8 max-w-md text-center text-slate-600 dark:text-slate-400">
          Your payment has been processed successfully. We've sent a confirmation email to your registered email
          address.
        </p>

        <div className="w-full">
          <Card className="shadow-lg">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Payment Details</h2>
                <Badge variant="open">PAID</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Order Number</span>
                <span className="text-right text-sm font-medium text-slate-900 dark:text-slate-50">
                  {paymentData?.data?.order_no}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Transaction Number</span>
                <span className="text-right text-sm font-medium text-slate-900 dark:text-slate-50">
                  {paymentData?.data?.transaction_no}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Event</span>
                <span className="max-w-[60%] text-right text-sm font-medium text-slate-900 dark:text-slate-50">
                  {paymentData?.data?.event_detail.title}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Payment Date</span>
                <span className="text-right text-sm font-medium text-slate-900 dark:text-slate-50">
                  {paymentData?.data?.payment_date
                    ? new Date(paymentData?.data?.payment_date).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </span>
              </div>

              <div className="flex items-start justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                <span className="text-base font-semibold text-slate-900 dark:text-slate-50">Total Amount</span>
                <span className="text-base font-bold text-green-600 dark:text-green-400">
                  Rp {paymentData?.data?.event_detail.price.toLocaleString("id-ID")}
                </span>
              </div>
            </CardContent>

            <CardContent className="pt-0 pb-6">
              <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Participant Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Name</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {paymentData?.data?.user_detail.fullname}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Email</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {paymentData?.data?.user_detail.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Phone</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {paymentData?.data?.user_detail.phone_number}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardContent className="pt-0 pb-6">
              <div className="space-y-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-50">Event Schedule</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Date</span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-50">
                      {paymentData?.data?.event_detail?.date
                        ? new Date(paymentData?.data?.event_detail?.date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Duration</span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-50">
                      {paymentData?.data?.event_detail.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Type</span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-50">
                      {paymentData?.data?.event_detail.type} ({paymentData?.data?.event_detail.session_type})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Location</span>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-50">
                      {paymentData?.data?.event_detail.location}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleBackToEvents}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Events
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Need help? Contact us at{" "}
            <a href="https://wa.me/6281243530207" className="text-hmc-primary flex gap-2 hover:underline">
              +62-812-4353-0207 <MessageSquare className="h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentEventSuccess;
