"use client";
import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "./config/columns";

import { useEmploy } from "@/domains/employ/hook/useEmploy";

const employeePage = () => {
    const { actions, employState } = useEmploy(); // Custom hook to manage user actions

    return (
        <>
            <PageLayout>
                <BasicTableLayout
                    addButtonLabel="Add Employee"
                    columns={columns(actions)}
                    to="employees/create"
                    state={employState}
                />
            </PageLayout>
        </>
    );
};

export default employeePage;
