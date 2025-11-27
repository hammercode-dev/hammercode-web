import { formatDateEvent } from "@/lib/format";
import Image from "next/image";
import { UserEventResponse } from "../types/userEvent";
import {
  Stepper,
  StepperItem,
  StepperNav,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperDescription,
} from "@/components/ui/Stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Check, X, UserCheck, CreditCard, CheckCircle2, Calendar, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRegistEvent } from "../hooks/useRegistEvent";

interface EventDetailModalProps {
  event: UserEventResponse;
}

export const EventDetailModal = ({ event }: EventDetailModalProps) => {
  const { event_detail, user_detail } = event;
  const { checkPaymentStatus, isCheckingPayment } = useRegistEvent();

  const getActiveStep = () => {
    if (event.status === "SUCCESS") return 3;
    if (event.status === "FAILED") return 3;
    if (event.status === "EXPIRED") return 3;
    if (event.status === "PENDING") return 2;
    return 1;
  };

  return (
    <div className="scrollbar-hide space-y-4 overflow-auto">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={event_detail.image}
          alt={event_detail.title}
          fill
          className="scale-110 object-cover blur-2xl brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <Image src={event_detail.image} alt={event_detail.title} fill className="object-contain" />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Status</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Order: {event.order_no || "-"}</p>
        </div>
        <Stepper value={getActiveStep()} orientation="horizontal">
          <StepperNav className="w-full gap-0">
            <StepperItem step={1} completed={getActiveStep() >= 1}>
              <div className="flex flex-col items-center gap-2">
                <StepperTrigger className="flex flex-col items-center gap-2">
                  <StepperIndicator className="size-10 data-[state=active]:bg-green-500 data-[state=completed]:bg-green-500">
                    {getActiveStep() >= 1 ? <Check className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                  </StepperIndicator>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">STEP 1</span>
                    <span className="text-xs font-semibold">Registered</span>
                  </div>
                </StepperTrigger>
                <StepperDescription className="mt-1">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      getActiveStep() >= 1
                        ? "bg-green-500/10 text-green-500"
                        : "bg-gray-500/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {getActiveStep() >= 1 ? "Completed" : "Pending"}
                  </span>
                </StepperDescription>
              </div>
              <StepperSeparator className="data-[state=completed]:bg-green-500" />
            </StepperItem>

            <StepperItem step={2} completed={getActiveStep() >= 2}>
              <div className="flex flex-col items-center gap-2">
                <StepperTrigger className="flex flex-col items-center gap-2">
                  <StepperIndicator
                    className={cn("size-10", getActiveStep() === 3 && "data-[state=completed]:bg-green-500")}
                  >
                    {getActiveStep() > 2 ? <Check className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                  </StepperIndicator>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">STEP 2</span>
                    <span className="text-xs font-semibold">Payment Info</span>
                  </div>
                </StepperTrigger>
                <StepperDescription className="mt-1">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      getActiveStep() > 2
                        ? "bg-green-500/10 text-green-500"
                        : "bg-gray-500/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {getActiveStep() > 2 ? "Completed" : "Pending"}
                  </span>
                </StepperDescription>
              </div>
              <StepperSeparator className={cn(getActiveStep() === 2 ? "" : "data-[state=completed]:bg-green-500")} />
            </StepperItem>

            <StepperItem step={3} completed={getActiveStep() >= 3}>
              <div className="flex flex-col items-center gap-2">
                <StepperTrigger className="flex flex-col items-center gap-2">
                  <StepperIndicator
                    className={`size-10 ${
                      event.status === "SUCCESS"
                        ? "text-white data-[state=completed]:bg-green-500"
                        : event.status === "FAILED"
                          ? "!bg-red-500 text-white"
                          : event.status === "EXPIRED"
                            ? "!bg-red-500 text-white"
                            : "bg-black text-white"
                    }`}
                  >
                    {event.status === "SUCCESS" ? (
                      <Check className="h-5 w-5" />
                    ) : event.status === "FAILED" ? (
                      <X className="h-5 w-5" />
                    ) : event.status === "EXPIRED" ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </StepperIndicator>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">STEP 3</span>
                    <span className="text-xs font-semibold">
                      {event.status === "SUCCESS"
                        ? "Payment Success"
                        : event.status === "FAILED"
                          ? "Payment Failed"
                          : event.status === "EXPIRED"
                            ? "Payment Expired"
                            : "On Pending"}
                    </span>
                  </div>
                </StepperTrigger>
                <StepperDescription className="mt-1">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      event.status === "SUCCESS"
                        ? "bg-green-500/10 text-green-500"
                        : event.status === "FAILED"
                          ? "bg-red-500/10 text-red-500"
                          : event.status === "EXPIRED"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-gray-500/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {event.status === "SUCCESS"
                      ? "Completed"
                      : event.status === "FAILED"
                        ? "Failed"
                        : event.status === "EXPIRED"
                          ? "Expired"
                          : "Pending"}
                  </span>
                </StepperDescription>
              </div>
            </StepperItem>
          </StepperNav>
        </Stepper>

        {event.status === "PENDING" && event.payment_url && (
          <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Complete Your Payment</p>
              <a
                href={event.payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Payment Page →
              </a>
            </div>
            <Button
              className="w-full cursor-pointer"
              onClick={() => {
                checkPaymentStatus({ transaction_no: event.transaction_no });
              }}
              disabled={isCheckingPayment}
            >
              {isCheckingPayment ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Checking...
                </>
              ) : (
                "Check Payment Status"
              )}
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="event" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="event" className="flex-1">
            <Calendar className="h-4 w-4" />
            Event Details
          </TabsTrigger>
          <TabsTrigger value="registration" className="flex-1">
            <User className="h-4 w-4" />
            Registration Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="event" className="space-y-4 pt-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Event Title</p>
              <p className="font-medium">{event_detail.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Event Date</p>
                <p className="font-medium">{event_detail.date ? formatDateEvent(event_detail.date) : "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium capitalize">{event_detail.type}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium">{event_detail.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium">{event_detail.duration}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                <p className="font-medium">{event_detail.capacity} participants</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                <p className="font-medium">
                  {event_detail.price === 0 ? "Free" : `Rp ${event_detail.price.toLocaleString("id-ID")}`}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{user_detail.fullname || user_detail.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{user_detail.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="font-medium">{user_detail.phone_number || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Payment Date</p>
                <p className="font-medium">{event.payment_date ? formatDateEvent(event.payment_date) : "-"}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
