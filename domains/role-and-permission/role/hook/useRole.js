import { handleServerValidationErrors } from "@/utility/helpers";
import {
    useRoleCreateMutation,
    useRoleUpdateMutation,
    useRoleDeleteMutation,
    useRoleFetchQuery,
    useRolePermissionsFetchQuery, 
    useRolePermissionsUpdateMutation, // ✅ add this
} from "../services/roleApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { formReset } from "@/utility/helpers";
import { debounce } from "@/utility/helpers";
import { roleSearchTemplate } from "@/utility/templateHelper";

export const useRole = () => {
    const [userCreate] = useRoleCreateMutation();
    const [userUpdate] = useRoleUpdateMutation();
    const [userDelete] = useRoleDeleteMutation();
    const [permissionsUpdate] = useRolePermissionsUpdateMutation();
    const { data: roleAndPermission, refetch } = useRoleFetchQuery();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });
 

    const rolesState = {
        data: roleAndPermission?.data?.roles || [],
        form,
        permissions: roleAndPermission?.data?.permissions || [],
    }; 

    
    const actions = {
        onCreate: async (data) => {
            try {
                let { openModel, ...other } = data;

                const response = await userCreate(other).unwrap();
                if (response) {
                    toast.success("Role Create Successfully");
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
                name: data.name || "",
                display_name: data.display_name || "",
                description: data.description || "",
                is_system: data.is_system || false,
                parent_role_id: data.parent_role_id || null,
                level: data.level?.toString() ?? "0", // convert number to string for select
                metadata: data.metadata || null,
                created_at: data.created_at || "",
                updated_at: data.updated_at || "",
                deleted_at: data.deleted_at || "",
            });
            form.setValue("selectedPermission", []);

            form.setValue("openModel", true);
        },

        onUpdate: async (data) => {
            let { openModel, id, ...other } = data;
            const response = await userUpdate({
                id,
                credentials: other,
            }).unwrap();
            if (response) {
                toast.success("Role Update Successfully");
                refetch();
                formReset(form);

                form.setValue("openModel", false);
            }
        },
        onDelete: (id) => {
            if (confirm("are you sure to delete it")) {
                toast.success("Role Delete Successfully");
                userDelete({ id });
            }
        },

        onManagePermissions: (data) => {
            const ids = data.permissions.map((data)=>data.id); 
            
            form.setValue("id", data.id);
            form.setValue("openModel", true);
            form.setValue("openPermissionMode", true);
            form.setValue("selectedPermission", [...ids]);
        },
    };

    return {
        actions,
        rolesState,
    };
};
