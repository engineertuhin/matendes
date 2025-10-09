import {
    handleServerValidationErrors,
    formReset,
    normalizeSelectValues,
} from "@/utility/helpers";
import {
    useCreateToolDistributionMutation,
    useUpdateToolDistributionMutation,
    useDeleteToolDistributionMutation,
    useFetchToolDistributionsQuery,
    useReturnToolMutation,
} from "../services/toolDistributionApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { projectTemplate, employTemplate } from "@/utility/templateHelper";

export const useToolDistribution = () => {
    const [createToolDistribution] = useCreateToolDistributionMutation();
    const [updateToolDistribution] = useUpdateToolDistributionMutation();
    const [deleteToolDistribution] = useDeleteToolDistributionMutation();
    const [returnTool] = useReturnToolMutation();
    const {
        data: toolDistributionsData,
        refetch,
        isFetching,
    } = useFetchToolDistributionsQuery();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
        defaultValues: {
            id: "",
            project_id: "",
            employee_id: "",
            distribution_date: "",
            expected_return_date: "",
            return_date: "",
            status: "distributed",
            notes: "",
            assignTools: [],
            openModel: false,
        },
    });

    const fieldArray = useFieldArray({
        control: form.control,
        name: "assignTools", // This matches the field name in form
    });

    const toolDistributionState = {
        data: toolDistributionsData?.data?.toolDistributions || [],
        form: {
            ...form,
            fields: fieldArray, // Merge fieldArray into form
        },
        refetch,
        pagination: toolDistributionsData?.data?.pagination || {},
        isFetching,
    };

    const actions = {
        onCreate: async (data) => {
            try {
                const { openModel, assignTools, ...payload } = data;

                // Normalize each tool in the assignTools list
                const currentAssignTools = (assignTools || []).map((item) =>
                    normalizeSelectValues(item, ["tool_id"])
                );

                // Normalize the rest of the payload
                const currentPayload = normalizeSelectValues(payload, [
                    "project_id",
                    "employee_id",
                ]);

                // Combine payload with assignTools
                const finalPayload = {
                    ...currentPayload,
                    assignTools: currentAssignTools,
                };

                const response = await createToolDistribution(
                    finalPayload
                ).unwrap();
                if (response) {
                    toast.success("Tool distribution created successfully");
                    refetch();
                    formReset(form);
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
                toast.error("Failed to create tool distribution");
            }
        },

        onUpdate: async (data) => {
            try {
                const { openModel, type, assignTools, ...payload } = data;
                const { id } = payload;

                if (type == "return") {
                    const response = await returnTool({
                        id,
                        return_date: payload.return_date,
                        assignTools: assignTools,
                    }).unwrap();

                           if (response) {
                               toast.success(
                                   "Tool distribution updated successfully"
                               );
                               refetch();
                               formReset(form);
                               form.setValue("openModel", false);
                           }

                    return 0;
                }
                // Normalize each tool in the assignTools list
                const currentAssignTools = (assignTools || []).map((item) =>
                    normalizeSelectValues(item, ["tool_id"])
                );

                // Normalize dropdown values for API
                const currentPayload = normalizeSelectValues(payload, [
                    "project_id",
                    "employee_id",
                ]);

                // Combine payload with assignTools
                const finalPayload = {
                    ...currentPayload,
                    assignTools: currentAssignTools,
                };

                const response = await updateToolDistribution({
                    id,
                    ...finalPayload,
                }).unwrap();

                if (response) {
                    toast.success("Tool distribution updated successfully");
                    refetch();
                    formReset(form);
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
                toast.error("Failed to update tool distribution");
            }
        },

        onDelete: async (id) => {
            try {
                const response = await deleteToolDistribution(id).unwrap();
                if (response) {
                    toast.success("Tool distribution deleted successfully");
                    refetch();
                }
            } catch (error) {
                toast.error("Failed to delete tool distribution");
            }
        },

        onReturn: async (item) => {
    
            // Prepare assignTools for the form using assign_tools from API response
            const assignTools = (item.assign_tools || []).map((tool) => ({
                tool_id: tool.tool_id,
                tool_name: tool.tool_name,
                quantity: tool.quantity,
                prev_quantity: tool.quantity,
                return_quantity: tool.return_quantity || 0,
                available_stock: tool.available_stock,
                status: tool.status ?? 'returned',
                notes: tool.notes,
            }));


            form.reset({
                id: item.id,
                return_date: item.return_date ??  item.expected_return_date,
                assignTools: assignTools,
                openModel: true,
                type: "return",
            });

            // try {
            //     const response = await returnTool({
            //         id,
            //         return_date: new Date().toISOString(),
            //     }).unwrap();

            //     if (response) {
            //         toast.success("Tool returned successfully");
            //         refetch();
            //     }
            // } catch (error) {
            //     toast.error("Failed to return tool");
            // }
        },

        onEdit: (item) => {
            // Prepare assignTools for the form using assign_tools from API response
            const assignTools = (item.assign_tools || []).map((tool) => ({
                tool_id: tool.tool_id,
                tool_name: tool.tool_name,
                quantity: tool.quantity,
                prev_quantity: tool.quantity,
                available_stock: tool.available_stock,
                notes: tool.notes,
            }));

            form.reset({
                id: item.id,
                project_id:
                    projectTemplate(item?.project ? [item.project] : [])?.at(
                        0
                    ) ?? null,
                employee_id:
                    employTemplate(item?.employee ? [item.employee] : [])?.at(
                        0
                    ) ?? null,
                distribution_date: item.distribution_date || "",
                expected_return_date: item.expected_return_date || "",
                assignTools: assignTools,
                openModel: true,
            });
        },

        onSubmit: async (data) => {
            if (data?.id) {
                await actions.onUpdate(data);
            } else {
                await actions.onCreate(data);
            }
        },
    };

    return {
        actions,
        toolDistributionState,
    };
};
