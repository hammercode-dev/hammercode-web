"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Save, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import TextEditor from "@/components/common/TextEditor/TextEditor";
import { cn, generateSlug } from "@/lib/utils";

import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file_name: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  is_online: z.boolean(),
  date: z.string().min(1, "Event date is required"),
  type: z.string().min(1, "Event type is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  status: z.string().min(1, "Status is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  price: z.number().min(0, "Price must be 0 or greater"),
  registration_link: z.string().url("Must be a valid URL"),
  tags: z.array(z.string()),
  speakers: z.array(z.string()),
  reservation_start_date: z.string().min(1, "Reservation start date is required"),
  reservation_end_date: z.string().min(1, "Reservation end date is required"),
});

type EventFormType = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormType) => void;
  isLoading?: boolean;
  initialData?: Partial<EventFormType>;
  mode?: "create" | "edit";
}

const EventForm = ({ onSubmit, isLoading = false, initialData, mode = "create" }: EventFormProps) => {
  const [tagInput, setTagInput] = useState("");
  const [speakerInput, setSpeakerInput] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const form = useForm<EventFormType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      file_name: "",
      slug: "",
      is_online: false,
      date: "",
      type: "",
      location: "",
      duration: "",
      status: "coming soon",
      capacity: 0,
      price: 0,
      registration_link: "",
      tags: [],
      speakers: [],
      reservation_start_date: "",
      reservation_end_date: "",
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
    console.log("dataaaa", data);
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
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
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
                    <FormLabel aria-required>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter event slug"
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
                  <FormLabel aria-required>Description</FormLabel>
                  <FormControl>
                    <TextEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tech Talk">Tech Talk</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Conference">Conference</SelectItem>
                        <SelectItem value="Bootcamp">Bootcamp</SelectItem>
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
                    <FormLabel aria-required>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coming soon">Coming Soon</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <FormLabel aria-required>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
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
                  <FormLabel aria-required>Event Date</FormLabel>
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
                    <FormLabel aria-required>Reservation Start Date</FormLabel>
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
                    <FormLabel aria-required>Reservation End Date</FormLabel>
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
                    <FormLabel aria-required>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2 hours" {...field} />
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
                    <FormLabel aria-required>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter capacity"
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
                    <FormLabel aria-required>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
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
                  <FormLabel aria-required>Registration Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/register" {...field} />
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
                  <FormLabel>Tags</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
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
                        Add
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
                  <FormLabel>Speakers</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a speaker"
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
                        Add
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

            <FormField
              control={form.control}
              name="is_online"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Online Event</FormLabel>
                    <div className="text-muted-foreground text-sm">Is this an online event?</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-hmc-base-blue hover:bg-hmc-base-blue/90" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading
                  ? mode === "create"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "create"
                    ? "Create Event"
                    : "Update Event"}
              </Button>

              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
