import {
    handleServerValidationErrors,
    handleServerValidationErrorsToast,
} from "@/utility/helpers";
import {
    useJobPositionCreateMutation,
    useJobPositionUpdateMutation,
    useJobPositionDeleteMutation,
    useJobPositionFetchQuery,
    useJobPositionSearchQuery,
} from "../services/jobPositionApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { formReset, normalizeSelectValues } from "@/utility/helpers";
import { debounce } from "@/utility/helpers";
import {
    branchSearchTemplate,
    companySearchTemplate,
    departmentSearchTemplate,
} from "@/utility/templateHelper";

export const useJobPosition = () => {
    const [JobPositionCreate] = useJobPositionCreateMutation();
    const [JobPositionUpdate] = useJobPositionUpdateMutation();
    const [JobPositionDelete] = useJobPositionDeleteMutation();
    const { data: JobPosition, refetch } = useJobPositionFetchQuery();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const { data: JobPositionSearchResult, isLoading } =
        useJobPositionSearchQuery(
            { search: form.watch("search") },
            { skip: !form.watch("search") } // skip query if empty
        );

    const jobPositionState = {
        data: JobPosition?.data?.job_positions || [],
        form,
    };

    const actions = {
        onCreate: async (data) => {
            try {
                let { openModel, ...other } = data;
                let preparedData = normalizeSelectValues(other, [
                    "company_id",
                    "department_id",
                ]);

                const response = await JobPositionCreate(preparedData).unwrap();
                if (response) {
                    toast.success("JobPosition Create Successfully");
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
                // =============== Relations ===============
                id: data.id || "",
                company_id:
                    companySearchTemplate([data.company])?.at(0) ?? null,
                department_id:
                    departmentSearchTemplate(
                        data?.department ? [data.department] : []
                    )?.at(0) ?? null,
                reports_to_position_id: null,
                direct_reports_count: data.direct_reports_count || "",

                // =============== Core Info ===============
                title: data.title || "",
                code: data.code || "",
                description: data.description || "",

                responsibilities: data?.requirements?.responsibilities || "",
                requirements: data?.requirements?.requirements || "",
                // =============== Classification ===============
                type: data.type || "",
                category: data?.position_info?.category || "",
                employment_type: data?.position_info?.employment_type || "",
                grade: data?.position_info?.grade || "",

                // =============== Level & Salary ===============
                level: data?.position_info?.level ?? "",
                min_salary: data?.salary_info?.salary_min ?? "",
                max_salary: data?.salary_info?.salary_max ?? "",
                salary_currency: data?.salary_info?.salary_currency || "",
                salary_period: data?.salary_info?.salary_period || "",
                benefits: data?.recruitment_info?.benefits_offered || "",

                // =============== Requirements & Skills ===============
                required_skills: data?.requirements?.required_skills || "",
                preferred_skills: data?.requirements?.preferred_skills || "",
                education_level: data?.requirements?.required_education || "",
                experience_years_min:
                    data?.requirements?.experience_years_min ?? "",
                experience_years_max:
                    data?.requirements?.experience_years_max ?? "",

                // =============== Recruitment & Vacancy ===============
                total_positions: data?.position_metrics?.total_positions ?? "",
                filled_positions:
                    data?.position_metrics?.filled_positions ?? "",
                vacant_positions:
                    data?.position_metrics?.vacant_positions ?? "",
                is_recruiting: Boolean(
                    data?.recruitment_info?.is_active_recruitment
                ),
                recruitment_start_date:
                    data?.recruitment_info?.recruitment_start_date || "", // not present; stays ""
                recruitment_end_date:
                    data?.recruitment_info?.recruitment_end_date || "", // not present; stays ""

                // =============== Status & Work Style ===============
                status: data?.system_info?.status || "inactive",
                is_enabled: Boolean(data?.system_info?.is_enabled),
                is_remote_eligible: data?.is_remote_eligible || false,
                is_travel_required: Boolean(data?.is_travel_required), // not in payload; defaults false
                travel_percentage: data?.travel_percentage ?? 0, // not in payload; keep 0

                is_management_position: data?.is_management_position || false,
                is_executive_position: data?.is_executive_position || false,
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
                    "department_id",
                ]);
                //set to api
                const response = await JobPositionUpdate({
                    id,
                    credentials: preparedData,
                }).unwrap();

                if (response) {
                    toast.success("JobPosition Update Successfully");
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
                if (
                    confirm("Are you sure you want to delete this JobPosition?")
                ) {
                    const response = await JobPositionDelete({ id });

                    if (response?.data) {
                        // check if response contains data
                        toast.success("JobPosition deleted successfully");
                        refetch();
                    } else {
                        toast.error("Failed to delete JobPosition");
                    }
                }
            } catch (error) {}
        },
        onSearch: debounce(async (inputValue, callback) => {
            form.setValue("search", inputValue);
            let res = JobPositionSearchResult?.data?.job_positions || [];
            callback(companySearchTemplate(res));
        }, 500),
    };

    return {
        actions,
        jobPositionState,
    };
};
