"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Save, X, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import TextEditor from "@/components/common/TextEditor/TextEditor";
import { cn, generateSlug } from "@/lib/utils";
import { createEventFormSchema, EventFormType } from "@/domains/Events";
import { eventTypes, eventStatuses, sessionTypes } from "../constants";
import React, { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import { useRouter } from "@/lib/navigation";
import Image from "next/image";

interface EventFormProps {
  onSubmit: (data: EventFormType) => void;
  isLoading?: boolean;
  initialData?: Partial<EventFormType>;
  mode?: "create" | "edit";
}

const EventForm = ({ onSubmit, isLoading = false, initialData, mode = "create" }: EventFormProps) => {
  const t = useTranslations("EventForm");
  const router = useRouter();
  const eventFormSchema = createEventFormSchema(t);
  const [tagInput, setTagInput] = useState("");
  const [speakerInput, setSpeakerInput] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const form = useForm<EventFormType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      slug: "",
      date: "",
      type: "",
      session_type: "",
      location: "",
      duration: "",
      status: "soon",
      capacity: 0,
      price: 0,
      registration_link: "",
      tags: [],
      speakers: [],
      reservation_start_date: "",
      reservation_end_date: "",
      image: "",
    },
  });

  const titleValue = form.watch("title");

  useEffect(() => {
    if (titleValue && !isSlugEdited) {
      const generatedSlug = generateSlug(titleValue);
      form.setValue("slug", generatedSlug);
    }
  }, [titleValue, isSlugEdited]);

  const addTag = () => {
    if (tagInput.trim() && !form.getValues("tags").includes(tagInput.trim())) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addSpeaker = () => {
    if (speakerInput.trim() && !form.getValues("speakers").includes(speakerInput.trim())) {
      const currentSpeakers = form.getValues("speakers");
      form.setValue("speakers", [...currentSpeakers, speakerInput.trim()]);
      setSpeakerInput("");
    }
  };

  const removeSpeaker = (speakerToRemove: string) => {
    const currentSpeakers = form.getValues("speakers");
    form.setValue(
      "speakers",
      currentSpeakers.filter((speaker) => speaker !== speakerToRemove)
    );
  };

  const handleSubmit = (data: EventFormType) => {
    onSubmit(data);
  };

  return (
    <Card className="py-6">
      <CardContent className="py-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("placeholders.title")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.slug")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.slug")}
                        {...field}
                        onChange={(e) => {
                          setIsSlugEdited(true);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>{t("labels.description")}</FormLabel>
                  <FormControl>
                    <TextEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {initialData?.file_name && (
              <div className="relative h-82 w-full overflow-hidden rounded-md border">
                <Image
                  src={initialData.file_name}
                  alt="Background blur"
                  width={400}
                  height={160}
                  className="absolute inset-0 h-82 w-full object-cover blur-sm"
                />
                <Image
                  src={initialData.file_name}
                  alt="Current event image"
                  width={200}
                  height={200}
                  className="relative z-10 mx-auto max-h-82 w-full object-contain"
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>{t("labels.image")}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
                      />
                      <Upload className="text-muted-foreground h-4 w-4" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.type")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("placeholders.type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="session_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.session-type")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("placeholders.session-type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sessionTypes.map((sessionType) => (
                          <SelectItem key={sessionType.value} value={sessionType.value}>
                            {sessionType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.status")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("placeholders.status")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>{t("labels.location")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.location")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel aria-required>{t("labels.date")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(new Date(field.value), "PPP") : <span>{t("placeholders.date")}</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="reservation_start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel aria-required>{t("labels.reservation-start")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(new Date(field.value), "PPP") : <span>{t("placeholders.date")}</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reservation_end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel aria-required>{t("labels.reservation-end")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(new Date(field.value), "PPP") : <span>{t("placeholders.date")}</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.duration")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("placeholders.duration")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.capacity")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("placeholders.capacity")}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>{t("labels.price")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("placeholders.price")}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="registration_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>{t("labels.registration-link")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.registration-link")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.tags")}</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("placeholders.tags")}
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        {t("buttons.add")}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speakers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.speakers")}</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("placeholders.speakers")}
                        value={speakerInput}
                        onChange={(e) => setSpeakerInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSpeaker();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSpeaker} variant="outline">
                        {t("buttons.add")}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((speaker, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {speaker}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpeaker(speaker)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-hmc-base-blue hover:bg-hmc-base-blue/90" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading
                  ? mode === "create"
                    ? t("buttons.creating")
                    : t("buttons.updating")
                  : mode === "create"
                    ? t("buttons.create")
                    : t("buttons.update")}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.back();
                }}
              >
                {t("buttons.cancel")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
