"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Mail, KeyRound, Bell, Shield, Edit3 } from "lucide-react";

// Mock user data - replace with actual auth state and user data
const userProfile = {
  name: "Satoshi Player",
  email: "satoshi.player@cryptocasino.com",
  avatarUrl: "https://placehold.co/150x150.png",
  initials: "SP",
  joinDate: "2023-01-01",
  is2FAEnabled: true,
  emailNotifications: true,
  gameNotifications: false,
};

export default function ProfilePage() {
  // Handlers for form submissions would go here
  const handleProfileUpdate = () => console.log("Profile update submitted");
  const handleChangePassword = () => console.log("Change password submitted");
  const handleNotificationUpdate = () => console.log("Notifications updated");
  const handleSecurityUpdate = () => console.log("Security settings updated");

  return (
    <div className="space-y-8">
      <header className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 border-4 border-primary">
          <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person avatar"/>
          <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{userProfile.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-primary text-glow-primary">{userProfile.name}</h1>
          <p className="text-muted-foreground">Joined: {userProfile.joinDate}</p>
        </div>
      </header>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="account"><UserCircle className="mr-2 h-4 w-4 inline-block"/>Account</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4 inline-block"/>Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block"/>Notifications</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger> {/* Icon can be History */}
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userProfile.name} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userProfile.email} disabled />
              </div>
              <div>
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" defaultValue={userProfile.avatarUrl} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Edit3 className="mr-2 h-4 w-4"/> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Enhance your account's security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Change Password</h3>
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" type="password" />
                </div>
                <Button onClick={handleChangePassword} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <KeyRound className="mr-2 h-4 w-4"/> Update Password
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <Label htmlFor="2fa-switch" className="flex flex-col space-y-1">
                    <span>Enable 2FA</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Protect your account with an extra layer of security.
                    </span>
                  </Label>
                  <Switch id="2fa-switch" defaultChecked={userProfile.is2FAEnabled} />
                </div>
                 {/* Placeholder for 2FA setup steps if not enabled */}
              </div>
            </CardContent>
             <CardFooter>
              <Button onClick={handleSecurityUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Shield className="mr-2 h-4 w-4"/> Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive important updates and promotions via email.
                  </span>
                </Label>
                <Switch id="email-notifications" defaultChecked={userProfile.emailNotifications} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <Label htmlFor="game-notifications" className="flex flex-col space-y-1">
                  <span>In-Game Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get alerts for game events and bonuses.
                  </span>
                </Label>
                <Switch id="game-notifications" defaultChecked={userProfile.gameNotifications} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Bell className="mr-2 h-4 w-4"/> Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
           <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activity on your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-8">Your account activity log will appear here.</p>
                {/* Placeholder for activity list */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
