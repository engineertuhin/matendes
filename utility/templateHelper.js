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
export const projectTemplate = (res) => {
    return res.map((project) => ({
        label: project.name,
        value: project.id,
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
export const employTemplate = (res) => { 
    
    return res.map((data) => ({
        label: `${data?.personal_info?.first_name ?? data.first_name} ${
            data?.personal_info?.last_name ?? data.last_name
        } (${data?.contact_info?.work_email ?? ""})`,
        value: data.id,
    }));
};

export const documentTypeTemplate = (res) => {
    return res.map((data) => ({
        label: data.name,
        value: data.id,
    }));
};

export const roleTemplate = (res) => {
    return res.map((data) => ({
        label: data.display_name,
        value: data.id,
    }));
};

// templates/clientTemplate.js
export const clientTemplate = (res) => {
    return res.map((client) => ({
        label: client.name + " (" + client.email + ")",
        value: client.id,
    })); // what is stored in form
};

// templates/categoryTemplate.js
export const categorySearchTemplate = (res) => {
    return res.map((category) => ({
        label: category.name,
        value: category.id,
    })); // what is stored in form
};

// templates/unitTemplate.js
export const unitSearchTemplate = (res) => {
    return res.map((unit) => ({
        label: unit.name,
        value: unit.id,
    })); // what is stored in form
};
