import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import { Trash2, Save } from "lucide-react";

export default function FormPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
          Form Examples
        </h1>
        <p className="text-300 text-neutral-foreground-2-rest">
          Demonstrates form components, layout patterns, and user input
          handling.
        </p>
      </div>

      <Separator className="mb-6" />

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Section 1: Profile Information */}
        <Card className="py-4">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details and public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Notifications */}
        <Card className="py-4">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">
                  Email notifications
                </Label>
                <p className="text-200 text-neutral-foreground-3-rest">
                  Receive notifications via email.
                </p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">
                  Push notifications
                </Label>
                <p className="text-200 text-neutral-foreground-3-rest">
                  Receive push notifications in your browser.
                </p>
              </div>
              <Switch id="push-notifications" />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Notify me about:</Label>
              <div className="flex items-center gap-2">
                <Checkbox id="notify-comments" />
                <Label htmlFor="notify-comments">
                  New comments on my posts
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="notify-replies" />
                <Label htmlFor="notify-replies">
                  Replies to my comments
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="notify-mentions" />
                <Label htmlFor="notify-mentions">
                  Mentions in conversations
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Update Frequency */}
        <Card className="py-4">
          <CardHeader>
            <CardTitle>Update Frequency</CardTitle>
            <CardDescription>
              Choose how often you want to receive updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-3">
            <RadioGroup defaultValue="realtime">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="realtime" id="freq-realtime" />
                <div>
                  <Label htmlFor="freq-realtime">Real-time</Label>
                  <p className="text-200 text-neutral-foreground-3-rest">
                    Get notified immediately
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="daily" id="freq-daily" />
                <div>
                  <Label htmlFor="freq-daily">Daily digest</Label>
                  <p className="text-200 text-neutral-foreground-3-rest">
                    One summary per day
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="weekly" id="freq-weekly" />
                <div>
                  <Label htmlFor="freq-weekly">Weekly digest</Label>
                  <p className="text-200 text-neutral-foreground-3-rest">
                    One summary per week
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Section 4: Danger Zone */}
        <Card className="border-status-danger-stroke-1-rest py-4">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="primary" color="danger">
                  <Trash2 /> Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="primary" color="danger">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Form Footer */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" color="default">
            Cancel
          </Button>
          <Button
            variant="primary"
            color="confirm"
            onClick={() =>
              toast.success("Settings saved", {
                description: "Your changes have been saved successfully.",
              })
            }
          >
            <Save /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
