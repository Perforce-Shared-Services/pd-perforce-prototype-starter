import { useState, useMemo } from "react";
import { SAMPLE_PROJECTS, type Project } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressIndicator } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { Separator } from "@/components/ui/separator";
import {
  FolderOpen,
  Activity,
  CheckCircle,
  Plus,
  AlertTriangle,
} from "lucide-react";

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

const TAB_VALUES = ["all", "active", "paused", "completed", "error"] as const;
type TabValue = (typeof TAB_VALUES)[number];

const TAB_LABELS: Record<TabValue, string> = {
  all: "All",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  error: "Error",
};

function ProjectCard({ project }: { project: Project }) {
  const badgeProps = STATUS_BADGE_MAP[project.status];
  const progressStatus = STATUS_PROGRESS_MAP[project.status];

  return (
    <Card className="py-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle>{project.name}</CardTitle>
          </div>
          <Badge
            color={badgeProps.color}
            variant="tint"
            shape="circular"
            size="sm"
            className="ml-2 shrink-0 capitalize"
          >
            {badgeProps.dot && (
              <span className="size-1.5 rounded-full bg-current" />
            )}
            {project.status}
          </Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
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

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-200 text-neutral-foreground-2-rest">
              Progress
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

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} color="gray" variant="tint" shape="circular" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-200 text-neutral-foreground-3-rest">
          Last updated: {project.lastUpdated}
        </p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertTriangle className="mb-3 size-10 text-neutral-foreground-3-rest" />
      <p className="text-300 font-medium text-neutral-foreground-1-rest">
        No projects found
      </p>
      <p className="text-200 text-neutral-foreground-3-rest">
        There are no projects matching this filter.
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const totalProjects = SAMPLE_PROJECTS.length;
  const activeCount = SAMPLE_PROJECTS.filter(
    (p) => p.status === "active"
  ).length;
  const completedCount = SAMPLE_PROJECTS.filter(
    (p) => p.status === "completed"
  ).length;

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return SAMPLE_PROJECTS;
    return SAMPLE_PROJECTS.filter((p) => p.status === activeTab);
  }, [activeTab]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
            Dashboard
          </h1>
          <p className="text-300 text-neutral-foreground-2-rest">
            Overview of all projects and their current status.
          </p>
        </div>
        <Button variant="primary" color="confirm">
          <Plus /> New Project
        </Button>
      </div>

      <Separator className="mb-6" />

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={<FolderOpen className="size-5" />}
          label="Total Projects"
          value={totalProjects}
          trend="up"
          subtitle="+2 this month"
        />
        <StatCard
          icon={<Activity className="size-5" />}
          label="Active"
          value={activeCount}
          trend="up"
        />
        <StatCard
          icon={<CheckCircle className="size-5" />}
          label="Completed"
          value={completedCount}
          trend="flat"
        />
      </div>

      {/* Tabs + Project Grid */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
      >
        <TabsList variant="underline" className="mb-4">
          {TAB_VALUES.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {TAB_LABELS[tab]}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_VALUES.map((tab) => (
          <TabsContent key={tab} value={tab}>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
