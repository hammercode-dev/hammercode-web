"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import TextEditor from "@/components/common/TextEditor";
import { Save } from "lucide-react";

const AdminEventsCreatePage = () => {
  const form = useForm();

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">Add a new event or workshop</p>
      </div>

      <Card className="py-4">
        <CardContent>
          <Form {...form}>
            <div className="space-y-6">
              <FormItem>
                <FormLabel>Event Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" required />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TextEditor />
                </FormControl>
                <FormMessage />
              </FormItem>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-hmc-base-blue hover:bg-hmc-base-blue/90">
                  <Save className="mr-2 h-4 w-4" />
                  Create Event
                </Button>

                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminEventsCreatePage;
