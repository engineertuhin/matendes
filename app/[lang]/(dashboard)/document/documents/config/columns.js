import * as LucideIcons from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const columns = (actions) => [
    {
        id: "title",
        header: "Title",
        accessorKey: "title",
    },

    {
        id: "employee",
        header: "Employee",
        cell: ({ row }) => {
            const employee = row.original.employee;
            return employee
                ? `${employee.first_name} ${employee.last_name}`
                : "N/A";
        },
    },
    {
        id: "client",
        header: "Client",
        cell: ({ row }) => { 
            const client = row?.original?.client ? row?.original?.client?.name + " (" + row?.original?.client?.email + ")" : "N/A";
            return client || "N/A";
        },
    },
    {
        id: "project",
        header: "Project",
        cell: ({ row }) => { 
            const project = row?.original?.project?.name;
            return project || "N/A";
        },
    },

    {
        id: "created_at",
        header: "Created",
        cell: ({ row }) => {
            const date = row.original.system_info?.created_at;
            return date ? new Date(date).toLocaleDateString() : "N/A";
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const document = row.original;

            return (
                <div className="text-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <LucideIcons.MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log(
                                        "Edit clicked for document:",
                                        document
                                    );
                                    actions?.onEdit?.(document);
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log(
                                        "Delete clicked for document ID:",
                                        document?.id
                                    );
                                    actions?.onDelete?.(document?.id);
                                }}
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
