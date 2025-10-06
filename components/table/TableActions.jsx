import React from "react";
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

/**
 * Reusable dropdown actions component for table rows.
 *
 * @param {Object} props
 * @param {Object} props.data - Row data for current row.
 * @param {Array}  props.items - Action list: [{ label, onClick, danger?, passId? }]
 * @param {string} [props.label="Actions"] - Dropdown label.
 * @param {string} [props.alignmentClass="flex justify-center"] - Tailwind alignment class.
 * @param {Function} [props.onLoginAsCompany] - Optional “Login as Company” callback.
 */
export const TableActions = ({
  data,
  items = [],
  label = "Actions",
  alignmentClass = "flex justify-center",
  onLoginAsCompany,
}) => {
  const showSrOnlySpan = alignmentClass !== "flex justify-center";

  return (
    <div className={alignmentClass}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            {showSrOnlySpan && <span className="sr-only">Open menu</span>}
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
          <DropdownMenuSeparator />

          {/* Optional fixed item */}
          {onLoginAsCompany && (
            <>
              <DropdownMenuItem onClick={() => onLoginAsCompany(data)}>
                Login as Company
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Dynamic action items */}
          {items.map((item, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() =>
                item.passId ? item.onClick?.(data.id) : item.onClick?.(data)
              }
              className={
                item.danger
                  ? "text-red-500 focus:text-red-500"
                  : ""
              }
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
