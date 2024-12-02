import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { EventType } from "@/domains/Events";
import { useFormatPrice } from "@/lib/utils";
import EventImage from "./EventImage";
import useSubmitEventRegistration from "../hooks/useSubmitEventRegistration";

const EventFormRegistration = ({ data }: { data: EventType }) => {
  const t = useTranslations("EventsPage");
  const { form, isDialogOpen, isLoading, setIsDialogOpen, onSubmit } = useSubmitEventRegistration({ data });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="w-full p-2 rounded-lg text-xs text-background bg-hmc-base-darkblue font-bold dark:bg-slate-200"
        onClick={() => setIsDialogOpen(true)}
      >
        {t("EventDetail.register-button")}
      </DialogTrigger>
      <DialogContent className="max-w-[900px] dark:border-hmc-base-darkblue dark:border">
        <div>
          <h1 className="text-3xl text-hmc-base-lightblue font-semibold">{t("EventDetail.register-button")}</h1>
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
            <Card className="border p-3 space-y-4">
              <EventImage
                src={data?.image_event as string}
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="rounded-lg w-full"
              />
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs sm:text-sm dark:text-slate-200">Regular</span>
                <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(data?.price)}</p>
              </div>
              <hr />
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs sm:text-sm dark:text-slate-200">Total</span>
                <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(data?.price)}</p>
              </div>
              <SubmitButton
                size="sm"
                className="w-full"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </SubmitButton>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormRegistration;
