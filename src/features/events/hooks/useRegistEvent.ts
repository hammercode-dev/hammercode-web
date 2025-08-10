import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { uploadsService } from "@/services/uploads";
import { eventsService } from "@/services/events";
import { EventType, RegistrationForm } from "@/domains/Events";

export const useRegistEvent = (data: EventType) => {
  const t = useTranslations("EventsPage");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameImage, setNameImage] = useState<string | null>("");
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const registEvent = async (formData: RegistrationForm) => {
    setIsLoading(true);

    try {
      const { image_proof_payment, ...registDetails } = formData;

      interface NewPayload extends RegistrationForm {
        event_id: number;
      }

      let registPayload: NewPayload = {
        event_id: 0,
        image_proof_payment: "",
        ...registDetails,
      };

      if (!nameImage) {
        console.log("image proof payment", image_proof_payment);
        const {
          data: { file_name: uploadedImageFileName },
        } = await uploadsService.uploadImage(image_proof_payment as File, "payment", "event");

        setNameImage(uploadedImageFileName);
        registPayload = {
          ...registDetails,
          image_proof_payment: uploadedImageFileName as string,
          event_id: data?.id as number,
        };
      } else {
        registPayload = {
          ...registDetails,
          image_proof_payment: nameImage as string,
          event_id: data?.id as number,
        };
      }

      const res = await eventsService.registerEvent(registPayload);

      toast.success(`${t("EventRegistration.success.title")}`, {
        description: `${t("EventRegistration.success.description")} ${res.data.order_no}`,
      });
      setNameImage("");
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(t("EventRegistration.failure.title"), {
        description: error instanceof Error ? error.message : t("EventRegistration.failure.description"),
      });
      setIsLoading(false);
    }
  };

  return { registEvent, isLoading };
};
