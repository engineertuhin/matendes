import { handleServerValidationErrors } from "@/utility/helpers";
import {
    useCompanyCreateMutation,
    useCompanyUpdateMutation,
    useCompanyDeleteMutation,
    useCompanyFetchQuery,
    useCompanySearchQuery,
} from "../services/companyApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { formReset } from "@/utility/helpers";
import { debounce } from "@/utility/helpers";
import { companySearchTemplate } from "@/utility/templateHelper";

export const useCompany = () => {
    const [userCreate] = useCompanyCreateMutation();
    const [userUpdate] = useCompanyUpdateMutation();
    const [userDelete] = useCompanyDeleteMutation();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    // Only run query if searchValue is not empty
    const { data: companySearchResult, isLoading } = useCompanySearchQuery(
        { search: form.watch("search") },
        { skip: !form.watch("search") } // skip query if empty
    );

    const { data: company, refetch } = useCompanyFetchQuery();

    const companiesState = {
        data: company?.data?.companies || [],
        form,
    };

    const actions = {
        onCreate: async (data) => {
            try {
                let { openModel, ...other } = data;

                const response = await userCreate(other).unwrap();
                if (response) {
                    toast.success("Company Create Successfully");
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
                id: data.id || "",
                code: data.code || "",
                name: data.name || "",
                legal_name: data.legal_name || "",
                status: data.system_info.status || "",
                // contact_info
                email: data.contact_info?.email || "",
                phone: data.contact_info?.phone || "",

                website: data.contact_info?.website || "",
                address_line_1: data.address.line_1,
                address_line_2: data.address.line_2,
                locale: data.locale,

                is_active: data.is_active,
                is_main_company: data.is_main_company,
                subscription_status: data.subscription_status,
                subscription_plan: data.subscription_plan,
                suspended_reason: data.suspended_reason,
                trial_ends_at: data.trial_ends_at,
                suspended_at: data.suspended_at,
                slug: data.slug,
                subdomain: data.subdomain,

                // address
                line_1: data.address?.line_1 || "",
                line_2: data.address?.line_2 || "",
                city: data.address?.city || "",
                state: data.address?.state || "",
                postal_code: data.address?.postal_code || "",
                country: data.address?.country || "",

                // business_info
                currency: data.business_info?.currency || "",

                timezone: data.business_info?.timezone || "",

                // registration_info
                registration_number:
                    data.registration_info?.registration_number || "",
                tax_id: data.registration_info?.tax_id || "",

                // system_info
                logo_url: data.system_info?.logo_url || "",
            });

            form.setValue("openModel", true);
            // updateUser({ id, ...data });
            // form.reset();
        },

        onUpdate: async (data) => {
            let { openModel, id, ...other } = data;
            const response = await userUpdate({
                id,
                credentials: other,
            }).unwrap();
            if (response) {
                toast.success("Company Update Successfully");
                refetch();
                formReset(form);

                form.setValue("openModel", false);
            }
        },
        onDelete: (id) => {
            if (confirm("are you sure to delete it")) {
                toast.success("Company Delete Successfully");
                userDelete({ id });
            }
        },
        onSearch: debounce(async (inputValue, callback) => {
            form.setValue("search", inputValue);
            let res = companySearchResult?.data?.companies || [];

            callback(companySearchTemplate(res));
        }, 500),
    };

    return {
        actions,
        companiesState,
    };
};
