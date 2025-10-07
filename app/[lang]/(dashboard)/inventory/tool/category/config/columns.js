import { TableActions } from "@/components/table/TableActions";

export default (actions) => [
  { accessorKey: "name", header: "Name" },
  {
    id: "actions",
    header: "",
    thClass: "!text-center w-[70px]",
    tdClass: "!text-center w-[70px]",
    cell: ({ row }) => (
      <TableActions
        data={row.original}
        items={[
          { label: "Edit", onClick: actions.onEdit },
          { label: "Delete", onClick: actions.onDelete, danger: true, passId: true },
        ]}
      />
    ),
  },
];
