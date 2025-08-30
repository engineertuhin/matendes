import { useCompany } from "@/domains/company/hook/useCompany";
import { useDepartment } from "@/domains/department/hook/useDepartment";

const fields = () => {
    const { actions: companyActions } = useCompany();
    const { actions: departmentActions } = useDepartment();

    return [
        // =============== Relations ===============
        {
            name: "company_id",
            type: "async-select",
            label: "Select Company *",
            loadOptions: ["companies", "companies", "companySearchTemplate"],
            colSpan: "col-span-12 md:col-span-4",
            rules: { required: "Company is required" },
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
            colSpan: "col-span-12 md:col-span-4",
        },

        // =============== Core Info ===============
        {
            name: "title",
            type: "input",
            label: "Job Title *",
            placeholder: "Job title",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Title is required",
                maxLength: { value: 200, message: "Max 200 characters" },
            },
            inputProps: { maxLength: 200 },
        },
        {
            name: "code",
            type: "input",
            label: "Position Code *",
            placeholder: "ENG-001",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Code is required",
                maxLength: { value: 50, message: "Max 50 characters" },
            },
            inputProps: { maxLength: 50 },
        },
        {
            name: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Overview of the position...",
            colSpan: "col-span-12 ",
        },
        {
            name: "responsibilities",
            type: "textarea",
            label: "Responsibilities",
            placeholder: "Key duties and responsibilities...",
            colSpan: "col-span-12 md:col-span-8 lg:col-span-6",
        },
        {
            name: "requirements",
            type: "textarea",
            label: "Requirements",
            placeholder: "Required qualifications, skills, experience...",
            colSpan: "col-span-12 md:col-span-8 lg:col-span-6",
        },

        // =============== Classification ===============
        {
            name: "type",
            type: "select",
            label: "Type *",
            colSpan: "col-span-12 md:col-span-4",
            options: [
                { label: "Permanent", value: "permanent" },
                { label: "Temporary", value: "temporary" },
                { label: "Contract", value: "contract" },
                { label: "Internship", value: "internship" },
                { label: "Freelance", value: "freelance" },
            ],
            rules: { required: "Type is required" },
        },
        {
            name: "category",
            type: "select",
            label: "Category *",
            colSpan: "col-span-12 md:col-span-4",
            options: [
                { label: "Executive", value: "executive" },
                { label: "Management", value: "management" },
                { label: "Senior", value: "senior" },
                { label: "Mid Level", value: "mid_level" },
                { label: "Junior", value: "junior" },
                { label: "Entry Level", value: "entry_level" },
            ],
            rules: { required: "Category is required" },
        },
        {
            name: "employment_type",
            type: "select",
            label: "Employment Type *",
            colSpan: "col-span-12 md:col-span-4",
            options: [
                { label: "Full Time", value: "full_time" },
                { label: "Part Time", value: "part_time" },
                { label: "Casual", value: "casual" },
                { label: "Seasonal", value: "seasonal" },
            ],
            rules: { required: "Employment type is required" },
        },
        {
            name: "grade",
            type: "input",
            label: "Grade",
            placeholder: "A1, B2, etc.",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { maxLength: 20 },
            rules: { maxLength: { value: 20, message: "Max 20 characters" } },
        },

        // =============== Level & Salary ===============
        {
            name: "level",
            type: "number",
            label: "Level *",
            placeholder: "1",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Level is required",
                min: { value: 1, message: "Must be ≥ 1" },
            },
            inputProps: { min: 1, step: "1" },
        },
        {
            name: "min_salary",
            type: "number",
            label: "Minimum Salary",
            placeholder: "50000.00",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { min: 0, step: "0.01" },
            rules: { min: { value: 0, message: "Must be ≥ 0" } },
        },
        {
            name: "max_salary",
            type: "number",
            label: "Maximum Salary",
            placeholder: "90000.00",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { min: 0, step: "0.01" },
            rules: { min: { value: 0, message: "Must be ≥ 0" } },
        },
        {
            name: "salary_currency",
            type: "input",
            label: "Salary Currency *",
            placeholder: "USD",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Currency is required",
                maxLength: { value: 3, message: "Max 3 characters" },
            },
            inputProps: { maxLength: 3 },
        },
        {
            name: "salary_period",
            type: "select",
            label: "Salary Period *",
            colSpan: "col-span-12 md:col-span-4",
            options: [
                { label: "Hourly", value: "hourly" },
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
            ],
            rules: { required: "Salary period is required" },
        },
        {
            name: "benefits",
            type: "textarea",
            label: "Benefits",
            placeholder: "List of benefits...",
            colSpan: "col-span-12",
        },

        // =============== Reporting ===============
        {
            name: "reports_to_position_id",
            type: "async-select",
            label: "Reports To (Position)",

            placeholder: "Optional",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "is_management_position",
            type: "checkbox",
            label: "Management Position",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "is_executive_position",
            type: "checkbox",
            label: "Executive Position",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "direct_reports_count",
            type: "number",
            label: "Direct Reports Count *",
            placeholder: "0",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Direct reports count is required",
                min: { value: 0, message: "Must be ≥ 0" },
            },
            inputProps: { min: 0, step: "1" },
        },

        // =============== Requirements & Skills ===============
        {
            name: "required_skills",
            type: "textarea",
            label: "Required Skills",
            placeholder: "Must-have skills…",
            colSpan: "col-span-12 ",
        },
        {
            name: "preferred_skills",
            type: "textarea",
            label: "Preferred Skills",
            placeholder: "Nice-to-have skills…",
            colSpan: "col-span-12",
        },
        {
            name: "education_level",
            type: "input",
            label: "Education Level",
            placeholder: "Bachelor's degree, etc.",
            colSpan: "col-span-12 md:col-span-4",
            inputProps: { maxLength: 100 },
            rules: { maxLength: { value: 100, message: "Max 100 characters" } },
        },
        {
            name: "experience_years_min",
            type: "number",
            label: "Minimum Experience (Years) *",
            placeholder: "0",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Minimum experience is required",
                min: { value: 0, message: "Must be ≥ 0" },
            },
            inputProps: { min: 0, step: "1" },
        },
        {
            name: "experience_years_max",
            type: "number",
            label: "Maximum Experience (Years)",
            placeholder: "10",
            colSpan: "col-span-12 md:col-span-4",
            rules: { min: { value: 0, message: "Must be ≥ 0" } },
            inputProps: { min: 0, step: "1" },
        },

        // =============== Recruitment & Vacancy ===============
        {
            name: "total_positions",
            type: "number",
            label: "Total Positions *",
            placeholder: "1",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Total positions is required",
                min: { value: 1, message: "Must be ≥ 1" },
            },
            inputProps: { min: 1, step: "1" },
        },
        {
            name: "filled_positions",
            type: "number",
            label: "Filled Positions *",
            placeholder: "0",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Filled positions is required",
                min: { value: 0, message: "Must be ≥ 0" },
            },
            inputProps: { min: 0, step: "1" },
        },
        {
            name: "vacant_positions",
            type: "number",
            label: "Vacant Positions *",
            placeholder: "1",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Vacant positions is required",
                min: { value: 0, message: "Must be ≥ 0" },
            },
            inputProps: { min: 0, step: "1" },
        },
        {
            name: "is_recruiting",
            type: "checkbox",
            label: "Currently Recruiting",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "recruitment_start_date",
            type: "date",
            label: "Recruitment Start Date",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "recruitment_end_date",
            type: "date",
            label: "Recruitment End Date",
            colSpan: "col-span-12 md:col-span-4",
        },

        // =============== Status & Work Style ===============
        {
            name: "status",
            type: "select",
            label: "Status *",
            colSpan: "col-span-12 md:col-span-4",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "On Hold", value: "on_hold" },
                { label: "Discontinued", value: "discontinued" },
            ],
            rules: { required: "Status is required" },
        },
        {
            name: "is_enabled",
            type: "checkbox",
            label: "Enabled",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "is_remote_eligible",
            type: "checkbox",
            label: "Remote Eligible",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "is_travel_required",
            type: "checkbox",
            label: "Travel Required",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            name: "travel_percentage",
            type: "number",
            label: "Travel Percentage *",
            placeholder: "0",
            colSpan: "col-span-12 md:col-span-4",
            rules: {
                required: "Travel percentage is required",
                min: { value: 0, message: "Must be ≥ 0" },
                max: { value: 100, message: "Max 100%" },
            },
            inputProps: { min: 0, max: 100, step: "1" },
        },
    ];
};

export default fields;
