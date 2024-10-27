import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/Form";
import { Card } from "@/components/ui/Card";
import { EventType, RegistrationForm, registrationSchema } from "@/domains/Events";
import { useFormatPrice } from "@/lib/utils";

const EventFormRegistration = ({ data }: { data: EventType }) => {
  const t = useTranslations("EventsPage");
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (formData: RegistrationForm) => {
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full p-2 rounded-lg text-xs text-white bg-hmc-base-darkblue font-bold dark:bg-slate-200">
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your phone number" />
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
                          <FormLabel>Proof of Payment</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="file"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                              placeholder="Upload proof of payment"
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
                          <FormLabel>Net Amount</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} placeholder="Enter the net amount" />
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
              <Image
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
              <Button size="sm" className="w-full" type="submit" onClick={form.handleSubmit(onSubmit)}>
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
