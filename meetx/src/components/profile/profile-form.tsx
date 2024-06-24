import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useUserServicePutApiUserUpdate } from "../../../openapi/queries/queries"
import { useQueryClient } from "@tanstack/react-query"
import { useUserServiceGetApiUserGetMeKey } from "../../../openapi/queries/common"
import { toast } from "react-toastify"
import { ErrorCodes, RequestResponse } from "../../../openapi/requests/types.gen"
import { ApiError } from "../../../openapi/requests/core/ApiError"
import { Skeleton } from "../ui/skeleton"
import { LogoutButtonAlert } from "./logout-button-alert"
import { useAppDispatch } from "@/application/store"
import { setGroup, setTopic } from "@/application/state-slices"

const loginFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters!"})
        .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!'),
    password: z
        .string()
        .refine((value) => !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(value ?? "") || value === "", 'Password must include at least 8 characters, a lowercase letter, an uppercase letter, a number, and a special character!'),
    confPassword: z
        .string(),
    email: z.string(),
    position: z.string().min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords don't match",
    path: ["confPassword"],
});

const ProfileForm = (props :  {position: string, name: string, email: string, image: string | null, imageChanged: boolean, imageRemoved: boolean, isFetching: boolean, isLoading: boolean}) => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          name: props.name || "",
          password: "",
          confPassword: "",
          email: props.email || "",
          position: props.position || ""
        },
    })

    const { mutate } = useUserServicePutApiUserUpdate({
        onError: (error : ApiError) => {
            const body: RequestResponse = error.body as RequestResponse;
            if (body.errorMessage?.code === "NotAMember" || body.errorMessage?.code === "GroupNotFound" || body.errorMessage?.code === "ConvNotFound") {
                dispatch(setGroup("0"));
                return;
            }
            if (body.errorMessage?.code === "TopicNotFound") {
                dispatch(setTopic("0"));
                return;
            }

            if (body.errorMessage?.code === "WrongName") {
                form.setError("name", { type: 'custom', message: body.errorMessage.message === null || undefined
                ? error.message : body.errorMessage.message});
            } else if (body.errorMessage?.code === "WrongPassword") {
                form.setError("password", { type: 'custom', message: body.errorMessage.message === null || undefined
                ? error.message : body.errorMessage.message});
            } else {
                form.setError("confPassword", { type: 'custom', message: body?.errorMessage?.message === null || undefined
                ? error.message : body?.errorMessage?.message});
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetMeKey]});
            toast.success("Profile updated successfully");
        }
    });

    function dataURItoFile(dataURI: string) {
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var byteString = atob(dataURI.split(',')[1]);
        
        var byteArray = [];
        for (var i = 0; i < byteString.length; i++) {
            byteArray.push(byteString.charCodeAt(i));
        }
        
        var blob = new Blob([new Uint8Array(byteArray)], { type: mimeString });
    
        var ext = mimeString.split('/')[1];
        if (!ext) {
            toast.error("Extract extension failed!");
            return undefined;
        }
        var filename = "avatar" + "." + ext;
        var file = new File([blob], filename, { type: mimeString });
        
        return file;
    }

    const handleSubmit = (user : { name: string, password: string, email: string, confPassword: string }) => {
        const avatar = props.image === null ? undefined : !props.imageChanged ? undefined : dataURItoFile(props.image);
        const data = {
            Avatar: avatar,
            Name: user.name ? user.name : "",
            Password: user.password ? user.password : "",
            AvatarRemoved: props.imageRemoved
        };
        mutate({formData: data})
    };

    useEffect(() => {
        form.setValue("name", props.name);
        form.setValue("email", props.email);
        form.setValue("position", props.position);
    }, [props.name, props.email, props.position, form]);

    return ( <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-[80%] max-w-xl">
            {
                props.isLoading ?
                <Skeleton className="w-full h-10"/> :
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" className="font bg-transparent text-white border-white" {...field} readOnly/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            }
            {
                props.isLoading ?
                <Skeleton className="w-full h-10"/> :
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                            <Input maxLength={255} placeholder="Name" className="font bg-transparent text-white border-white" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            }
            {
                props.isLoading ?
                <Skeleton className="w-full h-10"/> :
                <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel className="text-white">Position</FormLabel>
                        <FormControl>
                            <Input maxLength={255} placeholder="Position" className="font bg-transparent text-white border-white" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            }
            {
                props.isLoading ?
                <Skeleton className="w-full h-10"/> :
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormControl>
                            <Input maxLength={255} placeholder="New Password" type="password" className="font bg-transparent text-white border-white" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            }
            {
                props.isLoading ?
                <Skeleton className="w-full h-10"/> :
                <FormField
                control={form.control}
                name="confPassword"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormControl>
                            <Input placeholder="Confirm Password" type="password" className="font bg-transparent text-white border-white" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            }
            {
                props.isLoading ?
                null :
                <>
                    <Button type="submit" className="bg-neutral-100 text-neutral-900
                    hover:bg-neutral-600 hover:text-neutral-100">
                        {props.isFetching ? <Loader2 className="animate-spin"></Loader2> :
                        "Save"}
                    </Button>
                    <LogoutButtonAlert/>
                </>
            }
        </form>
    </Form> );
}
 
export default ProfileForm;