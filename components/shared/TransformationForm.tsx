/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    // FormControl,
    // FormDescription,
    // FormField,
    // FormItem,
    // FormLabel,
    // FormMessage,
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
import { Button } from "../ui/button";

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
    config = null,
}: TransformationFormProps) => {
    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data);
    const [newTransfomation, setNewTransfomation] =
        useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config);
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
    const onInputChangeHandler = (
        feildName: string,
        value: string,
        type: string,
        onChangeField: (value: string) => void
    ) => {};
    const onTransformHandler = () => {};
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
                {(type === "remove" || type === "recolor") && (
                    <div className="prompt-field">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel={
                                type === "remove"
                                    ? "Object to remove"
                                    : "Obect to recolor"
                            }
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    className="input-field"
                                    onChange={(e) =>
                                        onInputChangeHandler(
                                            "prompt",
                                            e.target.value,
                                            type,
                                            field.onChange
                                        )
                                    }
                                />
                            )}
                        />
                        {type === "recolor" && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel="Replacement Color"
                                className=" w-full"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        className="input-field"
                                        onChange={(e) =>
                                            onInputChangeHandler(
                                                "color",
                                                e.target.value,
                                                "recolor",
                                                field.onChange
                                            )
                                        }
                                    />
                                )}
                            />
                        )}
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        className="submit-button capitalize"
                        disabled={isTransforming || newTransfomation === null}
                        onClick={onTransformHandler}
                    >
                        {isTransforming
                            ? "Transforming.."
                            : "Apply transformation"}
                    </Button>
                    <Button
                        type="submit"
                        className="submit-button capitalize"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting.. " : "Save Image"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TransformationForm;
