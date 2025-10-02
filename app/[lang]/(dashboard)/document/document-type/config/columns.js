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
        id: "name",
        header: "Document Type",
        accessorKey: "name",
    },
    {
        id: "icon",
        header: "Icon",
        cell: ({ row }) => {
            const iconName = row.original.icon; // e.g. "FileText"
            const IconComponent = LucideIcons[iconName] || LucideIcons.FileText;

            return (
                <span className="flex items-center justify-center">
                    <IconComponent className="w-4 h-4" />
                </span>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => (row.original.status ? "Active" : "Inactive"),
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
                                onClick={() => actions?.onEdit?.(document)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    actions?.onDelete?.(document?.id)
                                }
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
