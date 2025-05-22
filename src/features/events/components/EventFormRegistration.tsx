"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { useFormatPrice } from "@/lib/format";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { EventType, RegistrationForm, registrationSchema } from "@/domains/Events";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { useRegistEvent } from "../hooks/useRegistEvent";
import EventImage from "./EventImage";
import { Button } from "@/components/ui/Button";

const EventFormRegistration = ({ data }: { data: EventType }) => {
  const t = useTranslations("EventsPage");
  const { registEvent, isLoading, isDialogOpen, setIsDialogOpen } = useRegistEvent(data);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (formData: RegistrationForm) => {
    if (!data) {
      return;
    }

    registEvent(formData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="text-background bg-hmc-base-darkblue w-full rounded-lg p-2 text-xs font-bold dark:bg-slate-200"
        onClick={() => setIsDialogOpen(true)}
      >
        {t("EventDetail.register-button")}
      </DialogTrigger>
      <DialogContent className="dark:border-hmc-base-darkblue max-w-[900px] dark:border">
        <div>
          <h1 className="text-hmc-base-lightblue text-3xl font-semibold">{t("EventDetail.register-button")}</h1>
          <p className="text-md font-semibold">{data?.title}</p>
        </div>
        <hr />
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <FormField
                      name="image_proof_payment"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("EventRegistration.image-proof-payment.label")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="file"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                              value={undefined}
                              placeholder={t("EventRegistration.image-proof-payment.placeholder")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <FormField
                      name="net_amount"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("EventRegistration.net-amount.label")}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              placeholder={t("EventRegistration.net-amount.placeholder")}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div className="col-span-2">
            <Card className="space-y-4 border p-3">
              <EventImage
                src={data?.image_event as string}
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="w-full rounded-lg"
              />
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-semibold sm:text-sm dark:text-slate-200">Regular</span>
                <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(data?.price)}</p>
              </div>
              <hr />
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-semibold sm:text-sm dark:text-slate-200">Total</span>
                <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(data?.price)}</p>
              </div>
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
      </DialogContent>
    </Dialog>
  );
};

export default EventFormRegistration;
