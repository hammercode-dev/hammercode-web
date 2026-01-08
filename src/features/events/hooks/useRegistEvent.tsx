import { toast } from "sonner";
import { eventsService } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDialog } from "@/contexts";
import EventCheckStatusModal from "../components/EventCheckStatusModal";
import { useRouter } from "@/lib/navigation";

export const useRegistEvent = () => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const queryClient = useQueryClient();

  const { mutate: registerEvent, isPending: isPendingRegister } = useMutation({
    mutationKey: ["registerEvent"],
    mutationFn: ({ event_id }: { event_id: number }) => eventsService.registerEvent(event_id),
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push(`/my-events/${data.data.order_no}`);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const { mutate: checkPaymentStatus, isPending: isCheckingPayment } = useMutation({
    mutationKey: ["checkPaymentStatus"],
    mutationFn: async ({ transaction_no }: { transaction_no: string }) =>
      eventsService.checkPaymentStatus(transaction_no),
    onSuccess: (data, variables) => {
      const paymentStatus = data?.data?.status;

      openDialog({
        content: (
          <EventCheckStatusModal
            status={paymentStatus}
            transaction_no={data?.data?.transaction_no}
            onRefresh={() => {
              closeDialog();
              setTimeout(() => {
                checkPaymentStatus({ transaction_no: variables.transaction_no });
              }, 300);
            }}
          />
        ),
        size: "sm",
      });

      queryClient.invalidateQueries({ queryKey: ["getListMyEvents"] });

      if (paymentStatus?.toUpperCase() === "SUCCESS") {
        setTimeout(() => {
          toast.success("Payment verified!", {
            description: "Your event registration is now confirmed.",
          });
        }, 3500);
      }
    },
    onError: () => {
      toast.error("Failed to check payment status", {
        description: "Please try again later or contact support if the problem persists.",
      });
    },
  });

  return { checkPaymentStatus, isCheckingPayment, registerEvent, isPendingRegister };
};
