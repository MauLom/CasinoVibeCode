"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Moon, Sun, Palette, Languages } from "lucide-react";

export default function SettingsPage() {
  // Handlers for settings changes would go here
  const handleThemeChange = (theme: string) => console.log("Theme changed to:", theme);
  const handleLanguageChange = (lang: string) => console.log("Language changed to:", lang);

  return (
    <div className="space-y-8">
      <header className="flex items-center space-x-3">
        <SettingsIcon className="h-10 w-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-3xl font-bold text-primary text-glow-primary">Settings</h1>
          <p className="text-muted-foreground">Customize your casino experience.</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-accent"/> Appearance</CardTitle>
          <CardDescription>Adjust the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <Label htmlFor="theme-mode" className="flex flex-col space-y-1">
              <span>Theme Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Currently set to Dark Mode (default). Light mode coming soon!
              </span>
            </Label>
            {/* This is a placeholder; actual theme switching requires more setup */}
            <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-muted-foreground"/>
                <Switch id="theme-mode" checked={true} disabled /> 
                <Moon className="h-5 w-5 text-primary"/>
            </div>
          </div>
          {/* Additional appearance settings can go here, e.g., color accents */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Languages className="mr-2 h-5 w-5 text-accent"/> Language & Region</CardTitle>
          <CardDescription>Set your preferred language and regional settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language-select">Application Language</Label>
            <Select defaultValue="en" onValueChange={handleLanguageChange}>
              <SelectTrigger id="language-select" className="w-full md:w-[280px] mt-1">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (United States)</SelectItem>
                <SelectItem value="es">Español (España)</SelectItem>
                <SelectItem value="fr">Français (France)</SelectItem>
                <SelectItem value="de" disabled>Deutsch (Deutschland) - Coming Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Timezone or currency display preferences can go here */}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sound Preferences</CardTitle>
          <CardDescription>Manage game sounds and music.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <Label htmlFor="master-sound" className="flex flex-col space-y-1">
              <span>Master Sound</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Enable or disable all sounds.
              </span>
            </Label>
            <Switch id="master-sound" defaultChecked={true} />
          </div>
           <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <Label htmlFor="music-sound" className="flex flex-col space-y-1">
              <span>Background Music</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Toggle background music on or off.
              </span>
            </Label>
            <Switch id="music-sound" defaultChecked={false} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <SettingsIcon className="mr-2 h-4 w-4"/> Save All Settings
        </Button>
      </div>
    </div>
  );
}
