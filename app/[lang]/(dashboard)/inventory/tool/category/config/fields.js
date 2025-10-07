const fields = () => {
    return [
        {
            name: "name",
            type: "input",
            label: "Category Name *",
            placeholder: "Enter category name",
            colSpan: "col-span-12 md:col-span-6",
            rules: {
                required: "Category name is required",
                maxLength: { value: 150, message: "Max 150 characters" },
            },
            inputProps: { maxLength: 150 },
        },
    ];
};

export default fields;
