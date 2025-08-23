import { Card, CardContent } from "@/components/ui/card";
import BasicDataTable from "@/components/table/basic-table";
import BasicModel from "@/components/model/basic-model";
export default function BasicTableLayout({ columns, form, data, addButtonLabel }) {
    return (
        <Card>
            <CardContent className="p-0">
                <BasicDataTable columns={columns} form={form} data={data} addButtonLabel={addButtonLabel} />
            </CardContent>
        </Card>
    );
}
