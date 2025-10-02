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

const Pill = ({ children, className = "" }) => (
  <span
    className={[
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
      className,
    ].join(" ")}
  >
    {children}
  </span>
);

const fmtTimeRange = (s, e) => (s || e ? `${s || "—"} – ${e || "—"}` : "—");

let columns = (actions) => [
  // Basic
  { accessorKey: "name", header: "Name" },
  { accessorKey: "code", header: "Code" },

  // Type / Status / HQ
  {
    id: "type_status",
    header: "Type / Status",
    cell: ({ row }) => {
      const d = row.original;
      const type = d?.type || "—";
      const status = d?.status || "—";
      const isHQ = !!d?.is_headquarters;

      return (
        <div className="flex items-center gap-2 flex-wrap">
          <Pill className="bg-slate-100 text-slate-700">{type}</Pill>
          <Pill
            className={
              status === "active"
                ? "bg-green-100 text-green-700"
                : status === "inactive"
                ? "bg-gray-100 text-gray-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {status}
          </Pill>
          {isHQ ? <Pill className="bg-blue-100 text-blue-700">HQ</Pill> : null}
          
        </div>
      );
    },
  },



  // Contact
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap">
        {row.original?.email || "—"}
      </div>
    ),
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => row.original?.phone || "—",
  },

  // Hierarchy
  {
    id: "hierarchy",
    header: "Hierarchy",
    cell: ({ row }) => {
      const h = row.original?.hierarchy_info;
      const lvl = h?.hierarchy_level ?? row.original?.level ?? "—";
      const path = h?.hierarchy_path ?? row.original?.hierarchy_path ?? "";
      return (
        <div className="flex flex-col">
          <span>Level: {lvl}</span>
          <span className="text-xs text-muted-foreground">
            {path ? `Path: ${path}` : ""}
          </span>
        </div>
      );
    },
  },

  // Address (compact)
  {
    id: "opening_date",
    header: "Opening Day",
    cell: ({ row }) => {
      const d = row.original;

      return d.operating_days ?? "—";
    },
  },

  // Ops hours & days
  {
    id: "ops",
    header: "Operating",
    cell: ({ row }) => {
      const d = row.original;
      const hours = fmtTimeRange(
        d?.operating_hours_start,
        d?.operating_hours_end
      );
      const days = d?.operating_days || "—";
      return (
        <div className="flex flex-col">
          <span>{hours}</span>
          <span className="text-xs text-muted-foreground">{days}</span>
        </div>
      );
    },
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
