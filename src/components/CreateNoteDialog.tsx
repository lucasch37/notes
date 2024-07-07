"use client";

import { Loader2, Plus } from "lucide-react";
import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { formSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNote } from "@/actions/createNote";
import { useToast } from "./ui/use-toast";

type Props = {};

const CreateNoteDialog = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        await createNote(values);
        setIsLoading(false);
        toast({
            title: "Successfully created note!",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus height={20} width={20} className="mr-1" />
                    Create New
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Create New Note</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4 flex gap-2">
                            <DialogClose>
                                <Button type="reset" variant={"secondary"}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}{" "}
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNoteDialog;
