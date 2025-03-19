"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Hotel,
  MoreHorizontal,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  status: "active" | "inactive";
  avatar?: string;
  assignedHotels?: string[];
}

const initialUsers: UserType[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "sarah@example.com",
    role: "manager",
    status: "active",
    avatar: "/placeholder.svg",
    assignedHotels: ["Grand Hotel", "Luxury Suites"],
  },
  {
    id: "3",
    name: "Mike Manager",
    email: "mike@example.com",
    role: "manager",
    status: "active",
    avatar: "/placeholder.svg",
    assignedHotels: ["Seaside Resort"],
  },
  {
    id: "4",
    name: "Emily User",
    email: "emily@example.com",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "David User",
    email: "david@example.com",
    role: "user",
    status: "inactive",
    avatar: "/placeholder.svg",
  },
];

export function UsersTable() {
  const [users, setUsers] = useState<UserType[]>(initialUsers);

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const getRoleBadgeVariant = (role: UserType["role"]) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "manager":
        return "default";
      default:
        return "secondary";
    }
  };

  const getRoleIcon = (role: UserType["role"]) => {
    switch (role) {
      case "admin":
        return <Shield className="mr-1 h-3 w-3" />;
      case "manager":
        return <Hotel className="mr-1 h-3 w-3" />;
      default:
        return <User className="mr-1 h-3 w-3" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Hotels</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  variant={getRoleBadgeVariant(user.role) as any}
                  className="flex w-fit items-center"
                >
                  {getRoleIcon(user.role)}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "outline" : "secondary"}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {user.role === "manager" && user.assignedHotels ? (
                  <div className="flex flex-wrap gap-1">
                    {user.assignedHotels.map((hotel) => (
                      <Badge key={hotel} variant="outline" className="mr-1">
                        {hotel}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/users/${user.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "manager" && (
                      <DropdownMenuItem asChild>
                        <Link href={`/users/${user.id}/hotels`}>
                          <Hotel className="mr-2 h-4 w-4" />
                          Assign Hotels
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
