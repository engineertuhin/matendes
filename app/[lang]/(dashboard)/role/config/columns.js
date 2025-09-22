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

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");
const fmtAddr = (a) =>
  [a?.line_1, a?.city, a?.state, a?.country].filter(Boolean).join(", ") || "—";

let columns = (actions) => [
  // Name
  {
    id: "display_name",
    header: "Name",
    cell: ({ row }) => {
      const d = row.original;
      return (
        <div className="flex items-center gap-2 min-w-[180px]">  
            <span className="font-medium">{d?.display_name || "—"}</span>
        </div>
      );
    },
  }, 
  // level
  {
    id: "lavel",
    header: "Level",
    cell: ({ row }) => {
      
      const d = row.original; 
      return (
        <div className="flex items-center gap-2 min-w-[180px]">  
            <span className="font-medium">{d?.level ?? "—"}</span> 
        </div>
      );
    },
  }, 
  // Created at 
  {
    id: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      
      const d = row.original;
      return (
        <div className="flex items-center gap-2 min-w-[180px]">  
            <span className="font-medium">{d?.created_at || "—"}</span> 
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
              <DropdownMenuItem onClick={() => actions.onManagePermissions?.(data)}>
                Manage Permissions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onEdit?.(data)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onDelete?.(data.id)}>
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
