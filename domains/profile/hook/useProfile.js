"use client";

import { useForm } from "react-hook-form"; 
import {
    useLazyGetProfileQuery,
    useUpdateProfileMutation, 
} from "../services/profileApi";
import { setProfile } from "../model/profileSlice";
import { useAppDispatch } from "@/hooks/use-redux";

export const useProfile = () => {
    const dispatch = useAppDispatch(); 

    // Lazy query
    const [triggerGetProfile, { isFetching }] = useLazyGetProfileQuery();
    const [updateProfileApi] = useUpdateProfileMutation();

    // Form setup
    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    // Actions
    const actions = {
        onEditProfile: (profile) => {
            form.reset({
                id: profile?.id || "",
                first_name: profile?.personal_info?.first_name || "",
                last_name: profile?.personal_info?.last_name || "",
                email: profile?.contact_info?.work_email || "",
                phone: profile?.contact_info?.primary_phone || "",
                employment_status:
                    profile?.employment_info?.employment_status || "",
            });
        },
        getProfile: async (id = null) => {
            // ✅ trigger API
            const result = await triggerGetProfile({ id }); 
            console.log(result); 
            // ✅ if data exists, push to redux + form
            if (result?.data) {
                
                dispatch(setProfile(result.data));
                actions.onEditProfile(result.data);
            }
        },
    };

    return {
        form,
        actions,
        isFetching,
    };
};
