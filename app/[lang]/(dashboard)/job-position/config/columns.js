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

const val = (v, f = "—") => (v ?? v === 0 ? v : f);

// const fmtSalary = (row) => {
//   const s = row.original?.salary_and_benefits || {};
//   const min = s.min_salary;
//   const max = s.max_salary;
//   const cur = s.currency;
//   const per = s.salary_type;
//   if (min == null && max == null) return "—";
//   const range =
//     min != null && max != null
//       ? `${min}–${max}`
//       : min != null
//       ? `${min}+`
//       : `${max}`;
//   return [range, cur, per].filter(Boolean).join(" ");
// };

let columns = (actions) => [
  // Core
  { accessorKey: "title", header: "Title" },
  { accessorKey: "code", header: "Code" },

  // Classification
  // {
  //   id: "type",
  //   header: "Type",
  //   cell: ({ row }) => val(row.original?.type),
  // },
  {
    id: "job_category",
    header: "Category",
    cell: ({ row }) => val(row.original?.classification_info?.job_category),
  },
  {
    id: "employment_type",
    header: "Employment",
    cell: ({ row }) => val(row.original?.classification_info?.employment_type),
  },
  // {
  //   id: "level",
  //   header: "Level",
  //   cell: ({ row }) => val(row.original?.position_info?.level),
  // },
 

  // Salary
  // {
  //   id: "salary",
  //   header: "Salary",
  //   cell: ({ row }) => fmtSalary(row),
  // },

  // Vacancy metrics
  {
    id: "vacancies",
    header: "Vacancies",
    cell: ({ row }) => {
      const m = row.original?.position_info || {};
      const t = m.total_positions ?? "—";
      const f = m.filled_positions ?? "—";
      const v = m.vacant_positions ?? "—";
      return `${t}/${f}/${v}`;
    },
  },

  // Recruiting & status
  {
    id: "recruiting",
    header: "Recruiting",
    cell: ({ row }) =>
      row.original?.recruitment_info?.is_active_recruitment ? "Yes" : "No",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => val(row.original?.system_info?.status),
  },
  {
    id: "enabled",
    header: "Enabled",
    cell: ({ row }) => (row.original?.system_info?.is_enabled ? "Yes" : "No"),
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
