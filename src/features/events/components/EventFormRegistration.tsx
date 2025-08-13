"use client";

import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { EventType, RegistrationForm, registrationSchema } from "@/domains/Events";
import { useRegistEvent } from "../hooks/useRegistEvent";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { useRouter } from "@/lib/navigation";

const EventFormRegistration = ({ data }: { data: EventType }) => {
  const t = useTranslations("EventsPage");
  const router = useRouter();
  const { isAuthenticated, user } = useAuthUser();

  const [formActive, setFormActive] = useState(false);
  const { registEvent, isLoading } = useRegistEvent(data);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit: SubmitHandler<RegistrationForm> = (formData) => {
    if (!data) {
      return;
    }

    registEvent(formData);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.username || "",
        email: user.email || "",
        phone_number: "",
      });
    }
  }, [user, form]);

  return (
    <section>
      {!formActive && (
        <Button className="w-full" onClick={() => setFormActive(true)}>
          {t("EventDetail.register-button")}
        </Button>
      )}

      {formActive &&
        (isAuthenticated ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="cols-span-1">
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("EventRegistration.name.label")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("EventRegistration.name.placeholder")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("EventRegistration.email.label")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("EventRegistration.email.placeholder")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone_number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("EventRegistration.phone-number.label")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("EventRegistration.phone-number.placeholder")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="image_proof_payment"
                    control={form.control}
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel>{t("EventRegistration.image-proof-payment.label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            placeholder={t("EventRegistration.image-proof-payment.placeholder")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="col-span-1">
              <Card className="space-y-4 border p-3">
                <Button
                  size="sm"
                  className="w-full"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-center">
            Sorry you must login first! 😁
            <Button onClick={() => router.push("/sign-in")}>Login</Button>
          </div>
        ))}
    </section>
  );
};

export default EventFormRegistration;
