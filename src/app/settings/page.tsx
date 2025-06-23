
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Users, CreditCard, Bell, Plug, Shield, Palette, Globe, MapPin, Edit3, Trash2, LogOut, Eye, MoreVertical, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/app/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useTheme } from "next-themes";

type SettingsSection = "profile" | "team" | "billing" | "notifications" | "integrations" | "security";

// Mock user role - in a real app, this would come from auth state
const userRole = "admin"; // or "user", "owner"

const teamMembers = [
  { id: "1", name: "Aman Sharma", email: "aman@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/40x40.png?text=AS" },
  { id: "2", name: "Priya Singh", email: "priya@example.com", role: "Agent", status: "Active", avatar: "https://placehold.co/40x40.png?text=PS" },
  { id: "3", name: "Rajesh Kumar", email: "rajesh@example.com", role: "Agent", status: "Pending Invitation", avatar: "https://placehold.co/40x40.png?text=RK" },
];

const invoices = [
  { id: "inv1", date: "2024-07-01", amount: "₹5,000", link: "#" },
  { id: "inv2", date: "2024-06-01", amount: "₹5,000", link: "#" },
  { id: "inv3", date: "2024-05-01", amount: "₹4,000", link: "#" },
];

const integrations = [
  { id: "gcal", name: "Google Calendar", logo: Globe, connected: true },
  { id: "gmail", name: "Gmail", logo: User, connected: false }, // Placeholder icons
  { id: "slack", name: "Slack", logo: User, connected: true },
  { id: "zapier", name: "Zapier", logo: User, connected: false },
];


