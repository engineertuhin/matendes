"use client";
import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "./config/columns";
import fields from "./config/fields";
import BasicModel from "@/components/model/basic-model";
import { useDepartment } from "@/domains/department/hook/useDepartment";

const departmentPage = () => {
    const { actions, departmentState } = useDepartment(); // Custom hook to manage user actions

    return (
        <>
            <PageLayout>
                <BasicTableLayout
                    addButtonLabel="Add Department"
                    columns={columns(actions)}
                    form={departmentState.form}
                    data={departmentState.data} // Pass data from operations
                />
                <BasicModel
                    title={
                        departmentState?.form?.watch("id")
                            ? "Department edit"
                            : "Department create"
                    }
                    submitLabel={
                        departmentState?.form?.watch("id") ? "Update" : "Create"
                    }
                    cancelLabel="Cancel"
                    size="2xl"
                    form={departmentState.form}
                    fields={fields}
                    actions={actions}
                />
            </PageLayout>
        </>
    );
};

export default departmentPage;
