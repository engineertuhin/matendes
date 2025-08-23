import { handleServerValidationErrors } from "@/utility/helpers";
import {
    useDepartmentCreateMutation,
    useDepartmentUpdateMutation,
    useDepartmentDeleteMutation,
    useDepartmentFetchQuery,
    useDepartmentSearchQuery,
} from "../services/departmentApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { formReset, normalizeSelectValues } from "@/utility/helpers";
import { debounce } from "@/utility/helpers";
import {
    branchSearchTemplate,
    commonSearchTemplate,
    companySearchTemplate,
} from "@/utility/templateHelper";

export const useDepartment = () => {
    const [branchCreate] = useDepartmentCreateMutation();
    const [branchUpdate] = useDepartmentUpdateMutation();
    const [branchDelete] = useDepartmentDeleteMutation();
    const { data: branch, refetch } = useDepartmentFetchQuery();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const { data: departmentSearchResult, isLoading } =
        useDepartmentSearchQuery(
            { search: form.watch("search") },
            { skip: !form.watch("search") } // skip query if empty
        );

    const departmentState = {
        data: branch?.data?.branches || [],
        form,
    };

    const actions = {
        onCreate: async (data) => {
            try {
                let { openModel, ...other } = data;
                let preparedData = normalizeSelectValues(other, [
                    "company_id",
                    "parent_branch_id",
                ]);

                const response = await branchCreate(preparedData).unwrap();
                if (response) {
                    toast.success("Branch Create Successfully");
                    refetch();
                    formReset(form);

                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                // set server site single errors
                handleServerValidationErrors(apiErrors, form.setError);
            }
        },
        onEdit: (data) => {
            form.reset({
                // IDs
                id: data.id || "",
                company_id:
                    companySearchTemplate([data.company])?.at(0) ?? null,
                parent_branch_id:
                    branchSearchTemplate(
                        data?.parent_branch ? [data.parent_branch] : []
                    )?.at(0) ?? null,

                // Core
                name: data.name || "",
                code: data.code || "",
                description: data.description || "",
                type: data.type || "",

                // Manager
                manager_name: data.manager_name || "",
                manager_email: data.manager_email || "",
                manager_phone: data.manager_phone || "",

                // Hierarchy
                level: data?.hierarchy_info?.hierarchy_level ?? "",
                hierarchy_path: data.hierarchy_path || "",
                is_headquarters: Boolean(data.is_headquarters),
                sort_order: data.sort_order ?? 0,

                // Contact
                email: data.email || "",
                phone: data.phone || "",
                fax: data.fax || "",

                // Address
                address_line_1: data.address_line_1 || "",
                address_line_2: data.address_line_2 || "",
                city: data.city || "",
                state: data.state || "",
                postal_code: data.postal_code || "",
                country: data.country || "",

                // Location
                latitude: data.latitude ?? "",
                longitude: data.longitude ?? "",
                timezone: data.timezone || "",

                // Operational
                operating_hours_start: data.operating_hours_start || "", // e.g. "09:00"
                operating_hours_end: data.operating_hours_end || "", // e.g. "18:00"
                operating_days: data.operating_days || "",
                employee_capacity: data.employee_capacity ?? "", // keep as "" for number input

                // System
                status: data.status || "inactive",
                is_enabled: Boolean(data.is_enabled),
                established_date: data.established_date || "", // "YYYY-MM-DD"
            });

            form.setValue("openModel", true);
            // updateUser({ id, ...data });
            // form.reset();
        },

        onUpdate: async (data) => {
            try {
                let { openModel, id, ...other } = data;
                //prepare data
                let preparedData = normalizeSelectValues(other, [
                    "company_id",
                    "parent_branch_id",
                ]);
                //set to api
                const response = await branchUpdate({
                    id,
                    credentials: preparedData,
                }).unwrap();

                if (response) {
                    toast.success("Branch Update Successfully");
                    refetch();
                    formReset(form);

                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                // set server site single errors
                handleServerValidationErrors(apiErrors, form.setError);
            }
        },
        onDelete: async (id) => {
            try {
                if (confirm("Are you sure you want to delete this branch?")) {
                    const response = await branchDelete({ id });

                    if (response?.data) {
                        // check if response contains data
                        toast.success("Branch deleted successfully");
                        refetch();
                    } else {
                        toast.error("Failed to delete branch");
                    }
                }
            } catch (error) {}
        },

        onSearch: debounce(async (inputValue, callback) => {
            form.setValue("search", inputValue);
            let res = departmentSearchResult?.data?.department || [];
            callback(commonSearchTemplate(res));
        }, 500),
    };

    return {
        actions,
        departmentState,
    };
};
