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
import { GroupAddDTO } from "../../../openapi/requests/types.gen";
import { useGroupServicePostApiGroupAddGroup } from "../../../openapi/queries/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { toast } from "react-toastify";
import { useState } from "react";
 
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters!"})
    .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!')
})

const AddGroup = () => {
    const queryClient = useQueryClient();
    const {refresh} = useRefreshToken();
    const [clicked, setClicked] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { mutate, isPending } = useGroupServicePostApiGroupAddGroup({
        onError: (error : any) => {
            if (error.message !== "Unauthorized") {
                form.setError('name', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
            }
            setClicked(false);
        },
        onSuccess: () => {
            setClicked(true);
            setSuccess(true);
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
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

    const handleSubmit = (group : { name: string }) => {
        const { name } = group;
        const addGroupData: GroupAddDTO = {
            name
        };
        const dataToSend = {
            requestBody: addGroupData
        };
        mutate(dataToSend);
    };

    return (
        <Dialog onOpenChange={() => {setClicked(false); setSuccess(false); form.reset();}}>
            <DialogTrigger asChild>
                <button className="group flex items-center relative">
                    <div className="group flex h-11 w-11 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
                        <div className={`h-full w-full grid place-content-center text-white bg-[rgb(39,45,61)] group-hover:bg-lime-600 transition-all`}>
                            <Plus className="text-lime-600 group-hover:text-[rgb(39,45,61)] w-full h-full transition-all"/>
                        </div>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Add new Group</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Group Name" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <Button type="submit" size="sm" disabled={clicked ? true : false} className={success ? "px-3 bg-green-500 hover:bg-green-500" : "px-3"}>
                            {isPending ? <Loader2 className="animate-spin h-4 w-4"></Loader2> :
                            success ? <Check className="h-4 w-4"/> :
                            "Add new group"}
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
 
export default AddGroup;