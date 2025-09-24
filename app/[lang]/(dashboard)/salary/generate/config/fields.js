const fields = (actions) => {
    return [
        // =============== Relations ===============
    
        {
            name: "branch_id",
            type: "async-select",
            label: "Branch",
            loadOptions: [
                "organization/branches",
                "branches",
                "branchSearchTemplate",

            ],
            placeholder: "Optional",
            colSpan: "col-span-12 md:col-span-6",
        },  
        {
            name: "department_id",
            type: "async-select",
            label: "Department",
            loadOptions: [
                "organization/departments",
                "departments",
                "departmentSearchTemplate",
            ],
            placeholder: "Optional",
            colSpan: "col-span-12 md:col-span-6",
        },
        {
            name: "job_position_id",
            type: "async-select",
            label: "Job Position",
            colSpan: "col-span-12 md:col-span-6",
            loadOptions: [
                "organization/job-positions",
                "job_positions",
                "jobPositionsTemplate",
            ],
            handleChange: (data, field) => {
                // Set the selected job position ID in the form
                field.setValue("job_position_id", data || null);

                // Get all 4 IDs from the form
                const filterData = {
                    branch_id: field.getValues("branch_id")?.value || null,
                    department_id:
                        field.getValues("department_id")?.value || null,
                    job_position_id: data?.value || null,
                };

                // Call onFilter with all 4 IDs
                actions.onFilter(filterData);
            },
        },

        // =============== Salary Details ===============
        {
            name: "salary_month",
            type: "month",
            label: "Salary Month *",
            colSpan: "col-span-12 md:col-span-6",
            inputProps: { type: "month" }, // controlled by RHF
            rules: { required: "Salary month is required" },
        },
        {
            name: "basic_salary",
            type: "number",
            label: "Basic Salary *",
            colSpan: "col-span-12 md:col-span-6",
            inputProps: { min: 0, step: "0.01" },
            rules: { required: "Basic salary is required" },
        },

        // =============== Status ===============
        {
            name: "status",
            type: "select",
            label: "Status *",
            placeholder: "Select status",
            colSpan: "col-span-12 md:col-span-6",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Paid", value: "paid" },
            ],
            rules: { required: "Status is required" },
        },

        // =============== Additional Details ===============
        {
            name: "notes",
            type: "textarea",
            label: "Notes",
            placeholder: "Optional notes for this salary record…",
            colSpan: "col-span-12",
        },
    ];
};

export default fields;
