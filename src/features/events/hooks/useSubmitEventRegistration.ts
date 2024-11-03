import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/hooks/UseToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventType, RegistrationForm, registrationSchema } from "@/domains/Events";
import { eventsService } from "@/services/events";
import { uploadsService } from "@/services/uploads";

const useSubmitEventRegistration = ({ data }: { data: EventType }) => {
  const t = useTranslations("EventsPage");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (formData: RegistrationForm) => {
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

      const res = await eventsService.registEvent(registPayload);

      toast({
        title: t("EventRegistration.success.title"),
        description: `${t("EventRegistration.success.description")} ${res.data.order_no}`,
      });

      setIsLoading(false);
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: t("EventRegistration.failure.title"),
        description: error instanceof Error ? error.message : t("EventRegistration.failure.description"),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isDialogOpen, setIsDialogOpen, form };
};

export default useSubmitEventRegistration;
