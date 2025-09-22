const fields = [
    // Core
    {
        name: "name",
        type: "input",
        label: "Company Name *",
        placeholder: "Acme Inc.",
        colSpan: "col-span-12 md:col-span-6",
        rules: { required: "Name is required" },
    },
    {
        name: "slug",
        type: "input",
        label: "Slug",
        placeholder: "acme-inc",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "subdomain",
        type: "input",
        label: "Subdomain",
        placeholder: "acme",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "legal_name",
        type: "input",
        label: "Legal Name",
        placeholder: "Acme Incorporated",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "code",
        type: "input",
        label: "Company Code *",
        placeholder: "ACM001",
        colSpan: "col-span-12 md:col-span-6",
        rules: { required: "Company code is required" },
    },
    {
        name: "registration_number",
        type: "input",
        label: "Registration Number",
        placeholder: "REG-12345",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "tax_id",
        type: "input",
        label: "Tax ID",
        placeholder: "TAX-98765",
        colSpan: "col-span-12 md:col-span-6",
    },

    {
        name: "vat_number",
        type: "input",
        label: "VAT Number",
        placeholder: "VAT-12345",
        colSpan: "col-span-12 md:col-span-6",
    },

    {
        name: "incorporation_date",
        type: "date",
        label: "Incorporation Date",
        colSpan: "col-span-12 md:col-span-6",
    },

    {
        name: "incorporation_country_id",
        type: "input",
        label: "Incorporation Country ID",
        placeholder: "UUID of country",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "info@acme.com",
        colSpan: "col-span-12 md:col-span-6",
        rules: {
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
            },
        },
    },
    {
        name: "phone",
        type: "input",
        label: "Phone",
        placeholder: "+1-555-123456",
        colSpan: "col-span-12 md:col-span-6",
    },

    {
        name: "fax",
        type: "input",
        label: "Fax",
        placeholder: "+1-555-654321",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "website",
        type: "input",
        label: "Website",
        placeholder: "https://example.com",
        colSpan: "col-span-12 md:col-span-6",
    },

    // Logo
    {
        name: "logo_url",
        type: "text",
        label: "Logo URL",
        colSpan: "col-span-12 md:col-span-6",
    },

    // Business Information
    {
        name: "industry",
        type: "input",
        label: "Industry",
        placeholder: "Software",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "business_type",
        type: "select",
        label: "Business Type",
        placeholder: "Select business type",
        colSpan: "col-span-12 md:col-span-6",
        options: [
            { label: "Sole Proprietorship", value: "sole_proprietorship" },
            { label: "Partnership", value: "partnership" },
            { label: "LLC", value: "llc" },
            { label: "Corporation", value: "corporation" },
            { label: "Non-profit", value: "nonprofit" },
        ],
    },
    {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Company description",
        colSpan: "col-span-12",
    },
    {
        name: "employee_size",
        type: "select",
        label: "Employee Size",
        placeholder: "Select employee size",
        colSpan: "col-span-12 md:col-span-6",
        options: [
            { label: "1-10", value: "1-10" },
            { label: "11-50", value: "11-50" },
            { label: "51-200", value: "51-200" },
            { label: "201-500", value: "201-500" },
            { label: "501-1000", value: "501-1000" },
            { label: "1001-5000", value: "1001-5000" },
            { label: "5000+", value: "5000+" },
        ],
    },
    {
        name: "annual_revenue",
        type: "number",
        label: "Annual Revenue",
        placeholder: "0.00",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "fiscal_year_start",
        type: "input",
        label: "Fiscal Year Start",
        placeholder: "MM-DD (e.g., 01-01)",
        colSpan: "col-span-12 md:col-span-6",
    },

    // Locale / system
    {
        name: "timezone",
        type: "input",
        label: "Timezone",
        placeholder: "UTC",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "locale",
        type: "input",
        label: "Locale",
        placeholder: "en",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "currency",
        type: "input",
        label: "Currency",
        placeholder: "USD",
        colSpan: "col-span-12 md:col-span-6",
    },

    // Status & subscription
    {
        name: "status",
        type: "select",
        label: "Status *",
        placeholder: "Select status",
        colSpan: "col-span-12 md:col-span-6",
        options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Suspended", value: "suspended" },
        ],
        rules: { required: "Status is required" },
    },
    {
        name: "is_main_company",
        type: "checkbox",
        label: "Main Company",
        placeholder: "Mark as main company",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "is_active",
        type: "checkbox",
        label: "Is Active",
        placeholder: "Enable company",
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        name: "subscription_plan",
        type: "select",
        label: "Subscription Plan",
        placeholder: "Select plan",
        colSpan: "col-span-12 md:col-span-6",
        options: [
            { label: "Trial", value: "trial" },
            { label: "Basic", value: "basic" },
            { label: "Professional", value: "professional" },
            { label: "Enterprise", value: "enterprise" },
        ],
    },
    {
        name: "subscription_status",
        type: "select",
        label: "Subscription Status",
        placeholder: "Select status",
        colSpan: "col-span-12 md:col-span-6",
        options: [
            { label: "Active", value: "active" },
            { label: "Suspended", value: "suspended" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Expired", value: "expired" },
        ],
    },

    // Timestamps
    {
        name: "trial_ends_at",
        type: "datetime-local",
        label: "Trial Ends At",
        placeholder: "",
        colSpan: "col-span-12 md:col-span-6",
        inputProps: { type: "datetime-local" },
    },
    {
        name: "suspended_at",
        type: "datetime-local",
        label: "Suspended At",
        placeholder: "",
        colSpan: "col-span-12 md:col-span-6",
        inputProps: { type: "datetime-local" },
    },
    {
        name: "suspended_reason",
        type: "textarea",
        label: "Suspended Reason",
        placeholder: "Provide reason if suspended",
        colSpan: "col-span-12",
    },
];

export default fields;
