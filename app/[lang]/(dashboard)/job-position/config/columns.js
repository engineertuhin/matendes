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

let columns = (actions) => [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div className=" whitespace-nowrap">
                {console.log(row)}
                {row.original?.position_info?.category || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => row.original?.system_info?.status || "N/A",
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data = row.original;
            // console.log(payment);

            return (
                <div className=" text-end">
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
                                onClick={() => {
                                    actions.onEdit(data);
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    actions.onDelete(data.id);
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
