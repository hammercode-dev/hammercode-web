import { uploadsService } from "@/services/uploads";
import { eventsService } from "@/services/events";
import { EventType, RegistrationForm } from "@/domains/Events";
import { useToast } from "@/components/hooks/UseToast";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const useRegistEvent = (data: EventType) => {
  const t = useTranslations("EventsPage");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const registEvent = async (formData: RegistrationForm) => {
    setIsLoading(true);

    try {
      const { net_amount, image_proof_payment, ...registDetails } = formData;
      const eventPrice = data?.price as number;

      if (net_amount < eventPrice) {
        throw new Error(t("EventRegistration.error.net-amount-low"));
      }

      const {
        data: { file_name: uploadedImageFileName },
      } = await uploadsService.uploadImage(image_proof_payment, "payment", "event");

      const registPayload = {
        ...registDetails,
        net_amount,
        image_proof_payment: uploadedImageFileName,
        event_id: data?.id as number,
      };

      const res = await eventsService.registerEvent(registPayload);

      toast({
        title: t("EventRegistration.success.title"),
        description: `${t("EventRegistration.success.description")} ${res.data.order_no}`,
      });

      setIsLoading(false);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: t("EventRegistration.failure.title"),
        description: error instanceof Error ? error.message : t("EventRegistration.failure.description"),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return { registEvent, isLoading, isDialogOpen, setIsDialogOpen };
};
