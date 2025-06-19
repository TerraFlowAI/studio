// src/app/(app)/settings/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Bell, Shield, Palette, KeyRound, Copy, RotateCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state from localStorage or system preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true' || 
      (localStorage.getItem('darkMode') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load API key from local storage if available
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleToggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
     toast({
        title: `Theme Changed`,
        description: `Switched to ${checked ? 'Dark' : 'Light'} Mode.`,
      });
  };

  const generateApiKey = () => {
    // Simulate API key generation
    const newKey = `tfai_live_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
    setApiKey(newKey);
    localStorage.setItem("apiKey", newKey);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated and saved.",
    });
  };

  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast({
        title: "API Key Copied",
        description: "The API key has been copied to your clipboard.",
      });
    }
  };
  
  const revokeApiKey = () => {
    setApiKey(null);
    localStorage.removeItem("apiKey");
    toast({
      variant: "destructive",
      title: "API Key Revoked",
      description: "Your API key has been revoked and removed.",
    });
  };


  return (
    <div className="container mx-auto">
      <PageHeader title="Settings" description="Manage your account and application preferences." />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center"><User className="mr-2 h-4 w-4 text-primary" />Full Name</Label>
                <Input id="fullName" defaultValue="Current User Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary" />Email Address</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Save Profile Changes</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Account Settings</CardTitle>
              <CardDescription>Manage your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline" className="w-full">Change Password</Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa" className="font-medium flex items-center"><Shield className="mr-2 h-4 w-4 text-primary"/>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enhance your account security.</p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">API Keys</CardTitle>
              <CardDescription>Manage API keys for integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKey ? (
                <>
                  <div>
                    <Label htmlFor="apiKey" className="font-medium flex items-center"><KeyRound className="mr-2 h-4 w-4 text-primary"/>Your API Key</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input id="apiKey" type="text" value={apiKey} readOnly className="bg-muted/50"/>
                      <Button variant="outline" size="icon" onClick={copyApiKey} aria-label="Copy API Key">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                     <p className="text-xs text-muted-foreground mt-1">Store this key securely. You will not be able to see it again.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={generateApiKey}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Regenerate Key
                    </Button>
                     <Button variant="destructive" onClick={revokeApiKey}>
                      <Trash2 className="mr-2 h-4 w-4" /> Revoke Key
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">You don&apos;t have any active API keys.</p>
                  <Button onClick={generateApiKey} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    <KeyRound className="mr-2 h-4 w-4" /> Generate API Key
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="font-medium flex items-center"><Bell className="mr-2 h-4 w-4 text-primary"/>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email.</p>
                </div>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get real-time alerts in the app.</p>
                </div>
                <Switch id="pushNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter" className="font-medium">Product Updates &amp; Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Stay informed about new features.</p>
                </div>
                <Switch id="newsletter" />
              </div>
            </CardContent>
          </Card>

           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="font-medium flex items-center"><Palette className="mr-2 h-4 w-4 text-primary"/>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch 
                  id="darkMode" 
                  checked={isDarkMode}
                  onCheckedChange={handleToggleDarkMode} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
