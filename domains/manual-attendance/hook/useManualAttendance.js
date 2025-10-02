import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useMemo } from "react";
import {
    debounce,
    handleServerValidationErrors,
    formReset,
    normalizeSelectValues,
} from "@/utility/helpers";
import {
    useUpdateManualAttendanceMutation,
    useDeleteManualAttendanceMutation,
    useFetchManualAttendancesQuery,
    useLazyFilterEmployeesForAttendanceQuery,
    useCreateManualAttendanceMutation,
} from "../services/manualAttendanceApi";

export const useManualAttendance = () => {
    // RTK Query mutations
    const [updateManualAttendance] = useUpdateManualAttendanceMutation();
    const [deleteManualAttendance] = useDeleteManualAttendanceMutation();
    const [createManualAttendance] = useCreateManualAttendanceMutation();

    // Lazy query for employee filter
    const [
        filterEmployees,
        { data: employeeFilterResults, isFetching: isFiltering },
    ] = useLazyFilterEmployeesForAttendanceQuery();

    // Fetch query
    const {
        data: manualAttendanceData,
        refetch,
        isFetching,
    } = useFetchManualAttendancesQuery();

    // Form
    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const fieldArray = useFieldArray({
        control: form.control,
        name: "employees", // This matches the field name in form
    });

    // Debounced filter function
    const debouncedEmployeeFilter = useMemo(
        () =>
            debounce(async (filterTerm) => {
                if (filterTerm && filterTerm.length >= 2) {
                    try {
                        const response = await filterEmployees(filterTerm);
                        fieldArray.remove();
                        response?.data?.data?.map((item) => {
                            fieldArray.append({
                                name: item.first_name + " " + item.last_name,
                                employee_id: item.id,
                                check_in_time: "",
                                check_out_time: "",
                            });
                        });
                    } catch (error) {
                        console.error("Employee filter error:", error);
                        toast.error("Failed to filter employees");
                    }
                }
            }, 300),
        [filterEmployees]
    );

    // State object
const manualAttendanceState = {
    data: manualAttendanceData?.data?.master_attendances || [],
    form: {
        ...form,
        fields: fieldArray,
    },
    refetch,
    pagination: manualAttendanceData?.pagination || {},
    isFetching,
    employeeFilterResults: employeeFilterResults?.data || [],
    isFiltering,
};

    // Actions
    const actions = {
        // Utility function to format date
        formatDateForForm: (dateString) => {
            if (!dateString) return "";
            try {
                return new Date(dateString).toISOString().split("T")[0];
            } catch (error) {
                console.error("Date formatting error:", error);
                return "";
            }
        },

        // Utility function to get employee name from different formats
        getEmployeeName: (employee) => {
            if (!employee) return "";
            if (employee.name) return employee.name;
            if (employee.first_name && employee.last_name) {
                return `${employee.first_name} ${employee.last_name}`;
            }
            if (employee.first_name) return employee.first_name;
            return "";
        },

        // Validate form data before submission
        validateFormData: (data) => {
            const errors = [];

            if (!data.attendance_type) {
                errors.push("Attendance type is required");
            }

            if (!data.global_date) {
                errors.push("Global date is required");
            }

            if (!data.global_check_in_time) {
                errors.push("Global check-in time is required");
            }

            if (!data.global_check_out_time) {
                errors.push("Global check-out time is required");
            }

            if (!data.employees || data.employees.length === 0) {
                errors.push("At least one employee is required");
            }

            // Validate each employee
            data.employees?.forEach((emp, index) => {
                if (!emp.employee_id) {
                    errors.push(
                        `Employee ${index + 1}: Employee ID is required`
                    );
                }
                if (!emp.name) {
                    errors.push(
                        `Employee ${index + 1}: Employee name is required`
                    );
                }
                if (!emp.date) {
                    errors.push(`Employee ${index + 1}: Date is required`);
                }
                if (!emp.check_in_time) {
                    errors.push(
                        `Employee ${index + 1}: Check-in time is required`
                    );
                }
                if (!emp.check_out_time) {
                    errors.push(
                        `Employee ${index + 1}: Check-out time is required`
                    );
                }
            });

            return errors;
        },

        onCreate: async (data) => {
            try {
                // Validate form data
                const validationErrors = actions.validateFormData(data);
                if (validationErrors.length > 0) {
                    toast.error(`Validation failed: ${validationErrors[0]}`);
                    return;
                }

                const response = await createManualAttendance(data).unwrap();
                if (response.success) {
                    toast.success("Master attendance created successfully");
                    refetch();
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                console.log("API Errors:", apiErrors);
                if (apiErrors?.data?.errors?.employees) {
                    const employeeErrors = apiErrors.data.errors.employees;
                    if (Array.isArray(employeeErrors)) {
                        toast.error(employeeErrors[0]);
                    }
                }
                // Handle server validation errors
                // handleServerValidationErrors(apiErrors, form);

                // Show specific error messages for duplicate attendance

                throw apiErrors;
            }
        },

        onEdit: (masterAttendanceData) => {
            try {
                console.log(
                    "Editing master attendance data:",
                    masterAttendanceData
                );

                // Validate input data
                if (!masterAttendanceData || !masterAttendanceData.id) {
                    toast.error("Invalid attendance data provided for editing");
                    return;
                }

                // Handle both raw API data and transformed tableData
                const isRawApiData =
                    masterAttendanceData.attendance_type &&
                    masterAttendanceData.attendances;

                let formData;

                // Small helper for H:i format (24h)
                const formatTime = (time) => {
                    if (!time) return "";
                    const d = new Date(`1970-01-01T${time}`);
                    const hours = String(d.getHours()).padStart(2, "0");
                    const minutes = String(d.getMinutes()).padStart(2, "0");
                    return `${hours}:${minutes}`;
                };

                if (isRawApiData) {
                    // Handle raw API data structure
                    formData = {
                        id: masterAttendanceData.id,
                        attendance_type: masterAttendanceData.attendance_type,
                        global_date: actions.formatDateForForm(
                            masterAttendanceData.global_date
                        ),
                        global_check_in_time: formatTime(
                            masterAttendanceData.global_check_in_time
                        ),
                        global_check_out_time: formatTime(
                            masterAttendanceData.global_check_out_time
                        ),
                        project_id:
                            masterAttendanceData.project_id ||
                            masterAttendanceData.project?.id ||
                            null,
                        notes: masterAttendanceData.notes || "",
                        // Prepare employee data from raw attendances array
                        employees: (masterAttendanceData.attendances || []).map(
                            (attendance) => ({
                                employee_id: attendance.employee_id,
                                name: actions.getEmployeeName(
                                    attendance.employee
                                ),
                                date: actions.formatDateForForm(
                                    attendance.date
                                ),
                                check_in_time: formatTime(
                                    attendance.check_in_time
                                ),
                                check_out_time: formatTime(
                                    attendance.check_out_time
                                ),
                                status: attendance.status || "present",
                            })
                        ),
                    };
                } else {
                    // Handle transformed tableData structure
                    formData = {
                        id:
                            masterAttendanceData.id ||
                            masterAttendanceData.masterAttendanceId,
                        attendance_type: masterAttendanceData.attendanceType,
                        global_date: masterAttendanceData.globalDate,
                        global_check_in_time: formatTime(
                            masterAttendanceData.globalCheckInTime
                        ),
                        global_check_out_time: formatTime(
                            masterAttendanceData.globalCheckOutTime
                        ),
                        project_id: masterAttendanceData.project?.id || null,
                        notes: masterAttendanceData.notes || "",
                        openModel: true,
                        // Prepare employee data for editing from employeeAttendances
                        employees: (
                            masterAttendanceData.employeeAttendances || []
                        ).map((empAtt) => ({
                            employee_id: empAtt.employeeId,
                            name: empAtt.employeeName,
                            date: actions.formatDateForForm(empAtt.date),
                            check_in_time: formatTime(empAtt.checkInTime),
                            check_out_time: formatTime(empAtt.checkOutTime),
                            status: empAtt.status || "present",
                        })),
                    };
                }

                form.reset(formData);

                // Clear existing field array and populate with employee data
                fieldArray.remove();
                formData.employees.forEach((employee) => {
                    fieldArray.append(employee);
                });

                form.setValue("openModel", true);
            } catch (error) {
                console.error("Error in onEdit:", error);
                toast.error(
                    "Failed to prepare data for editing. Please try again."
                );
            }
        },
        onUpdate: async (data) => {
            try {
                // Validate form data
                const validationErrors = actions.validateFormData(data);
                if (validationErrors.length > 0) {
                    toast.error(`Validation failed: ${validationErrors[0]}`);
                    return;
                }

                const { id, ...rest } = data;
                const preparedData = normalizeSelectValues(rest, []);
                const response = await updateManualAttendance({
                    id,
                    ...preparedData,
                }).unwrap();
                if (response.success) {
                    toast.success("Master attendance updated successfully");
                    refetch();
                    formReset(form);
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                // Handle server validation errors
                handleServerValidationErrors(apiErrors, form.setError);
                
                // Show specific error messages for duplicate attendance
                if (apiErrors?.data?.errors?.employees) {
                    const employeeErrors = apiErrors.data.errors.employees;
                    if (Array.isArray(employeeErrors)) {
                        toast.error(employeeErrors[0]);
                    }
                }

                throw apiErrors;
            }
        },

        onDelete: async (id) => {
            try {
                if (
                    confirm(
                        "Are you sure you want to delete this master attendance record? This will delete all associated employee attendance records."
                    )
                ) {
                    const response = await deleteManualAttendance(id).unwrap();
                    if (response.success) {
                        toast.success("Master attendance deleted successfully");
                        refetch();
                    } else {
                        toast.error("Failed to delete master attendance");
                    }
                }
            } catch (error) {
                console.error("Delete master attendance error:", error);
                toast.error(
                    "Something went wrong while deleting master attendance"
                );
            }
        },

        // View details of a master attendance
        onViewDetails: (masterAttendanceData) => {
            return {
                masterInfo: {
                    id: masterAttendanceData.id,
                    type: masterAttendanceData.attendanceTypeDisplay,
                    date: masterAttendanceData.displayDate,
                    timeRange: masterAttendanceData.displayTimeRange,
                    project: masterAttendanceData.displayProject,
                    notes: masterAttendanceData.notes,
                    creator: masterAttendanceData.displayCreator,
                    status: masterAttendanceData.displayStatus,
                },
                employees: masterAttendanceData.employeeAttendances,
                statistics: masterAttendanceData.statistics,
            };
        },

        // Filter and search functions
        onSearch: (searchTerm) => {
            // You can implement search logic here
            // This could trigger a new API call with search parameters
            refetch({ search: searchTerm });
        },

        onFilter: (filters) => {
            // Handle filtering by attendance type, date range, etc.
            refetch(filters);
        },

        // Debug helper function
        debugFormData: () => {
            const formValues = form.getValues();
            const fieldArrayValues = fieldArray.fields;
            console.log("=== DEBUG FORM DATA ===");
            console.log("Form values:", formValues);
            console.log("Field array values:", fieldArrayValues);
            console.log("=== END DEBUG ===");
            return { formValues, fieldArrayValues };
        },

        // Employee filtering for attendance creation
        onAttendanceTypeChange: async (filterTerm) => {
            if (!filterTerm || filterTerm.length < 2) {
                return [];
            }

            try {
                form.setValue("attendance_type", filterTerm);
                await debouncedEmployeeFilter(filterTerm);
                return employeeFilterResults?.data || [];
            } catch (error) {
                console.error("Employee filter error:", error);
                toast.error("Failed to filter employees");
                return [];
            }
        },

        // Utility functions for table operations
        getTableColumns: () => [
            {
                key: "displayDate",
                title: "Date",
                dataIndex: "displayDate",
                sortable: true,
            },
            {
                key: "attendanceTypeDisplay",
                title: "Type",
                dataIndex: "attendanceTypeDisplay",
                sortable: true,
            },
            {
                key: "displayProject",
                title: "Project",
                dataIndex: "displayProject",
                sortable: true,
            },
            {
                key: "displayTimeRange",
                title: "Time Range",
                dataIndex: "displayTimeRange",
            },
            {
                key: "displayEmployeeCount",
                title: "Employees",
                dataIndex: "displayEmployeeCount",
                render: (value, record) =>
                    `${value} (${record.displayPresentCount} present)`,
            },
            {
                key: "displayTotalHours",
                title: "Total Hours",
                dataIndex: "displayTotalHours",
                render: (value) => `${value}h`,
            },
            {
                key: "displayStatus",
                title: "Status",
                dataIndex: "displayStatus",
                render: (value) => (
                    <span
                        className={`badge ${
                            value === "Published"
                                ? "badge-success"
                                : "badge-warning"
                        }`}
                    >
                        {value}
                    </span>
                ),
            },
            {
                key: "actions",
                title: "Actions",
                render: (_, record) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => actions.onViewDetails(record)}
                            className="btn btn-sm btn-info"
                        >
                            View
                        </button>
                        {record.canEdit && (
                            <button
                                onClick={() => actions.onEdit(record)}
                                className="btn btn-sm btn-primary"
                            >
                                Edit
                            </button>
                        )}
                        {record.canDelete && (
                            <button
                                onClick={() => actions.onDelete(record.id)}
                                className="btn btn-sm btn-danger"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ),
            },
        ],
    };

    return {
        actions,
        manualAttendanceState,
    };
};
