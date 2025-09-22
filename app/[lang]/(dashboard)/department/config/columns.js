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

  // Company
  {
    id: "company",
    header: "Company",
    cell: ({ row }) => {  
      return row.original?.company?.name ?? "-";
    },
  },
  // Branch
  {
    id: "branch",
    header: "Branch",
    cell: ({ row }) => {  
      return row.original?.branch?.name ?? "-";
    },
  },
  // Manager
  {
    id: "manager",
    header: "Manager",
    cell: ({ row }) => {  
      return row.original?.manager?.name ?? "-";
    },
  },
  // parent_department
  {
    id: "parent_department",
    header: "Parent department",
    cell: ({ row }) => {
      const parent = row.original?.parent_department;
      return parent ? `${parent.name} (${parent.code})` : "-";
    },
  },
  
  {
    id: "status",
    header: "Status",
    cell: ({ row }) =>
      safe(row.original?.status ?? row.original?.system_info?.status),
  },

  {
    id: "established",
    header: "Established",
    cell: ({ row }) => safe(row.original?.system_info?.established_date),
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
