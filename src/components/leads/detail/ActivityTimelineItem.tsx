// src/components/leads/detail/ActivityTimelineItem.tsx
"use client";

import { cn } from "@/lib/utils";
import { StickyNote, Phone, Mail, Users, Brain, Briefcase, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type ActivityType = "Note" | "Call" | "Email" | "Meeting" | "System Update" | "AI Update" | "Task" | "Other";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  user: string; // Name of user/agent or "System" / "TerraFlow AI"
  content: string;
  timestamp: Date;
  leadName: string; // To personalize messages like "logged a call with {leadName}"
}

interface ActivityTimelineItemProps {
  activity: ActivityEvent;
  isLastItem: boolean;
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  "Note": StickyNote,
  "Call": Phone,
  "Email": Mail,
  "Meeting": Users,
  "System Update": Briefcase,
  "AI Update": Brain,
  "Task": CheckCircle,
  "Other": StickyNote, // Fallback icon
};

const activityColors: Record<ActivityType, string> = {
  "Note": "bg-yellow-400",
  "Call": "bg-blue-400",
  "Email": "bg-purple-400",
  "Meeting": "bg-teal-400",
  "System Update": "bg-slate-400",
  "AI Update": "bg-indigo-400",
  "Task": "bg-green-400",
  "Other": "bg-gray-400",
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return `Yesterday`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getActivityTitle(activity: ActivityEvent): string {
    switch(activity.type) {
        case "Note": return `${activity.user} added a note for ${activity.leadName}`;
        case "Call": return `${activity.user} logged a call with ${activity.leadName}`;
        case "Email": return `${activity.user} sent an email to ${activity.leadName}`;
        case "Meeting": return `${activity.user} had a meeting with ${activity.leadName}`;
        case "Task": return `${activity.user} completed a task for ${activity.leadName}`;
        case "System Update": return `System update regarding ${activity.leadName}`;
        case "AI Update": return `AI insight for ${activity.leadName}`;
        default: return `${activity.user} performed an action related to ${activity.leadName}`;
    }
}


export const ActivityTimelineItem: React.FC<ActivityTimelineItemProps> = ({ activity, isLastItem }) => {
  const Icon = activityIcons[activity.type] || StickyNote;
  const iconBgColor = activityColors[activity.type] || "bg-gray-400";

  return (
    <div className="flex gap-4 relative">
      {/* Vertical Line and Dot */}
      <div className="flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", iconBgColor)}>
          <Icon className="w-4 h-4" />
        </div>
        {!isLastItem && <div className="w-px h-full bg-border flex-grow"></div>}
      </div>

      {/* Activity Card */}
      <div className="flex-1 pb-6">
        <Card className="shadow-sm bg-card border-border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold text-foreground">
              {getActivityTitle(activity)}
            </CardTitle>
            <CardDescription 
                className="text-xs text-muted-foreground"
                suppressHydrationWarning={true}
            >
              {formatTimestamp(activity.timestamp)} by {activity.user}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{activity.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ActivityTimelineProps {
  activities: ActivityEvent[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <StickyNote className="mx-auto h-12 w-12 text-primary/30 mb-3" />
        No activities logged yet.
      </div>
    );
  }
  return (
    <div className="space-y-0"> {/* Removed space-y-0 to let items control their own bottom padding */}
      {activities.map((activity, index) => (
        <ActivityTimelineItem 
          key={activity.id} 
          activity={activity} 
          isLastItem={index === activities.length - 1} 
        />
      ))}
    </div>
  );
};
