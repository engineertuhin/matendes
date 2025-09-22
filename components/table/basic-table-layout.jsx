
import BasicDataTable from "@/components/table/basic-table";

export default function BasicTableLayout({
    columns,
    form,
    data,
    addButtonLabel,
    to,
    filter,
    pagination,
}) {
    return (
        <BasicDataTable
            columns={columns}
            form={form}
            data={data}
            addButtonLabel={addButtonLabel}
            to={to}
            filter={filter}
            pagination={pagination}
        />
    );
}
