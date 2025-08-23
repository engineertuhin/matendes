import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/components/form/dynamic-form";
import { useWatch } from "react-hook-form";
import { formReset } from "@/utility/helpers";

export default function BasicModel({
    form,
    fields,
    actions,
    title,
    submitLabel,
    cancelLabel,
    size,
}) {
    const openModel = useWatch({
        control: form.control,
        name: "openModel",
    });

    return (
        <Dialog
            open={openModel}
            onOpenChange={(val) => {
                //  reset form values when closing the model
                formReset(form);
                form.setValue("openModel", val);
            }}
        >
            <DialogContent
                size={size}
                className="p-0 max-h-[85vh] flex flex-col overflow-hidden"
            >
                {/* Header (fixed) */}
                <DialogHeader className="px-6 py-4 ">
                    <DialogTitle className="text-base font-medium text-default-700">
                        {title || "Create New Item"}
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable form area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <DynamicForm
                        form={form}
                        fields={fields}
                        onSubmit={() => {
                            form.watch("id")
                                ? actions.onUpdate(form.getValues())
                                : actions.onCreate(form.getValues());
                        }}
                        submitLabel={submitLabel || "Submit"}
                        actions={null} // footer buttons below
                        gridCols="grid-cols-12"
                    />
                </div>

                {/* Footer (fixed) */}
                <DialogFooter className="px-6 py-3  flex items-center justify-end gap-3">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            {cancelLabel || "Cancel"}
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        onClick={() =>
                            form.watch("id")
                                ? actions.onUpdate(form.getValues())
                                : actions.onCreate(form.getValues())
                        }
                    >
                        {submitLabel || "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
