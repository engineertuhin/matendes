export const commonSearchTemplate = (res) => {
    return res.map((data) => ({
        label: data.name + " (" + data.code + ")",
        value: data.id,
    }));
};
export const companySearchTemplate = (res) => {
    return res.map((company) => ({
        label: company.name + " (" + company.code + ")",
        value: company.id,
    }));
};
export const branchSearchTemplate = (res) => {
    return res.map((branch) => ({
        label: branch.name + " (" + branch.code + ")",
        value: branch.id,
    }));
};

export const departmentSearchTemplate = (res) => {
    return res.map((data) => ({
        label: data.name + " (" + data.code + ")",
        value: data.id,
    }));
};

export const jobPositionsTemplate = (res) => {
    return res.map((data) => ({
        label: data.title + " (" + data.code + ")",
        value: data.id,
    }));
};
