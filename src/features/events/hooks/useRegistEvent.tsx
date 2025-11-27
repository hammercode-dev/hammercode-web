// import { useState } from "react";
// import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { eventsService } from "@/services/events";
// import { EventType } from "@/domains/Events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDialog } from "@/contexts";
import EventCheckStatusModal from "../components/EventCheckStatusModal";

export const useRegistEvent = () => {
  // const t = useTranslations("EventsPage");
  const { openDialog, closeDialog } = useDialog();
  const queryClient = useQueryClient();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [nameImage, setNameImage] = useState<string | null>("");
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // const registEvent = async (formData: RegistrationForm) => {
  //   setIsLoading(true);

  //   try {
  //     const { image_proof_payment, ...registDetails } = formData;

  //     interface NewPayload extends RegistrationForm {
  //       event_id: number;
  //     }

  //     let registPayload: NewPayload = {
  //       event_id: 0,
  //       image_proof_payment: "",
  //       ...registDetails,
  //     };

  //     if (!nameImage) {
  //       console.log("image proof payment", image_proof_payment);
  //       const {
  //         data: { file_name: uploadedImageFileName },
  //       } = await uploadsService.uploadImage(image_proof_payment as File, "event");

  //       setNameImage(uploadedImageFileName);
  //       registPayload = {
  //         ...registDetails,
  //         image_proof_payment: uploadedImageFileName as string,
  //         event_id: data?.id as number,
  //       };
  //     } else {
  //       registPayload = {
  //         ...registDetails,
  //         image_proof_payment: nameImage as string,
  //         event_id: data?.id as number,
  //       };
  //     }

  //     const res = await eventsService.registerEvent(registPayload);

  //     toast.success(`${t("EventRegistration.success.title")}`, {
  //       description: `${t("EventRegistration.success.description")} ${res.data.order_no}`,
  //     });
  //     setNameImage("");
  //     setIsLoading(false);
  //   } catch (error) {
  //     // console.log(error);
  //     toast.error(t("EventRegistration.failure.title"), {
  //       description: error instanceof Error ? error.message : t("EventRegistration.failure.description"),
  //     });
  //     setIsLoading(false);
  //   }
  // };
  const { mutate: registerEvent, isPending: isPendingRegister } = useMutation({
    mutationKey: ["registerEvent"],
    mutationFn: ({ event_id }: { event_id: number }) => eventsService.registerEvent(event_id),
    onSuccess: (data) => {
      toast.success(data?.message);
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
