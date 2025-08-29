"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { createProfileFormSchema, ProfileFormType } from "@/domains/Profile";
import { cn } from "@/lib/utils";
import { useGetProfile, useUpdateProfile } from "../hooks";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";

interface ProfileFormProps {
  activeTab: "account" | "information";
}

const ProfileForm = ({ activeTab }: ProfileFormProps) => {
  const t = useTranslations("Profile");
  const profileFormSchema = createProfileFormSchema(t);
  const { data, isLoading } = useGetProfile();
  const { mutate } = useUpdateProfile();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      fullname: "",
      date_of_birth: "",
      phone_number: "",
      gender: "",
      address: "",
      github_url: "",
      linkedin_url: "",
      personal_web_url: "",
    },
  });

  useEffect(() => {
    if (data) {
      const resetData = {
        username: data.username || "",
        fullname: data.fullname || "",
        date_of_birth: data.date_of_birth || "",
        phone_number: data.phone_number || "",
        gender: data.gender || "",
        address: data.address || "",
        github_url: data.github_url || "",
        linkedin_url: data.linkedin_url || "",
        personal_web_url: data.personal_web_url || "",
      };

      form.reset(resetData);
    }
  }, [data]);

  const onSubmit = (data: ProfileFormType) => {
    mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  const renderForm = () => {
    if (activeTab === "account") {
      return (
        <>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.label.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.placeholder.username")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.label.fullname")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.placeholder.fullname")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("form.label.date-of-birth")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>{t("form.placeholder.date-of-birth")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      classNames={{
                        button_previous: "text-foreground hover:bg-accent p-2 rounded-lg hover:text-accent-foreground",
                        button_next: "text-foreground hover:bg-accent p-2 rounded-lg hover:text-accent-foreground",
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("form.label.gender")}</FormLabel>
                  <FormControl>
                    <Select defaultValue={data?.gender || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.placeholder.gender")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Male">{t("gender.male")}</SelectItem>
                          <SelectItem value="Female">{t("gender.female")}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.label.phone-number")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.placeholder.phone-number")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.label.address")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.placeholder.address")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    return (
      <>
        <FormField
          control={form.control}
          name="github_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.label.github")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.placeholder.github")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.label.linkedin")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.placeholder.linkedin")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal_web_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.label.personal-web")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.placeholder.personal-web")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {renderForm()}
        <Button type="submit" className="bg-hmc-base-darkblue dark:bg-hmc-base-lightblue w-full text-white sm:w-auto">
          {t("form.save-button")}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
