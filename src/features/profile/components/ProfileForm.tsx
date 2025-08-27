"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
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
  const t = useTranslations();
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
      address: "",
      github: "",
      linkedin: "",
      personal_web: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.username || "",
        fullname: data.fullname || "",
        date_of_birth: data.date_of_birth || "",
        phone_number: data.phone_number || "",
        address: data.address || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        personal_web: data.personal_web || "",
      });
    }
  }, [data]);

  const onSubmit = (data: ProfileFormType) => {
    // ! TODO handle query mutation
    console.log("Profile data:", data);
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
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
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
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
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="Enter your github account" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="Enter your linkedin account" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal_web"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website</FormLabel>
              <FormControl>
                <Input placeholder="Enter your personal website" {...field} />
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
          Save Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
