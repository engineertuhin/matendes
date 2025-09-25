import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { setEmployData } from "@/domains/employ/model/employSlice";
import { useAppDispatch } from "@/hooks/use-redux";

const columns = (actions) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return [
        // Employee Code & Badge
        {
            accessorKey: "employee_code",
            header: "Employee Code",
            cell: ({ row }) => row.original?.employee_code || "—",
        },
        {
            accessorKey: "badge_number",
            header: "Badge",
            cell: ({ row }) => row.original?.badge_number || "—",
        },

        // Name
        {
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                const p = row.original?.personal_info || {};
                return (
                    p.display_name ||
                    p.preferred_name ||
                    [p.first_name, p.last_name].filter(Boolean).join(" ") ||
                    "—"
                );
            },
        },

        // Gender & DOB
        {
            accessorKey: "personal_info.gender",
            header: "Gender",
            cell: ({ row }) => row.original?.personal_info?.gender || "—",
        },
        {
            accessorKey: "personal_info.date_of_birth",
            header: "DOB",
            cell: ({ row }) =>
                row.original?.personal_info?.date_of_birth || "—",
        },

        // Contact
        {
            accessorKey: "contact_info.work_email",
            header: "Work Email",
            cell: ({ row }) => row.original?.contact_info?.work_email || "—",
        },
        {
            accessorKey: "contact_info.primary_phone",
            header: "Phone",
            cell: ({ row }) => row.original?.contact_info?.primary_phone || "—",
        },

        // Employment
        {
            accessorKey: "employment_info.hire_date",
            header: "Hire Date",
            cell: ({ row }) => row.original?.employment_info?.hire_date || "—",
        },
        {
            accessorKey: "employment_info.employment_status",
            header: "Status",
            cell: ({ row }) =>
                row.original?.employment_info?.employment_status || "—",
        },
        {
            accessorKey: "employment_info.employment_type",
            header: "Type",
            cell: ({ row }) =>
                row.original?.employment_info?.employment_type || "—",
        },
        {
            accessorKey: "employment_info.work_mode",
            header: "Work Mode",
            cell: ({ row }) => row.original?.employment_info?.work_mode || "—",
        },

        // Department / Position (relationship)
        {
            id: "department",
            header: "Department",
            cell: ({ row }) => row.original?.department?.name || "—",
        },
        {
            id: "job_position_id",
            header: "Position",
            cell: ({ row }) => row.original?.job_position?.title || "—",
        },

        // Manager
        {
            id: "manager",
            header: "Manager",
            cell: ({ row }) => row.original?.manager?.name || "—",
        },

     


        // Actions
        {
            id: "actions",
            enableHiding: false,
            header: "",
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
                                    onClick={() => {
                                        router.push(`/employ/edit/${data?.id}`);
                                        dispatch(setEmployData(data));
                                    }}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        actions?.onDelete?.(data?.id)
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
};

export default columns;
