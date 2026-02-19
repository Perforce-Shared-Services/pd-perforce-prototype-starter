import { useState } from "react";
import { SAMPLE_PROJECTS, type Project } from "@/lib/mock-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressIndicator } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pencil,
  Share2,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Clock,
} from "lucide-react";

const project = SAMPLE_PROJECTS[0];

const STATUS_BADGE_MAP: Record<
  Project["status"],
  {
    color: "success" | "warning" | "blue" | "danger";
    dot?: boolean;
  }
> = {
  active: { color: "success", dot: true },
  paused: { color: "warning", dot: true },
  completed: { color: "blue" },
  error: { color: "danger", dot: true },
};

const STATUS_PROGRESS_MAP: Record<
  Project["status"],
  "default" | "success" | "danger"
> = {
  active: "default",
  paused: "default",
  completed: "success",
  error: "danger",
};

const ACTIVITY_ITEMS = [
  {
    initials: "AC",
    text: "Alice Chen updated the progress to 72%",
    time: "2 hours ago",
  },
  {
    initials: "BM",
    text: "Bob Martinez added the infrastructure tag",
    time: "5 hours ago",
  },
  {
    initials: "CP",
    text: "Carol Park commented on the migration plan",
    time: "1 day ago",
  },
  {
    initials: "DK",
    text: "David Kim created this project",
    time: "3 days ago",
  },
];

const SETTINGS_ITEMS = [
  { label: "Visibility", value: "Team only" },
  { label: "Notifications", value: "Enabled" },
  { label: "Auto-archive", value: "After 30 days" },
];

