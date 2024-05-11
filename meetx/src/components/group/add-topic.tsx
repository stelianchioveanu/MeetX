import { Check, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TopicAddDTO } from "../../../openapi/requests/types.gen";
import { useTopicServicePostApiTopicAddTopic } from "../../../openapi/queries/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetTopicsKey } from "../../../openapi/queries/common";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppSelector } from "@/application/store";
 
const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Name must be at least 1 character!"})
        .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!'),
    description: z
        .string()
        .min(1, { message: "Name must be at least 1 character!"})
        .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!'),
})

const AddTopic = () => {
    const queryClient = useQueryClient();
    const {refresh} = useRefreshToken();
    const [clicked, setClicked] = useState(false);
    const [success, setSuccess] = useState(false);
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    });

    const { mutate, isPending } = useTopicServicePostApiTopicAddTopic({
        onError: (error : any) => {
            if (error.message !== "Unauthorized") {
                form.setError('title', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
            }
            setClicked(false);
        },
        onSuccess: () => {
            setClicked(true);
            setSuccess(true);
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey]});
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetTopicsKey]});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Add group failed! Please try again later!");
                return false;
            }
            if (error.message === "Unauthorized") {
                refresh();
                return true;
            }
            return false;
        },
      });

    const handleSubmit = (topic : { title: string, description: string }) => {
        const { title, description } = topic;
        const addTopicData: TopicAddDTO = {
            groupId: selectedGroupId ? selectedGroupId : undefined,
            title,
            description,
        };
        const dataToSend = {
            requestBody: addTopicData
        };
        mutate(dataToSend);
    };

    return (
        <Dialog onOpenChange={() => {setClicked(false); setSuccess(false); form.reset();}}>
            <DialogTrigger asChild>
                <Button className="w-3/4
                    dark:bg-neutral-900 dark:text-white
                    bg-neutral-100 text-neutral-900
                    dark:hover:bg-neutral-100 dark:hover:text-neutral-900
                    hover:bg-neutral-900 hover:text-white">
                    Add Topic
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Add new Topic</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Topic Title" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Description" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <Button type="submit" size="sm" disabled={clicked ? true : false} className={success ? "px-3 bg-green-500 hover:bg-green-500" : "px-3"}>
                            {isPending ? <Loader2 className="animate-spin h-4 w-4"></Loader2> :
                            success ? <Check className="h-4 w-4"/> :
                            "Add new Topic"}
                        </Button>
                    </form>
                </Form>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddTopic;