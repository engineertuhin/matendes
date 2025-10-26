import { TableActions } from "@/components/table/TableActions";

const columns = (actions) => [
  {
    accessorKey: "bank_name",
    header: "Bank Name",
    cell: ({ row }) => row.original.bank_name || "—",
  },
  {
    accessorKey: "branches",
    header: "No of Branches",
    cell: ({ row }) => (row.original.branches?.length ?? 0),
    thClass: "!text-center",
    tdClass: "!text-center",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    thClass: "!text-center w-[100px] whitespace-nowrap",
    tdClass: "!text-center w-[100px] whitespace-nowrap",
    cell: ({ row }) => (
      <TableActions
        data={row.original}
        label="Actions"
        items={[
          { label: "Edit", onClick: actions?.onEdit },
          { label: "Delete", onClick: actions?.onDelete, danger: true, passId: true },
        ]}
      />
    ),
  },
];

export default columns;
