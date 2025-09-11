import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const safe = (v, fallback = "—") => (v ?? v === 0 ? v : fallback);

let columns = (actions) => [
  // Core
  { accessorKey: "name", header: "Name" },
  { accessorKey: "code", header: "Code" },

  // Basic meta
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => safe(row.original?.type),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) =>
      safe(row.original?.status ?? row.original?.system_info?.status),
  },

  // Contact
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="lowercase">
        {safe(row.original?.email ?? row.original?.contact_info?.email)}
      </span>
    ),
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) =>
      safe(row.original?.phone ?? row.original?.contact_info?.phone),
  },

  // Address (compact)
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const d = row.original;
      const city = d?.city ?? d?.address?.city;
      const state = d?.state ?? d?.address?.state;
      const country = d?.country ?? d?.address?.country;
      const parts = [city, state, country].filter(Boolean);
      return parts.length ? parts.join(", ") : "—";
    },
  },

  // Hierarchy / flags
  {
    id: "level",
    header: "Level",
    cell: ({ row }) =>
      safe(
        row.original?.hierarchy_info?.hierarchy_level ?? row.original?.level
      ),
  },
  {
    id: "hq",
    header: "HQ",
    cell: ({ row }) => (row.original?.is_headquarters ? "Yes" : "No"),
  },

  // Timezone / dates
  {
    id: "timezone",
    header: "Timezone",
    cell: ({ row }) =>
      safe(row.original?.timezone ?? row.original?.business_info?.timezone),
  },
  {
    id: "established",
    header: "Established",
    cell: ({ row }) => safe(row.original?.established_date),
  },

  // Actions
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => actions?.onEdit?.(data)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions?.onDelete?.(data?.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default columns;
