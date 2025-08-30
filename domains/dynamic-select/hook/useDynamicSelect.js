import { useState, useCallback, useMemo } from "react";
import { debounce } from "@/utility/helpers";
import { useDynamicSelectSearchQuery } from "../services/dynamicSelectApi";
import * as templateHelper from "@/utility/templateHelper";

export const useDynamicSelect = (
    defaultTemplate = "commonSearchTemplate",
    debounceDelay = 500,
    loadOptions = []
) => {
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState("");

    const [urlValue, dataKey, transformer = defaultTemplate] = loadOptions;

    const { data: dynamicSearch, isLoading } = useDynamicSelectSearchQuery(
        { data: { search, url } },
        { skip: !search || !url }
    );

    const transformResults = useCallback(
        (results) => {
            const fn = templateHelper[transformer];
            return typeof fn === "function" ? fn(results) : results;
        },
        [transformer]
    );

    const transformed = useMemo(() => {
        const results = dynamicSearch?.data?.[dataKey] ?? [];
        return transformResults(results);
    }, [dynamicSearch, dataKey, transformResults]);

    // Debounced search: only updates state when user types
    const onSearch = useMemo(
        () =>
            debounce((inputValue, callback) => {
                setSearch(inputValue); // safe: only on user typing
                setUrl(urlValue);
                callback(transformed); // return current transformed options
            }, debounceDelay),
        [urlValue, transformed, debounceDelay]
    );

    const onLoadData = useCallback(() => {
        setSearch(" ");
        setUrl(urlValue);
        return transformed;
    }, [transformed]);

    return {
        actions: { onSearch, onLoadData },
        isLoading,
        transformed,
    };
};