export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = React.useState<SettingsSection>("profile");

  // State for profile form
  const [displayName, setDisplayName] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // When the component loads and we have user data, populate the form
  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);


  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to update your profile.", variant: "destructive" });
        return;
    }
    setIsSaving(true);
    try {
        await updateProfile(user, { displayName });
        toast({ title: "Profile Updated", description: "Your profile information has been saved successfully." });
    } catch (error) {
        console.error("Error updating profile:", error);
        toast({ title: "Update Failed", description: "Could not update your profile. Please try again.", variant: "destructive" });
    } finally {
        setIsSaving(false);
    }
  };

  const handlePasswordChange = () => {
    toast({ title: "Password Changed", description: "Your password has been successfully updated." });
  }

  const settingsNavItems = [
    { id: "profile", label: "My Profile", icon: User },
    ...(userRole === "admin" || userRole === "owner" ? [{ id: "team" as SettingsSection, label: "My Team", icon: Users }] : []),
    { id: "billing", label: "Billing & Plan", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "security", label: "Security", icon: Shield },
  ];
  
  if (!user || !mounted) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Loading profile...</p>
          </div>
      )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Your Information</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={userRole.charAt(0).toUpperCase() + userRole.slice(1)} disabled />
                  </div>
                  <Button type="submit" disabled={isSaving} className="bg-primary hover:bg-primary/90">
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Profile Picture</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL || "https://placehold.co/100x100.png"} alt="User Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2 items-center sm:items-start">
                  <Button variant="outline" onClick={() => alert("Upload New Picture clicked")}>Upload New Picture</Button>
                  <Button variant="link" className="text-destructive" onClick={() => alert("Remove Picture clicked")}>Remove</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Language & Region</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
                    <SelectContent><SelectItem value="en">English (US)</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="timezone">Timezone</Label>
                   <Select defaultValue="asia-kolkata">
                    <SelectTrigger id="timezone"><SelectValue placeholder="Select timezone" /></SelectTrigger>
                    <SelectContent><SelectItem value="asia-kolkata">IST (Indian Standard Time)</SelectItem></SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
             <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Appearance</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="font-medium flex items-center"><Palette className="mr-2 h-4 w-4 text-primary"/>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                  </div>
                  <Switch 
                    id="darkMode" 
                    checked={theme === 'dark'} 
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "team":
        return (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-xl">Manage Team Members</CardTitle>
              <Button onClick={() => alert("Invite New Member clicked")} className="bg-primary hover:bg-primary/90">
                <User className="mr-2 h-4 w-4" /> Invite New Member
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person avatar"/>
                            <AvatarFallback>{member.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <span className={cn("px-2 py-1 text-xs rounded-full", member.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                          {member.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => alert(`Edit Role for ${member.name}`)}>Edit Role</DropdownMenuItem>
                            {member.status === "Pending Invitation" && <DropdownMenuItem onClick={() => alert(`Resend Invite to ${member.name}`)}>Resend Invitation</DropdownMenuItem>}
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => alert(`Remove ${member.name}`)}>Remove from Team</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      case "billing":
        return (
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Current Plan</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary mb-2">Team Growth Plan</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Users: 3 of 5 used</p>
                  <p>Verified Documents: 87 of 1000 used this month</p>
                  <p>AI Credits: 4500 of 10000 remaining</p>
                </div>
                <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => alert("Upgrade Plan clicked")}>Upgrade Plan</Button>
              </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader><CardTitle className="font-headline text-xl">Payment Method</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Visa ending in **** 4242</p>
                    <div className="mt-3 flex gap-2">
                        <Button variant="outline" onClick={() => alert("Update Payment Method clicked")}>Update Payment Method</Button>
                        <Button variant="link" onClick={() => alert("View Billing History clicked")}>View Billing History</Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Invoice History</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell className="text-right"><Button variant="link" asChild><a href={invoice.link}>Download PDF</a></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
           <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Email Notifications</CardTitle><CardDescription>Email Me When...</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label htmlFor="notif-lead-assigned">A new lead is assigned to me.</Label><Switch id="notif-lead-assigned" defaultChecked /></div>
                <div className="flex items-center justify-between"><Label htmlFor="notif-hot-lead">A 'Hot Lead' is identified by AI.</Label><Switch id="notif-hot-lead" defaultChecked /></div>
                <div className="flex items-center justify-between"><Label htmlFor="notif-contract-viewed">A contract is viewed by a client.</Label><Switch id="notif-contract-viewed" /></div>
                <div className="flex items-center justify-between"><Label htmlFor="notif-weekly-summary">I receive a weekly performance summary.</Label><Switch id="notif-weekly-summary" defaultChecked /></div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
               <CardHeader><CardTitle className="font-headline text-xl">In-App Notifications</CardTitle><CardDescription>Show In-App Alerts For...</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label htmlFor="inapp-task-due">A task is due soon.</Label><Switch id="inapp-task-due" defaultChecked /></div>
                <div className="flex items-center justify-between"><Label htmlFor="inapp-mention">I'm @mentioned in a comment.</Label><Switch id="inapp-mention" defaultChecked /></div>
              </CardContent>
            </Card>
           </div>
        );
      case "integrations":
        return (
          <Card className="shadow-lg">
            <CardHeader><CardTitle className="font-headline text-xl">Manage Integrations</CardTitle><CardDescription>Connect TerraFlowAI with your favorite tools.</CardDescription></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {integrations.map(int => {
                const Icon = int.logo;
                return (
                  <Card key={int.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="font-semibold">{int.name}</span>
                      </div>
                      <Button variant={int.connected ? "outline" : "default"} size="sm" className={int.connected ? "" : "bg-primary hover:bg-primary/90"}>
                        {int.connected ? "Manage" : "Connect"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
               <p className="md:col-span-2 text-sm text-muted-foreground mt-4">More integrations coming soon!</p>
            </CardContent>
          </Card>
        );
       case "security":
        return (
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" /></div>
                <div className="space-y-1"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" /></div>
                <div className="space-y-1"><Label htmlFor="confirmPassword">Confirm New Password</Label><Input id="confirmPassword" type="password" /></div>
                <Button onClick={handlePasswordChange} variant="outline">Change Password</Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Two-Factor Authentication (2FA)</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Enhance your account security by requiring a second factor of authentication.</p>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <span>Current Status: <span className="font-semibold text-green-600">Enabled</span></span> {/* Placeholder status */}
                    <Button variant="outline" size="sm" onClick={() => alert("Manage 2FA clicked")}>Manage 2FA</Button>
                </div>
              </CardContent>
            </Card>
             <Card className="shadow-lg">
              <CardHeader><CardTitle className="font-headline text-xl">Login Activity</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center p-2 border-b"><span>Chrome on macOS - Bangalore, IN <span className="text-green-600">(Current session)</span></span> <span className="text-xs text-muted-foreground">Now</span></li>
                    <li className="flex justify-between items-center p-2 border-b"><span>Safari on iPhone - Mumbai, IN</span> <span className="text-xs text-muted-foreground">2 hours ago</span></li>
                </ul>
                <Button variant="link" className="text-destructive p-0 h-auto mt-3" onClick={() => alert("Log out all other sessions clicked")}>
                    Log out all other sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <p>Select a category</p>;
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader title="Settings" />
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-1/4">
          <ul className="space-y-1">
            {settingsNavItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left h-11 px-4",
                     activeSection === item.id 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setActiveSection(item.id as SettingsSection)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
