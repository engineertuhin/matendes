import { setCredentials, logout as logoutAction } from "../model/authSlice";
import { useLoginMutation, useLogoutMutation } from "../services/authApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-redux";

const useAuth = () => {
  const dispatch = useAppDispatch();

  // Get current auth state
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [loginMutation, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const login = async (email, password) => {
    try {
      const response = await loginMutation({ email, password }).unwrap();
      
      // Store token in localStorage
      localStorage.setItem("token", response.temp_token);
      
      // Also set in cookies for middleware access
      document.cookie = `auth-token=${response.temp_token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

      dispatch(
        setCredentials({
          user: response.user,
          token: response.temp_token,
        })
      );
      return { success: true };
    } catch (error) {
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
