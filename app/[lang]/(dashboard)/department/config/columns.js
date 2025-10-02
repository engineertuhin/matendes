// columns.js
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

const columns = (actions) => [
    // core identity
    { accessorKey: "name", header: "Name" },
    { accessorKey: "code", header: "Code" },

    // branch (covers all branch data at once)
    {
        id: "branch",
        header: "Branch",
        cell: ({ row }) => {
            const b = row.original?.branch;
            if (!b) return "—";
            return `${safe(b.name)} / ${safe(b.code)}`;
        },
    },

    // contact
    {
        id: "contact",
        header: "Contact",
        cell: ({ row }) => {
            const email = row.original?.email;
            const phone = row.original?.phone;
  
            return `${safe(email)} | ${safe(phone)}`;
        },
    },

    // department type & type
    {
        id: "dept_type",
        header: "Department Type",
        cell: ({ row }) => safe(row.original?.department_type),
    },
    {
        id: "type",
        header: "Type",
        cell: ({ row }) => safe(row.original?.type),
    },

    // status & established date
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



    // actions
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
                            <DropdownMenuItem
                                onClick={() => actions?.onEdit?.(data)}
                            >
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
