"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    aspectRatioOptions,
    defaultValues,
    transformationTypes,
} from "@/constants";
import { CustomField } from "./CustomFields";
import { useState } from "react";
import { AspectRatioKey } from "@/lib/utils";

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
});

const TransformationForm = ({
    action,
    data = null,
    userId,
    type,
    creditBalance,
}: TransformationFormProps) => {
    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data);
    const [newTransfomation, setNewTransfomation] =
        useState<Transformations | null>(null);
    const initialValues =
        data && action === "Update"
            ? {
                  title: data?.aspectRatio,
                  aspectRatio: data?.title,
                  color: data?.color,
                  prompt: data?.prompt,
                  publicId: data?.publicId,
              }
            : defaultValues;
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    const onSelectFieldHandler = (
        value: string,
        onChangeField: (value: string) => void
    ) => {};
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => (
                        <Input {...field} className="input-feild" />
                    )}
                />
                {type === "fill" && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel="Aspect Ratio"
                        className="w-full"
                        render={({ field }) => (
                            <Select
                                onValueChange={(value) =>
                                    onSelectFieldHandler(value, field.onChange)
                                }
                            >
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map(
                                        (key) => (
                                            <SelectItem
                                                key={key}
                                                value={key}
                                                className="select-item"
                                            >
                                                {
                                                    aspectRatioOptions[
                                                        key as AspectRatioKey
                                                    ].label
                                                }
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}
            </form>
        </Form>
    );
};

export default TransformationForm;
