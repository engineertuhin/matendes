import AsyncSelect from "react-select/async";
import { useDynamicSelect } from "@/domains/dynamic-select/hook/useDynamicSelect";
export default function DynamicAsyncSelect({ loadOptions = [], field }) {
    const {
        actions: { onSearch, onLoadData },
        isLoading,
        transformed,
    } = useDynamicSelect(
        "commonSearchTemplate", 
       500,
loadOptions,
        
    );
    return (
        <AsyncSelect
            cacheOptions
            loadOptions={(i, c) => {
                return onSearch(i, c);
            }}
            value={field.value}
            onMenuOpen={() => {
               onLoadData();
            }}
            defaultOptions={transformed}
            onChange={(val) => field.onChange(val)}
            isLoading={isLoading}
        />
    );
}
