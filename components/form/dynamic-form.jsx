"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AsyncSelect from "react-select/async";

import Select from "react-select";

/**
 * FieldConfig (JS docs):
 * {
 *   name: string,
 *   type: "input" | "password" | "email" | "number" | "select" | "textarea" | "checkbox" | "radio" | "date",
 *   label?: string,
 *   placeholder?: string,
 *   description?: string,
 *   colSpan?: string,            // e.g. "col-span-12 md:col-span-6"
 *   disabled?: boolean,
 *   rules?: object,              // RHF rules (required, minLength, etc.)
 *   options?: {label, value}[],  // for select/radio
 *   inputProps?: object          // extra props for inputs/textarea
 * }
 */

function FieldRenderer({ fieldConfig, form }) {
    const {
        name,
        label,
        placeholder,
        description,
        type,
        options,
        loadOptions,
        disabled,
        rules,
        inputProps,
        getOptLabel = (opt) => opt.label,
        getOptValue = (opt) => opt.value,
        menuPlacement = "auto",
        handleChange,
        optionValue,
    } = fieldConfig;

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    return (
        <FormField
            control={form.control}
            name={name}
            rules={rules}
            render={({ field }) => {
                const showError = !!form.formState.errors?.[name];
                const baseInputClass = cn("", {
                    "border-destructive focus:border-destructive": showError,
                });

                // number coercion for RHF
                const numberOnChange =
                    type === "number"
                        ? (e) => {
                              const raw = e.target.value;
                              const parsed =
                                  raw === "" ? undefined : Number(raw);
                              field.onChange(
                                  Number.isNaN(parsed) ? undefined : parsed
                              );
                          }
                        : undefined;

                return (
                    <FormItem>
                        {label ? (
                            <FormLabel className="mb-2">{label}</FormLabel>
                        ) : null}
                        <FormControl>
                            {type === "textarea" ? (
                                <Textarea
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    {...field}
                                    {...(inputProps || {})}
                                    className={cn(
                                        baseInputClass,
                                        inputProps?.className
                                    )}
                                />
                            ) : type === "select" ? (
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    value={options.find(
                                        (opt) =>
                                            opt[optionValue ?? "value"] ===
                                            field.value
                                    )}
                                    styles={styles}
                                    name="clear"
                                    menuPlacement={menuPlacement}
                                    options={options || []}
                                    isDisabled={!!disabled}
                                    getOptionLabel={getOptLabel}
                                    getOptionValue={getOptValue}
                                    id
                                    isClearable
                                    onChange={(selectedOption) => {
                                        field.onChange(
                                            handleChange
                                                ? handleChange(selectedOption)
                                                : selectedOption?.[
                                                      optionValue ?? "value"
                                                  ]
                                        ); // if using react-hook-form controller
                                    }}
                                />
                            ) : type === "checkbox" ? (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={!!field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={disabled}
                                        id={`${name}-checkbox`}
                                    />
                                    {placeholder ? (
                                        <label
                                            htmlFor={`${name}-checkbox`}
                                            className="text-sm text-muted-foreground cursor-pointer"
                                        >
                                            {placeholder}
                                        </label>
                                    ) : null}
                                </div>
                            ) : type === "file" ? (
                                <Input
                                    type="file"
                                    disabled={disabled}
                                    {...(inputProps || {})}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            ) : type === "radio" ? (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                    className="flex flex-wrap gap-4"
                                >
                                    {(options || []).map((opt) => (
                                        <div
                                            key={opt.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                id={`${name}-${opt.value}`}
                                                value={opt.value}
                                            />
                                            <label
                                                htmlFor={`${name}-${opt.value}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : type == "async-select" ? (
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    value={field.value}
                                    defaultOptions
                                    onChange={(val) => field.onChange(val)} // update RHF
                                />
                            ) : (
                                <Input
                                    type={
                                        type === "password"
                                            ? "password"
                                            : type === "email"
                                            ? "email"
                                            : type === "date"
                                            ? "date"
                                            : type === "number"
                                            ? "text" // keep text to allow empty string; we coerce manually
                                            : "text"
                                    }
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    {...field}
                                    {...(inputProps || {})}
                                    onChange={numberOnChange || field.onChange}
                                    className={cn(
                                        baseInputClass,
                                        inputProps?.className
                                    )}
                                    inputMode={
                                        type === "number"
                                            ? "numeric"
                                            : inputProps?.inputMode
                                    }
                                    pattern={
                                        type === "number"
                                            ? "[0-9]*"
                                            : inputProps?.pattern
                                    }
                                />
                            )}
                        </FormControl>
                        {description ? (
                            <FormDescription>{description}</FormDescription>
                        ) : null}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}

export function DynamicForm({
    form,
    fields,
    onSubmit,
    className,
    submitLabel = "Submit",
    actions,
    gridCols = "grid-cols-12",
}) {
    const fieldDefs =
        typeof fields === "function"
            ? fields()
            : Array.isArray(fields)
            ? fields
            : [];
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-6", className)}
            >
                <div className={cn("grid gap-6", gridCols)}>
                    {fieldDefs.map((f) => (
                        <div
                            key={f.name}
                            className={cn(f.colSpan || "col-span-12")}
                        >
                            <FieldRenderer fieldConfig={f} form={form} />
                        </div>
                    ))}
                </div>

                {/* <div className="flex items-center justify-end gap-3">
          {actions}
          <Button type="submit">{submitLabel}</Button>
        </div> */}
            </form>
        </Form>
    );
}
