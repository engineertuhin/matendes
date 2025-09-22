"use client";
import React from "react";
import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import permissionColumns from "./config/permissionColumns";
import fields from "./config/fields";
import { useRole } from "@/domains/role-and-permission/role/hook/useRole";

const RolePage = () => {
    const {
        actions,
        rolesState, 
    } = useRole(); // Custom hook handles roles and permissions
    
    return (
        <PageLayout>
            {/* Role Table */}
            <BasicTableLayout
                addButtonLabel="Add Role"
                columns={columns(actions)}
                form={rolesState.form}
                data={rolesState.data}
            />

            {/* Role Create/Edit Modal */}
            <BasicModel
                title={
                    rolesState?.form?.watch("openPermissionMode") ? "Permission Update" : (rolesState?.form?.watch("id") ? "Role Edit" : "Role Create")
                }
                submitLabel={
                    rolesState?.form?.watch("id") || rolesState?.form?.watch("openPermissionMode") ? "Update" : "Create"
                }
                cancelLabel="Cancel"
                size="2xl"
                form={rolesState.form}
                fields={rolesState?.form?.watch("openPermissionMode") ? [] : fields}
                actions={actions}
            >
                <div>
                    <BasicTableLayout
                        addButtonLabel={false}
                        columns={permissionColumns(actions,rolesState.form)}
                        form={rolesState.form}
                        data={rolesState.permissions}
                        pagination={false}
                        filter={false}
                    />
                </div>
            </BasicModel>
        </PageLayout>
    );
};

export default RolePage;
