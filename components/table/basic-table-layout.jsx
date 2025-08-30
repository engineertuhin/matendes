
import BasicDataTable from "@/components/table/basic-table";

export default function BasicTableLayout({
    columns,
    form,
    data,
    addButtonLabel,
    to,
}) {
    return (
        <BasicDataTable
            columns={columns}
            form={form}
            data={data}
            addButtonLabel={addButtonLabel}
            to={to}
        />
    );
}
