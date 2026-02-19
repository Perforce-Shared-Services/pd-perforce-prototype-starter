import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Search, MoreHorizontal, UserPlus, Pencil, Trash2, Mail } from "lucide-react";
import { SAMPLE_TEAM, type TeamMember } from "@/lib/mock-data";

const statusBadgeMap: Record<
  TeamMember["status"],
  {
    color: "success" | "warning" | "gray";
    dot?: boolean;
    label: string;
  }
> = {
  online: { color: "success", dot: true, label: "Online" },
  busy: { color: "warning", dot: true, label: "Busy" },
  offline: { color: "gray", label: "Offline" },
};

export default function DataTablePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return SAMPLE_TEAM;
    return SAMPLE_TEAM.filter(
      (member) =>
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.role.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
            Team Members
          </h1>
          <p className="text-300 text-neutral-foreground-2-rest">
            Manage your team and their roles
          </p>
        </div>
        <Button variant="primary" color="confirm">
          <UserPlus /> Add Member
        </Button>
      </div>

      <Separator className="mb-6" />

      {/* Search Bar */}
      <div className="mb-6 max-w-sm">
        <Input
          variant="outline"
          placeholder="Search by name, email, or role..."
          iconStart={<Search className="size-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      {filteredMembers.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => {
              const status = statusBadgeMap[member.status];
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback variant="coloured">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={status.color} variant="tint" shape="circular">
                      {status.dot && (
                        <span className="size-1.5 rounded-full bg-current" />
                      )}
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="text-neutral-foreground-2-rest">
                    {member.email}
                  </TableCell>
                  <TableCell>{member.projects}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="tertiary"
                          color="default"
                          size="sm"
                          iconOnly
                          aria-label="Row actions"
                        >
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="size-4" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-status-danger-foreground-1-rest">
                          <Trash2 className="size-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-300 font-medium text-neutral-foreground-2-rest">
            No members found
          </p>
          <p className="text-200 text-neutral-foreground-3-rest">
            Try adjusting your search terms
          </p>
        </div>
      )}
    </div>
  );
}
