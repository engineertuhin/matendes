import AsyncSelect from "react-select/async";
import { useDynamicSelect } from "@/domains/dynamic-select/hook/useDynamicSelect";
export default function DynamicAsyncSelect({ loadOptions = [], field,form, handleChange = false }) {
    const {
        actions: { onSearch, onLoadData },
        isLoading,
        transformed, 
    } = useDynamicSelect(
        "commonSearchTemplate", 
       500,
    loadOptions,
    form,
        
    );
    
    const child = loadOptions[4]?loadOptions[4]:null;
    
    return (
        <AsyncSelect
          
            loadOptions={(i, c) => {
                return onSearch(i, c);
            }}
            value={field.value}
            onMenuOpen={() => {
               onLoadData();
            }}
            defaultOptions={transformed}
            onChange={(val) =>{
                if (Array.isArray(child)) {
                    child.forEach((item) => {
                        form.setValue(item, null); // reset each child
                    });
                }
                handleChange ? handleChange(val,form,field) :field.onChange(val)
            
            }}
            isLoading={isLoading}
        />
    );
}
