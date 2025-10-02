import toast from "react-hot-toast";

const fields = (actions) => {
    return [
        {
            name: "attendance_type",
            type: "select",
            label: "Attendance For *",
            colSpan: "col-span-12 md:col-span-6",
            options: [
                {
                    label: "Company wise Attendance",
                    value: "company_attendance",
                },
                {
                    label: "Project wise Attendance",
                    value: "project_attendance",
                },
            ],
            handleChange: (e, form) => {
                actions.onAttendanceTypeChange(e.value, form);
            },
            rules: { required: "Status is required" },
        },

        // Global Settings Section
        {
            name: "global_date",
            type: "date",
            label: "Global Date *",
            placeholder: "Select attendance date",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { type: "date" },
            handleChange: (value, form) => {
                console.log(value);
                // Apply global date to all employees
                const employees = form.getValues("employees") || [];
                employees.forEach((_, index) => {
                    form.setValue(`employees.${index}.date`, value, {
                        shouldDirty: true,
                    });
                });
                form.trigger("employees"); // Trigger validation/re-render
                toast.success("Global date applied to all employees");
            },
            rules: { required: "Global date is required" },
        },
        {
            name: "global_check_in_time",
            type: "date",
            label: "Global Check-in Time *",
            placeholder: "Select global check-in time",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { type: "time" },
            handleChange: (value, form) => {
                // Apply global check-in time to all employees
                const employees = form.getValues("employees") || [];
                employees.forEach((_, index) => {
                    form.setValue(`employees.${index}.check_in_time`, value, {
                        shouldDirty: true,
                    });
                });
                form.trigger("employees"); // Trigger validation/re-render
                toast.success("Global check-in time applied to all employees");
            },
            rules: { required: "Global check-in time is required" },
        },
        {
            name: "global_check_out_time",
            type: "date",
            label: "Global Check-out Time *",
            placeholder: "Select global check-out time",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { type: "time" },
            handleChange: (value, form) => {
                // Apply global check-out time to all employees
                const employees = form.getValues("employees") || [];
                employees.forEach((_, index) => {
                    form.setValue(`employees.${index}.check_out_time`, value, {
                        shouldDirty: true,
                    });
                });
                form.trigger("employees"); // Trigger validation/re-render
                toast.success("Global check-out time applied to all employees");
            },
            rules: { required: "Global check-out time is required" },
        },

        {
            name: "employees",
            type: "group-form",
            label: "Employee Attendance",
            placeholder: "Add employees for attendance",
            colSpan: "col-span-12",
            addButtonLabel: false,
            fields: [
                {
                    name: "name",
                    type: "text",
                    label: "Employee Name *",
                    placeholder: "Enter employee name",
                    colSpan: "col-span-12 md:col-span-3",
                    rules: { required: "Employee name is required" },
                },
                {
                    name: "date",
                    type: "date",
                    label: "Date *",
                    placeholder: "Select date",
                    colSpan: "col-span-12 md:col-span-3",
                    inputProps: { type: "date" },
                    rules: { required: "Date is required" },
                },
                {
                    name: "check_in_time",
                    type: "date",
                    label: "Check-in Time *",
                    placeholder: "Select check-in time",
                    colSpan: "col-span-12 md:col-span-3",
                    inputProps: { type: "time" },
                    rules: { required: "Check-in time is required" },
                },
                {
                    name: "check_out_time",
                    type: "date",
                    label: "Check-out Time *",
                    placeholder: "Select check-out time",
                    colSpan: "col-span-12 md:col-span-3",
                    inputProps: { type: "time" },
                    rules: { required: "Check-out time is required" },
                },
            ],
        },
    ];
};

export default fields;
