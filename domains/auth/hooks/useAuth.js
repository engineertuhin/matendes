import { setCredentials, logout as logoutAction } from "../model/authSlice";
import {
    useLoginMutation,
    useLogoutMutation,
    useLazyMeQuery,
} from "../services/authApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-redux";
import Cookies from "js-cookie";

const useAuth = () => {
    const dispatch = useAppDispatch();

    // Get current auth state
    const { user, token, isAuthenticated,permissions } = useAppSelector(
        (state) => state.auth
    );

    const [loginMutation, { isLoading: isLoggingIn, error: loginError }] =
        useLoginMutation();

    const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
    const [triggerMe] = useLazyMeQuery();

    const login = async (email, password) => {
        try {
            const response = await loginMutation({ email, password }).unwrap();

            Cookies.set("auth-token", response.data.token, { expires: 7 }); // expires in 7 days

            dispatch(
                setCredentials({
                    user: response.user,
                    token: response.token,
                })
            );
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };
    const getMe = async () => {
        try {
            const response = await triggerMe().unwrap();
            dispatch(
                setCredentials({
                    user: response.data,
                    token: Cookies.get("auth-token") || null,
                    setPermissions: response.data.permission,
                })
            );
    





            return { success: true, data: response };
        } catch (error) {
            if (error?.status === 401) {
                Cookies.remove("auth-token");

                dispatch(logoutAction());
            }

            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logoutAction());
            return { success: true };
        } catch (error) {
            // Even if API call fails, clear local state
            dispatch(logoutAction());
            return { success: false, error };
        }
    };

    return {
        // Auth state
        user,
        token,
        isAuthenticated,
        getMe,

        // Actions
        login,
        logout,

        // Loading states
        isLoggingIn,
        isLoggingOut,

        // Errors
        loginError,
    };
};

export default useAuth;
