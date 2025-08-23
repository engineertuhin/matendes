import { useCompany } from "@/domains/company/hook/useCompany";
import { useBranch } from "@/domains/branch/hook/useBranch";

const fields = () => {
    const { actions } = useCompany();
    const { actions: branchAction } = useBranch();
    return [
        {
            name: "company_id",
            type: "async-select",
            label: "Select company",
            loadOptions: (inputValue, callback) => {
                actions.onSearch(inputValue, callback);
            },
            colSpan: "col-span-6",
            rules: { required: "Company  is required" },
        },

        {
            name: "parent_branch_id",
            type: "async-select",
            label: "Parent Branch ",
            loadOptions: (inputValue, callback) => {
                branchAction.onSearch(inputValue, callback);
            },
            placeholder: "Optional",
            colSpan: "col-span-6",
        },

        // --- Core Info ---
        {
            name: "name",
            type: "input",
            label: "Branch Name",
            placeholder: "Gulshan Branch",
            colSpan: "col-span-6",
            rules: { required: "Name is required" },
        },
        {
            name: "code",
            type: "input",
            label: "Branch Code",
            placeholder: "BR-001",
            colSpan: "col-span-6",
            rules: { required: "Code is required" },
        },
        {
            name: "type",
            type: "select",
            label: "Branch Type",
            colSpan: "col-span-6",
            options: [
                { label: "Branch", value: "branch" },
                { label: "Division", value: "division" },
                { label: "Subsidiary", value: "subsidiary" },
            ],
            rules: { required: "Type is required" },
        },

        // --- Manager ---
        {
            name: "manager_name",
            type: "input",
            label: "Manager Name",
            placeholder: "John Doe",
            colSpan: "col-span-6",
        },
        {
            name: "manager_email",
            type: "email",
            label: "Manager Email",
            placeholder: "john.doe@example.com",
            colSpan: "col-span-6",
        },
        {
            name: "manager_phone",
            type: "input",
            label: "Manager Phone",
            placeholder: "+1-555-987654",
            colSpan: "col-span-6",
        },

        // --- Contact ---
        {
            name: "email",
            type: "email",
            label: "Branch Email",
            placeholder: "branch@example.com",
            colSpan: "col-span-6",
        },
        {
            name: "phone",
            type: "input",
            label: "Branch Phone",
            placeholder: "+1-555-123456",
            colSpan: "col-span-6",
        },

        // --- Address ---
        {
            name: "address_line_1",
            type: "textarea",
            label: "Address Line 1",
            placeholder: "123 Main Street",
            colSpan: "col-span-12",
        },
        {
            name: "address_line_2",
            type: "textarea",
            label: "Address Line 2",
            placeholder: "Suite 100",
            colSpan: "col-span-12",
        },
        {
            name: "city",
            type: "input",
            label: "City",
            placeholder: "New York",
            colSpan: "col-span-4",
        },
        {
            name: "state",
            type: "input",
            label: "State",
            placeholder: "NY",
            colSpan: "col-span-4",
        },
        {
            name: "postal_code",
            type: "input",
            label: "Postal Code",
            placeholder: "10001",
            colSpan: "col-span-4",
        },
        {
            name: "country",
            type: "input",
            label: "Country",
            placeholder: "USA",
            colSpan: "col-span-6",
        },

        // --- Geo ---
        {
            name: "latitude",
            type: "number",
            label: "Latitude",
            placeholder: "40.7128",
            colSpan: "col-span-6",
        },
        {
            name: "longitude",
            type: "number",
            label: "Longitude",
            placeholder: "-74.0060",
            colSpan: "col-span-6",
        },

        // --- Business / Meta ---
        {
            name: "established_date",
            type: "date",
            label: "Established Date",
            colSpan: "col-span-6",
        },
        {
            name: "employee_capacity",
            type: "number",
            label: "Employee Capacity",
            placeholder: "200",
            colSpan: "col-span-6",
        },
        {
            name: "operating_hours_start",
            type: "datetime-local",
            label: "Operating Hours Start",
            placeholder: "09:00",
            colSpan: "col-span-6",
            inputProps: { type: "time" }, 
        },
        {
            name: "operating_hours_end",
            type: "datetime-local",
            label: "Operating Hours End",
            placeholder: "18:00",
            colSpan: "col-span-6",
            inputProps: { type: "time" }, 
        },
        {
            name: "operating_days",
            type: "textarea",
            label: "Operating Days",
            placeholder: "Mon-Fri",
            colSpan: "col-span-12",
        },

        // --- Settings ---
        {
            name: "status",
            type: "select",
            label: "Status",
            colSpan: "col-span-6",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Suspended", value: "suspended" },
                { label: "Closed", value: "closed" },
            ],
            rules: { required: "Status is required" },
        },
        {
            name: "is_headquarters",
            type: "checkbox",
            label: "Headquarters?",
            colSpan: "col-span-6",
        },
        {
            name: "is_enabled",
            type: "checkbox",
            label: "Enabled?",
            colSpan: "col-span-6",
        },
        {
            name: "timezone",
            type: "input",
            label: "Timezone",
            placeholder: "UTC",
            colSpan: "col-span-6",
            inputProps: { defaultValue: "UTC" },
        },
        {
            name: "level",
            type: "number",
            label: "Hierarchy Level",
            placeholder: "1",
            colSpan: "col-span-6",
        },
        {
            name: "hierarchy_path",
            type: "input",
            label: "Hierarchy Path",
            placeholder: "/main/branch1",
            colSpan: "col-span-6",
        },
        {
            name: "sort_order",
            type: "number",
            label: "Sort Order",
            placeholder: "0",
            colSpan: "col-span-6",
        },
    ];
};

export default fields;
