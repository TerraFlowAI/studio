
"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivityTimeline, type ActivityEvent, type ActivityType } from "./ActivityTimelineItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, StickyNote, Phone, Mail, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const noteSchema = z.object({
  content: z.string().min(1, "Note content cannot be empty."),
});
const logActivitySchema = z.object({
  activityType: z.string().min(1, "Activity type is required."),
  summary: z.string().min(1, "Summary cannot be empty."),
});
const emailSchema = z.object({
  subject: z.string().min(1, "Subject cannot be empty."),
  body: z.string().min(1, "Email body cannot be empty."),
});

type NoteFormValues = z.infer<typeof noteSchema>;
type LogActivityFormValues = z.infer<typeof logActivitySchema>;
type EmailFormValues = z.infer<typeof emailSchema>;

interface ActivityHubProps {
  activities: ActivityEvent[];
  onAddActivity: (activity: Omit<ActivityEvent, 'id' | 'timestamp' | 'leadName'>) => void;
  leadName: string;
}

const activityTypes: { value: ActivityType; label: string }[] = [
  { value: "Call", label: "Call" },
  { value: "Meeting", label: "Meeting" },
  { value: "Task", label: "Task Completed" },
  { value: "Other", label: "Other" },
];

export function ActivityHub({ activities, onAddActivity, leadName }: ActivityHubProps) {
  const [activeTab, setActiveTab] = React.useState<"note" | "log" | "email">("note");
  const [timelineFilter, setTimelineFilter] = React.useState<ActivityType | "All">("All");

  const noteForm = useForm<NoteFormValues>({ resolver: zodResolver(noteSchema), defaultValues: { content: "" } });
  const logActivityForm = useForm<LogActivityFormValues>({ resolver: zodResolver(logActivitySchema), defaultValues: { activityType: "", summary: "" } });
  const emailForm = useForm<EmailFormValues>({ resolver: zodResolver(emailSchema), defaultValues: { subject: "", body: "" } });

  const handleNoteSubmit = (values: NoteFormValues) => {
    onAddActivity({ type: "Note", content: values.content, user: "Loushik" });
    noteForm.reset();
  };
  const handleLogActivitySubmit = (values: LogActivityFormValues) => {
    onAddActivity({ type: values.activityType as ActivityType, content: values.summary, user: "Loushik" });
    logActivityForm.reset();
  };
  const handleEmailSubmit = (values: EmailFormValues) => {
    onAddActivity({ type: "Email", content: `Subject: ${values.subject}\n\n${values.body}`, user: "Loushik" });
    emailForm.reset();
  };

  const filteredActivities = React.useMemo(() => {
    if (timelineFilter === "All") return activities;
    return activities.filter(act => act.type === timelineFilter);
  }, [activities, timelineFilter]);

  return (
    <Card className="shadow-lg bg-card">
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="note" onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="note">
              <StickyNote className="mr-2 h-4 w-4" /> Add Note
            </TabsTrigger>
            <TabsTrigger value="log">
              <Phone className="mr-2 h-4 w-4" /> Log Activity
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" /> Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="note">
            <Form {...noteForm}>
              <form onSubmit={noteForm.handleSubmit(handleNoteSubmit)} className="space-y-4">
                <FormField
                  control={noteForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl><Textarea placeholder={`Add a note about ${leadName}...`} {...field} rows={4} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" /> Submit Note
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="log">
            <Form {...logActivityForm}>
              <form onSubmit={logActivityForm.handleSubmit(handleLogActivitySubmit)} className="space-y-4">
                <FormField
                  control={logActivityForm.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select activity type" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {activityTypes.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={logActivityForm.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>Summary</FormLabel>
                      <FormControl><Textarea placeholder={`Log details of your interaction with ${leadName}...`} {...field} rows={3} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" /> Log Activity
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="email">
             <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                 <FormField
                  control={emailForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl><Input placeholder={`Email subject for ${leadName}`} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl><Textarea placeholder={`Compose your email to ${leadName}...`} {...field} rows={5} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => alert("TerraScribe™ Clicked!")}>
                        <Wand2 className="mr-2 h-4 w-4" /> Use TerraScribe™ Template
                    </Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Send className="mr-2 h-4 w-4" /> Send Email
                    </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold font-headline text-primary">Activity Feed</h3>
            <Select value={timelineFilter} onValueChange={(value) => setTimelineFilter(value as ActivityType | "All")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Show: All Activity</SelectItem>
                <SelectItem value="Note">Notes</SelectItem>
                <SelectItem value="Call">Calls</SelectItem>
                <SelectItem value="Email">Emails</SelectItem>
                <SelectItem value="Meeting">Meetings</SelectItem>
                <SelectItem value="Task">Tasks</SelectItem>
                <SelectItem value="System Update">System Updates</SelectItem>
                <SelectItem value="AI Update">AI Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[400px] pr-3"> {/* Adjust height as needed */}
            <ActivityTimeline activities={filteredActivities} />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