function OverviewTab() {
  const badgeProps = STATUS_BADGE_MAP[project.status];
  const progressStatus = STATUS_PROGRESS_MAP[project.status];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left column */}
      <div className="lg:col-span-2">
        <Card className="py-4">
          <CardHeader>
            <CardTitle className="text-500 font-semibold text-neutral-foreground-1-rest">
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            <p className="text-300 text-neutral-foreground-2-rest">
              {project.description} This project aims to consolidate all legacy
              version control systems into a unified Helix Core environment,
              improving collaboration and reducing maintenance overhead across
              the engineering organization.
            </p>

            {/* Progress section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-200 text-neutral-foreground-2-rest">
                  Completion
                </span>
                <span className="text-200 font-medium text-neutral-foreground-1-rest">
                  {project.progress}%
                </span>
              </div>
              <Progress size="lg">
                <ProgressIndicator
                  value={project.progress}
                  status={progressStatus}
                />
              </Progress>
            </div>

            {/* Tags section */}
            <div className="space-y-2">
              <span className="text-200 text-neutral-foreground-2-rest">
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} color="gray" variant="tint" shape="circular" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right column - metadata sidebar */}
      <div className="lg:col-span-1">
        <Card className="py-4">
          <CardHeader>
            <CardTitle className="text-500 font-semibold text-neutral-foreground-1-rest">
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {/* Owner */}
            <div className="flex items-center justify-between">
              <span className="text-200 text-neutral-foreground-2-rest flex items-center gap-1.5">
                <User className="size-4" />
                Owner
              </span>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback variant="coloured" className="text-100">
                    {project.ownerInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-200 text-neutral-foreground-1-rest">
                  {project.owner}
                </span>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-200 text-neutral-foreground-2-rest flex items-center gap-1.5">
                <Tag className="size-4" />
                Status
              </span>
              <Badge
                color={badgeProps.color}
                variant="tint"
                shape="circular"
                size="sm"
                className="capitalize"
              >
                {badgeProps.dot && (
                  <span className="size-1.5 rounded-full bg-current" />
                )}
                {project.status}
              </Badge>
            </div>

            <Separator />

            {/* Last Updated */}
            <div className="flex items-center justify-between">
              <span className="text-200 text-neutral-foreground-2-rest flex items-center gap-1.5">
                <Clock className="size-4" />
                Last Updated
              </span>
              <span className="text-200 text-neutral-foreground-1-rest">
                {project.lastUpdated}
              </span>
            </div>

            <Separator />

            {/* Created */}
            <div className="flex items-center justify-between">
              <span className="text-200 text-neutral-foreground-2-rest flex items-center gap-1.5">
                <Calendar className="size-4" />
                Created
              </span>
              <span className="text-200 text-neutral-foreground-1-rest">
                Jan 15, 2026
              </span>
            </div>

            <Separator />

            {/* Tags */}
            <div className="flex items-center justify-between">
              <span className="text-200 text-neutral-foreground-2-rest flex items-center gap-1.5">
                <Tag className="size-4" />
                Tags
              </span>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} color="gray" variant="tint" shape="circular" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActivityTab() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="text-500 font-semibold text-neutral-foreground-1-rest">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {ACTIVITY_ITEMS.map((item, index) => (
          <div key={index}>
            <div className="flex gap-3 py-3">
              <Avatar className="size-8">
                <AvatarFallback variant="coloured" className="text-100">
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-200 text-neutral-foreground-1-rest">
                  {item.text}
                </p>
                <p className="text-200 text-neutral-foreground-3-rest">
                  {item.time}
                </p>
              </div>
            </div>
            {index < ACTIVITY_ITEMS.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SettingsTab() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="text-500 font-semibold text-neutral-foreground-1-rest">
          Project Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {SETTINGS_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-1"
          >
            <span className="text-200 text-neutral-foreground-2-rest">
              {item.label}
            </span>
            <span className="text-200 text-neutral-foreground-1-rest">
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function LoadingStatePreview() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Skeleton animation="wave" className="h-6 w-48" />
        <Skeleton animation="wave" className="h-4 w-full" />
        <Skeleton animation="wave" className="h-4 w-3/4" />
        <Skeleton animation="wave" className="h-2 w-full" />
        <div className="flex gap-2">
          <Skeleton animation="wave" className="h-5 w-16" />
          <Skeleton animation="wave" className="h-5 w-16" />
          <Skeleton animation="wave" className="h-5 w-16" />
        </div>
      </div>
      <div className="space-y-4 lg:col-span-1">
        <Skeleton animation="wave" className="h-6 w-32" />
        <Skeleton animation="wave" className="h-4 w-full" />
        <Skeleton animation="wave" className="h-4 w-full" />
        <Skeleton animation="wave" className="h-4 w-full" />
        <Skeleton animation="wave" className="h-4 w-full" />
      </div>
    </div>
  );
}

export default function DetailPage() {
  const [showLoading, setShowLoading] = useState(false);
  const badgeProps = STATUS_BADGE_MAP[project.status];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4">
        {/* Detail Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
                {project.name}
              </h1>
              <Badge
                color={badgeProps.color}
                variant="tint"
                shape="circular"
                size="sm"
                className="capitalize"
              >
                {badgeProps.dot && (
                  <span className="size-1.5 rounded-full bg-current" />
                )}
                {project.status}
              </Badge>
            </div>
            <p className="text-300 text-neutral-foreground-2-rest mt-1">
              {project.description}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" color="default" size="md">
              <Pencil />
              Edit
            </Button>
            <Button variant="secondary" color="default" size="md">
              <Share2 />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  color="default"
                  size="md"
                  iconOnly
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList variant="underline" className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>

        {/* Loading State Demo */}
        <div className="mt-8">
          <Card className="py-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-500 font-semibold text-neutral-foreground-1-rest">
                  Loading State Preview
                </CardTitle>
                <Button
                  variant={showLoading ? "primary" : "secondary"}
                  color="default"
                  size="sm"
                  onClick={() => setShowLoading(!showLoading)}
                >
                  {showLoading ? "Hide Loading State" : "Show Loading State"}
                </Button>
              </div>
            </CardHeader>
            {showLoading && (
              <CardContent className="pt-4">
                <LoadingStatePreview />
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
