import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-redux";
import {
    useViewAttendanceQuery,
    useGenerateQRCodeMutation,
    useScanQRCodeMutation,
    useLazyGetQRStatusQuery,
    useCheckInMutation,
    useCheckOutMutation,
    useLazyGetTodayAttendanceQuery,
    useSyncOfflineDataMutation,
} from "../services/attendanceApi";
import {
    setTodayAttendance,
    setCurrentQRCode,
    setQRStatus,
    checkIn as checkInAction,
    checkOut as checkOutAction,
    addToOfflineData,
    setSyncStatus,
    setLastAction,
} from "../model/attendanceSlice";
import toast from "react-hot-toast";

const useAttendance = () => {
    const dispatch = useAppDispatch();
    
    // Get current attendance state
    const { 
        todayAttendance, 
        currentQRCode, 
        qrStatus, 
        isCheckedIn, 
        lastAction,
        offlineData,
        syncStatus
    } = useAppSelector((state) => state.attendance);

    // Get current user data for employee_id
    const { user } = useAppSelector((state) => state.auth);

    // RTK Query hooks
    const [generateQRCodeMutation, { isLoading: isGeneratingQR }] = useGenerateQRCodeMutation();
    const [scanQRCodeMutation, { isLoading: isScanningQR }] = useScanQRCodeMutation();
    const [triggerGetQRStatus] = useLazyGetQRStatusQuery();
    const [checkInMutation, { isLoading: isCheckingIn }] = useCheckInMutation();
    const [checkOutMutation, { isLoading: isCheckingOut }] = useCheckOutMutation();
    const [triggerGetTodayAttendance] = useLazyGetTodayAttendanceQuery();
    const [syncOfflineDataMutation, { isLoading: isSyncing }] = useSyncOfflineDataMutation();

    //  const { data: attendance} = useViewAttendanceQuery();
      const { data, refetch, isFetching } = useViewAttendanceQuery();


        const attendanceState = {
            data: data?.data || [],
         
            refetch,
            pagination: data?.data?.pagination || {},
            isFetching,
        };

    // QR Code operations
    const generateQRCode = useCallback(async (branchId, expiresInMinutes = 30) => {
        try {
            const response = await generateQRCodeMutation({ 
                branchId, 
                expiresInMinutes 
            }).unwrap();
            
            dispatch(setCurrentQRCode(response.data));
            
            return { 
                success: true, 
                data: response.data,
                message: response.message || 'QR code generated successfully'
            };
        } catch (error) {
            console.error('Generate QR error:', error);
            return { 
                success: false, 
                error: error?.data?.message || 'Failed to generate QR code' 
            };
        }
    }, [generateQRCodeMutation, dispatch]);

    const getQRStatus = useCallback(async (branchId) => {
        try {
            const response = await triggerGetQRStatus(branchId).unwrap();
            dispatch(setQRStatus(response.data));
            
            return { 
                success: true, 
                data: response.data 
            };
        } catch (error) {
            console.error('Get QR status error:', error);
            return { 
                success: false, 
                error: error?.data?.message || 'Failed to get QR status' 
            };
        }
    }, [triggerGetQRStatus, dispatch]);

    // QR Attendance operations
    const qrCheckIn = useCallback(async (qrData, latitude, longitude) => {
        try {
            // Parse QR data to extract token
            let qrToken = qrData;
            try {
                const parsed = JSON.parse(qrData);
                qrToken = parsed.qr_token || parsed.token || qrData;
            } catch {
                // If it's not JSON, use as-is
                qrToken = qrData;
            }

            const deviceInfo = {
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };

            const response = await scanQRCodeMutation({
                qrToken,
                action: 'check_in',
                latitude,
                longitude,
                deviceInfo,
            }).unwrap();

            dispatch(checkInAction(response.data));
            dispatch(setLastAction({ 
                action: 'check_in', 
                success: true, 
                data: response.data 
            }));

            toast.success(response.message || 'Check-in successful!');

            return { 
                success: true, 
                data: response.data,
                message: response.message || 'Check-in successful!' 
            };
        } catch (error) {
            console.error('QR Check-in error:', error);
            
            const errorMessage = error?.data?.message || 
                               error?.data?.errors?.qr_token?.[0] ||
                               'Check-in failed. Please try again.';
            
            dispatch(setLastAction({ 
                action: 'check_in', 
                success: false, 
                error: errorMessage 
            }));

            // Store for offline sync if network error
            if (!navigator.onLine || error?.status >= 500) {
                dispatch(addToOfflineData({
                    action: 'check_in',
                    qr_token: qrToken,
                    latitude,
                    longitude,
                    device_info: deviceInfo,
                }));
                toast.error('Stored offline. Will sync when online.');
            } else {
                toast.error(errorMessage);
            }
            
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }, [scanQRCodeMutation, dispatch]);

    const qrCheckOut = useCallback(async (qrData, latitude, longitude) => {
        try {
            // Parse QR data to extract token
            let qrToken = qrData;
            try {
                const parsed = JSON.parse(qrData);
                qrToken = parsed.qr_token || parsed.token || qrData;
            } catch {
                // If it's not JSON, use as-is
                qrToken = qrData;
            }

            const deviceInfo = {
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };

            const response = await scanQRCodeMutation({
                qrToken,
                action: 'check_out',
                latitude,
                longitude,
                deviceInfo,
            }).unwrap();

            dispatch(checkOutAction(response.data));
            dispatch(setLastAction({ 
                action: 'check_out', 
                success: true, 
                data: response.data 
            }));

            toast.success(response.message || 'Check-out successful!');

            return { 
                success: true, 
                data: response.data,
                message: response.message || 'Check-out successful!' 
            };
        } catch (error) {
            console.error('QR Check-out error:', error);
            
            const errorMessage = error?.data?.message || 
                               error?.data?.errors?.qr_token?.[0] ||
                               'Check-out failed. Please try again.';
            
            dispatch(setLastAction({ 
                action: 'check_out', 
                success: false, 
                error: errorMessage 
            }));

            // Store for offline sync if network error
            if (!navigator.onLine || error?.status >= 500) {
                dispatch(addToOfflineData({
                    action: 'check_out',
                    qr_token: qrToken,
                    latitude,
                    longitude,
                    device_info: deviceInfo,
                }));
                toast.error('Stored offline. Will sync when online.');
            } else {
                toast.error(errorMessage);
            }
            
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }, [scanQRCodeMutation, dispatch]);

    // Regular attendance operations
    const checkIn = useCallback(async (method = 'manual', additionalData = {}) => {
        try {
            const response = await checkInMutation({
                method,
                ...additionalData
            }).unwrap();

            dispatch(checkInAction(response.data));
            toast.success(response.message || 'Check-in successful!');

            return { 
                success: true, 
                data: response.data,
                message: response.message || 'Check-in successful!' 
            };
        } catch (error) {
            console.error('Check-in error:', error);
            const errorMessage = error?.data?.message || 'Check-in failed';
            toast.error(errorMessage);
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }, [checkInMutation, dispatch]);

    const checkOut = useCallback(async (method = 'manual', additionalData = {}) => {
        try {
            const response = await checkOutMutation({
                method,
                ...additionalData
            }).unwrap();

            dispatch(checkOutAction(response.data));
            toast.success(response.message || 'Check-out successful!');

            return { 
                success: true, 
                data: response.data,
                message: response.message || 'Check-out successful!' 
            };
        } catch (error) {
            console.error('Check-out error:', error);
            const errorMessage = error?.data?.message || 'Check-out failed';
            toast.error(errorMessage);
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }, [checkOutMutation, dispatch]);

    const getTodayAttendance = useCallback(async () => {
        try {
            const response = await triggerGetTodayAttendance().unwrap();
            dispatch(setTodayAttendance(response.data));
            return { 
                success: true, 
                data: response.data 
            };
        } catch (error) {
            console.error('Get attendance error:', error);
            return { 
                success: false, 
                error: error?.data?.message || 'Failed to get attendance data' 
            };
        }
    }, [triggerGetTodayAttendance, dispatch]);

    // Offline sync
    const syncOfflineData = useCallback(async () => {
        if (offlineData.length === 0) {
            return { success: true, message: 'No offline data to sync' };
        }

        try {
            dispatch(setSyncStatus('syncing'));
            
            const response = await syncOfflineDataMutation(offlineData).unwrap();
            
            dispatch(clearOfflineData());
            dispatch(setSyncStatus('completed'));
            
            toast.success(`Synced ${offlineData.length} offline records`);
            
            return { 
                success: true, 
                data: response.data,
                message: response.message || 'Offline data synced successfully'
            };
        } catch (error) {
            dispatch(setSyncStatus('failed'));
            console.error('Sync error:', error);
            const errorMessage = error?.data?.message || 'Failed to sync offline data';
            toast.error(errorMessage);
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }, [syncOfflineDataMutation, dispatch, offlineData]);

    return {
        // State
        todayAttendance,
        currentQRCode,
        qrStatus,
        isCheckedIn,
        lastAction,
        offlineData,
        syncStatus,

        // QR methods
        generateQRCode,
        getQRStatus,
        qrCheckIn,
        qrCheckOut,
        
        // Regular methods
        checkIn,
        checkOut,
        getTodayAttendance,
        
        // Offline sync
        syncOfflineData,

        // Loading states
        isGeneratingQR,
        isScanningQR,
        isCheckingIn,
        isCheckingOut,
        isSyncing,
        attendanceState,
    };
   
};

export default useAttendance;