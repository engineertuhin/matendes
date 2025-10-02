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
  // Core fields
  { accessorKey: "name", header: "Project Name" },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => safe(row.original?.status),
  },
  {
    id: "start_date",
    header: "Start Date",
    cell: ({ row }) => safe(row.original?.start_date),
  },
  {
    id: "end_date",
    header: "End Date",
    cell: ({ row }) => safe(row.original?.end_date),
  },
  {
    id: "budget",
    header: "Budget",
    cell: ({ row }) => safe(row.original?.budget),
  },
  // {
  //   id: "client",
  //   header: "Client",
  //   cell: ({ row }) => safe(row.original?.client),
  // },
  // {
  //   id: "job_position",
  //   header: "Job Position",
  //   cell: ({ row }) => safe(row.original?.job_position?.title),
  // },
  // {
  //   id: "employees",
  //   header: "Employees",
  //   cell: ({ row }) =>
  //     row.original?.employees?.length
  //       ? row.original.employees.map((e) => e.name).join(", ")
  //       : "—",
  // },
  // {
  //   id: "expiry_warning_days",
  //   header: "Expiry Warning (days)",
  //   cell: ({ row }) => safe(row.original?.expiry_warning_days),
  // },

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
                      <DropdownMenuItem onClick={() => actions?.setAssignEmployModel?.(data)}>
                          Assign Employees
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => actions?.onEdit?.(data)}>
                          Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                          onClick={() => actions?.onDelete?.(data?.id)}
                      >
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
