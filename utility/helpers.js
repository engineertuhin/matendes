// Single Field Validation
export const singleValidateError = (name, errors) => {
    return errors[name] && errors[name].message;
};
// Multi Field Validation
export const multipleValidateError = (name, errors, index) => {
    return errors?.list?.[index]?.[name]?.message;
};

//Server site Validation
export const handleServerValidationErrors = (error, setError) => {
    if (error?.data?.errors) {
        const errors = error.data.errors;
        Object.keys(errors).forEach((field) => {
            setError(field, {
                type: "manual",
                message: errors[field][0],
            });
        });
    }
};
//Server site Validation with toast
export const handleServerValidationErrorsToast = (error, toast) => {
    console.log(error);
    // Direct Laravel-like: error.errors
    if (error?.errors && typeof error.errors === "object") {
        const firstKey = Object.keys(error.errors)[0];
        const firstMsg = error.errors[firstKey]?.[0];
        toast.error(firstMsg || "Validation error", { duration: 4000 });
        return;
    }

    // Generic message
    const message =
        error?.data?.message ||
        error?.message ||
        error?.error ||
        "Something went wrong.";

    toast.error(message, { duration: 4000 });
};
//  from reset
export const formReset = (form) => {
    form.reset(
        Object.fromEntries(
            Object.keys(form.getValues()).map((key) => [key, ""])
        )
    );
};

// debounce
export const debounce = (fn, delay = 500) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

// Normalize select values for API submission
export const normalizeSelectValues = (obj, keys = []) => {
    const copy = { ...obj };
    keys.forEach((key) => {
        if (
            copy[key] &&
            typeof copy[key] === "object" &&
            "value" in copy[key]
        ) {
            copy[key] = copy[key].value; // keep only the id
        }
    });
    return copy;
};

// Convert nested objects to FormData
export function buildFormData(values, method = "POST") {
    const formData = new FormData();

    function appendFormData(data, parentKey = "") {
        if (data && typeof data === "object" && !(data instanceof File)) {
            Object.entries(data).forEach(([key, value]) => {
                const newKey = parentKey ? `${parentKey}[${key}]` : key;
                appendFormData(value, newKey);
            });
        } else if (data !== null && data !== undefined) {
            formData.append(parentKey, data);
        }
        formData.append("_method", method);
    }

    appendFormData(values);
    return formData;
}
