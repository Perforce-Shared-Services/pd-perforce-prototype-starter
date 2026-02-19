import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressIndicator } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageBar } from "@/components/ui/message-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Search,
  Plus,
  Info,
  Settings,
  MoreHorizontal,
  Trash2,
  Copy,
  Pencil,
} from "lucide-react";

export default function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
          Component Showcase
        </h1>
        <p className="text-300 text-neutral-foreground-2-rest">
          A quick reference for all Force UI components installed in this
          project. Each section demonstrates key variants and usage patterns.
        </p>
      </div>

      <Separator className="mb-6" />

      {/* Buttons */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Buttons
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" color="confirm">
              Confirm Primary
            </Button>
            <Button variant="secondary" color="confirm">
              Confirm Secondary
            </Button>
            <Button variant="primary" color="default">
              Default Primary
            </Button>
            <Button variant="secondary" color="default">
              Default Secondary
            </Button>
            <Button variant="tertiary" color="default">
              Tertiary
            </Button>
            <Button variant="primary" color="danger">
              Danger
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" color="confirm" size="sm">
              Small
            </Button>
            <Button variant="primary" color="confirm" size="md">
              Medium
            </Button>
            <Button variant="primary" color="confirm" size="lg">
              Large
            </Button>
            <Button variant="primary" color="confirm" disabled>
              Disabled
            </Button>
            <Button variant="primary" color="confirm">
              <Plus /> With Icon
            </Button>
            <Button
              variant="primary"
              color="confirm"
              iconOnly
              aria-label="Add"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Inputs
        </h2>
        <div className="grid max-w-2xl gap-4">
          <Input placeholder="Outline (default)" variant="outline" />
          <Input placeholder="Filled darker" variant="filledDarker" />
          <Input
            placeholder="Search..."
            variant="outline"
            iconStart={<Search className="size-4" />}
          />
          <div className="flex gap-3">
            <Input placeholder="Small" size="small" />
            <Input placeholder="Medium" size="medium" />
            <Input placeholder="Large" size="large" />
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Badges
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-300 mb-2 text-neutral-foreground-2-rest">
              Filled
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="filled" color="brand">Brand</Badge>
              <Badge variant="filled" color="success">Success</Badge>
              <Badge variant="filled" color="warning">Warning</Badge>
              <Badge variant="filled" color="danger">Danger</Badge>
              <Badge variant="filled" color="blue">Blue</Badge>
              <Badge variant="filled" color="dark">Dark</Badge>
              <Badge variant="filled" color="gray">Gray</Badge>
            </div>
          </div>
          <div>
            <p className="text-300 mb-2 text-neutral-foreground-2-rest">
              Tint
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="tint" color="brand">Brand</Badge>
              <Badge variant="tint" color="success">Success</Badge>
              <Badge variant="tint" color="warning">Warning</Badge>
              <Badge variant="tint" color="danger">Danger</Badge>
              <Badge variant="tint" color="blue">Blue</Badge>
              <Badge variant="tint" color="dark">Dark</Badge>
              <Badge variant="tint" color="gray">Gray</Badge>
            </div>
          </div>
          <div>
            <p className="text-300 mb-2 text-neutral-foreground-2-rest">
              Outline
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" color="brand">Brand</Badge>
              <Badge variant="outline" color="success">Success</Badge>
              <Badge variant="outline" color="warning">Warning</Badge>
              <Badge variant="outline" color="danger">Danger</Badge>
              <Badge variant="outline" color="blue">Blue</Badge>
              <Badge variant="outline" color="dark">Dark</Badge>
              <Badge variant="outline" color="gray">Gray</Badge>
            </div>
          </div>
          <div>
            <p className="text-300 mb-2 text-neutral-foreground-2-rest">
              Sizes &amp; Shapes
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="tint" color="success" size="sm">Small</Badge>
              <Badge variant="tint" color="success" size="md">Medium</Badge>
              <Badge variant="tint" color="success" size="lg">Large</Badge>
              <Badge variant="tint" color="success" size="xl">XL</Badge>
              <Badge variant="filled" color="brand" shape="circular">Circular</Badge>
              <Badge variant="filled" color="brand" shape="rounded">Rounded</Badge>
              <Badge variant="filled" color="brand" shape="square">Square</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Cards
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="py-4">
            <CardHeader>
              <CardTitle>Force UI Design System</CardTitle>
              <CardDescription>
                Tailwind CSS v4 with 800+ design tokens. Add components via the
                shadcn registry.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="flex gap-2">
                <Badge variant="tint" color="blue" shape="circular" size="sm">
                  Tailwind v4
                </Badge>
                <Badge variant="tint" color="gray" shape="circular" size="sm">
                  shadcn
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="py-4">
            <CardHeader>
              <CardTitle>Dark Mode</CardTitle>
              <CardDescription>
                Toggle between light and dark themes using the header icon.
                Theme persists across sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <Badge variant="tint" color="success" shape="circular" size="sm">
                <span className="size-1.5 rounded-full bg-current" />
                Enabled
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-6" />

      {/* Tabs */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Tabs
        </h2>
        <div className="space-y-6">
          <div>
            <p className="text-300 mb-2 text-neutral-foreground-2-rest">
              Default variant
            </p>
            <Tabs defaultValue="tab1">
              <TabsList variant="default">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Settings</TabsTrigger>
                <TabsTrigger value="tab3">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="pt-3">
                <p className="text-300 text-neutral-foreground-2-rest">
                  Overview content goes here.
                </p>
              </TabsContent>
              <TabsContent value="tab2" className="pt-3">
                <p className="text-300 text-neutral-foreground-2-rest">
                  Settings content goes here.
                </p>
              </TabsContent>
              <TabsContent value="tab3" className="pt-3">
                <p className="text-300 text-neutral-foreground-2-rest">
                  Activity content goes here.
                </p>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-300 mb-2 text-neutral-foreground-2-rest">
                Brand
              </p>
              <Tabs defaultValue="a">
                <TabsList variant="brand">
                  <TabsTrigger value="a">Tab A</TabsTrigger>
                  <TabsTrigger value="b">Tab B</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-300 mb-2 text-neutral-foreground-2-rest">
                Border
              </p>
              <Tabs defaultValue="a">
                <TabsList variant="border">
                  <TabsTrigger value="a">Tab A</TabsTrigger>
                  <TabsTrigger value="b">Tab B</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-300 mb-2 text-neutral-foreground-2-rest">
                Underline
              </p>
              <Tabs defaultValue="a">
                <TabsList variant="underline">
                  <TabsTrigger value="a">Tab A</TabsTrigger>
                  <TabsTrigger value="b">Tab B</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Avatar */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Avatar
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage
              src="https://i.pravatar.cc/40?img=1"
              alt="User avatar"
            />
            <AvatarFallback variant="neutral">JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="neutral">AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="brand">CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="coloured">EF</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback variant="brand">LG</AvatarFallback>
          </Avatar>
          <Avatar className="size-8">
            <AvatarFallback variant="neutral">SM</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Progress */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Progress
        </h2>
        <div className="max-w-md space-y-4">
          <div>
            <p className="text-300 mb-1 text-neutral-foreground-2-rest">
              Default (60%)
            </p>
            <Progress size="lg">
              <ProgressIndicator value={60} status="default" />
            </Progress>
          </div>
          <div>
            <p className="text-300 mb-1 text-neutral-foreground-2-rest">
              Success (80%)
            </p>
            <Progress size="lg">
              <ProgressIndicator value={80} status="success" />
            </Progress>
          </div>
          <div>
            <p className="text-300 mb-1 text-neutral-foreground-2-rest">
              Warning (45%)
            </p>
            <Progress size="md">
              <ProgressIndicator value={45} status="warning" />
            </Progress>
          </div>
          <div>
            <p className="text-300 mb-1 text-neutral-foreground-2-rest">
              Danger (25%)
            </p>
            <Progress size="md">
              <ProgressIndicator value={25} status="danger" />
            </Progress>
          </div>
        </div>
      </section>

      {/* Skeleton */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Skeleton
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton animation="wave" className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton animation="wave" className="h-4 w-[200px]" />
              <Skeleton animation="wave" className="h-4 w-[140px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton animation="pulse" className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton animation="pulse" className="h-4 w-[200px]" />
              <Skeleton animation="pulse" className="h-4 w-[140px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Spinner */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Spinner
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <Spinner size="xs" label="Extra small" />
          <Spinner size="sm" label="Small" />
          <Spinner size="md" label="Medium" />
          <Spinner size="lg" label="Large" />
        </div>
      </section>

      <Separator className="mb-6" />

      {/* Label & Form Controls */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Label
        </h2>
        <div className="max-w-sm space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="label-demo">Email address</Label>
            <Input id="label-demo" placeholder="you@example.com" />
          </div>
        </div>
      </section>

      {/* Textarea */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Textarea
        </h2>
        <div className="max-w-md space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="textarea-demo">Description</Label>
            <Textarea
              id="textarea-demo"
              placeholder="Enter a description..."
            />
          </div>
        </div>
      </section>

      {/* Checkbox */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Checkbox
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="check1" defaultChecked />
            <Label htmlFor="check1">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="check2" />
            <Label htmlFor="check2">Send me marketing emails</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="check3" disabled />
            <Label htmlFor="check3">Disabled option</Label>
          </div>
        </div>
      </section>

      {/* Switch */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Switch
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Switch id="switch1" defaultChecked />
            <Label htmlFor="switch1">Notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="switch2" />
            <Label htmlFor="switch2">Dark mode</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="switch3" disabled />
            <Label htmlFor="switch3">Disabled</Label>
          </div>
        </div>
      </section>

      {/* Radio Group */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Radio Group
        </h2>
        <RadioGroup defaultValue="option1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option1" id="radio1" />
            <Label htmlFor="radio1">Option One</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option2" id="radio2" />
            <Label htmlFor="radio2">Option Two</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option3" id="radio3" />
            <Label htmlFor="radio3">Option Three</Label>
          </div>
        </RadioGroup>
      </section>

      {/* Select */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Select
        </h2>
        <div className="max-w-xs space-y-3">
          <div className="grid gap-1.5">
            <Label>Favorite fruit</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator className="mb-6" />

      {/* Tooltip */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Tooltip
        </h2>
        <div className="flex flex-wrap gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" color="default">
                  <Info className="size-4" /> Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a default tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="tertiary"
                  color="default"
                  iconOnly
                  aria-label="Settings"
                >
                  <Settings />
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="brand">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      {/* Dialog */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Dialog
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" color="default">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent size="md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-1.5">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="Jane Doe" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="dialog-email">Email</Label>
                <Input
                  id="dialog-email"
                  defaultValue="jane@example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                color="default"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                color="confirm"
                onClick={() => setDialogOpen(false)}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      {/* Alert Dialog */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Alert Dialog
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="primary" color="danger">
              <Trash2 className="size-4" /> Delete Item
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="primary" color="danger">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Dropdown Menu */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Dropdown Menu
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" color="default">
              <MoreHorizontal className="size-4" /> Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="size-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <Separator className="mb-6" />

      {/* Table */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Table
        </h2>
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Alice Johnson</TableCell>
                <TableCell>
                  <Badge variant="tint" color="success" shape="circular" size="sm">
                    <span className="size-1.5 rounded-full bg-current" />
                    Active
                  </Badge>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="tertiary"
                    color="default"
                    size="sm"
                    iconOnly
                    aria-label="More"
                  >
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bob Smith</TableCell>
                <TableCell>
                  <Badge variant="tint" color="warning" shape="circular" size="sm">
                    <span className="size-1.5 rounded-full bg-current" />
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>Editor</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="tertiary"
                    color="default"
                    size="sm"
                    iconOnly
                    aria-label="More"
                  >
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carol Davis</TableCell>
                <TableCell>
                  <Badge variant="tint" color="danger" shape="circular" size="sm">
                    <span className="size-1.5 rounded-full bg-current" />
                    Inactive
                  </Badge>
                </TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="tertiary"
                    color="default"
                    size="sm"
                    iconOnly
                    aria-label="More"
                  >
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Message Bar */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Message Bar
        </h2>
        <div className="max-w-xl space-y-3">
          <MessageBar variant="info">
            <MessageBar.Title>Heads up!</MessageBar.Title>
            <MessageBar.Description>
              You can add components to your app using the CLI.
            </MessageBar.Description>
          </MessageBar>
          <MessageBar variant="success">
            <MessageBar.Title>Success!</MessageBar.Title>
            <MessageBar.Description>
              Your changes have been saved.
            </MessageBar.Description>
          </MessageBar>
          <MessageBar variant="warning">
            <MessageBar.Title>Warning.</MessageBar.Title>
            <MessageBar.Description>
              Your trial expires in 3 days.
            </MessageBar.Description>
          </MessageBar>
          <MessageBar variant="danger">
            <MessageBar.Title>Error.</MessageBar.Title>
            <MessageBar.Description>
              Your session has expired. Please log in again.
            </MessageBar.Description>
            <MessageBar.Dismiss />
          </MessageBar>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Breadcrumb
        </h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Scroll Area */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Scroll Area
        </h2>
        <ScrollArea className="h-48 w-full max-w-sm rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback variant="neutral">
                    {String.fromCharCode(65 + (i % 26))}
                    {String.fromCharCode(65 + ((i + 1) % 26))}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-300 font-medium text-neutral-foreground-1-rest">
                    Item {i + 1}
                  </p>
                  <p className="text-200 text-neutral-foreground-2-rest">
                    Description for item {i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <Separator className="mb-6" />

      {/* Separator (already used throughout) */}
      <section className="mb-8">
        <h2 className="text-500 mb-4 font-semibold text-neutral-foreground-1-rest">
          Separator
        </h2>
        <div className="max-w-md space-y-2">
          <p className="text-300 text-neutral-foreground-2-rest">
            Separators are used throughout this page to divide sections. Here is
            an explicit example:
          </p>
          <div>
            <p className="text-300 text-neutral-foreground-1-rest">Above</p>
            <Separator className="my-2" />
            <p className="text-300 text-neutral-foreground-1-rest">Below</p>
          </div>
        </div>
      </section>
    </div>
  );
}
