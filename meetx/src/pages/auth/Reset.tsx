import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useSearchParams } from "react-router-dom"
import { ResetPasswordDTO } from "../../../openapi/requests/types.gen"
import { useAuthorizationServicePostApiAuthorizationResetPassword } from "../../../openapi/queries/queries"
import { Loader2 } from "lucide-react"

const loginFormSchema = z.object({
    password: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .refine((value) => !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(value ?? ""), 'Password is not valid!'),
    confirm: z
        .string()
        .min(1, { message: "This field has to be filled." })
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
});

const Reset = () => {
    const [queryParameters] = useSearchParams();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          password: "",
          confirm: ""
        },
      })

    const { mutate, isPending, isSuccess } = useAuthorizationServicePostApiAuthorizationResetPassword({
        onError: (error : any) => {
            form.setError('confirm', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
        },
        onSuccess: (response : any) => {
            console.log(response);
        }
    });

    const handleSubmit = (reset : { password: string }) => {
        const { password } = reset;
        const token = queryParameters.get("token");
        const id = queryParameters.get("id") || undefined;
        console.log(token);
        const resetData: ResetPasswordDTO = {
            token, 
            id,
            password
        };
        const dataToSend = {
            requestBody: resetData
        };
        mutate(dataToSend);
    };
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold font text-center">{isSuccess ? "Password Changed!" : "Reset Password"}</div>
            {isSuccess ? <div className="text-white text-base text-center -my-4 font">Your password has been changed successfully!</div> : null}
            {!isSuccess ? <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <Input maxLength={255} placeholder="New Password" type="password" className="font" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <Input maxLength={255} placeholder="Confirm Password" type="password" className="font" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-800 font">
                        {isPending ? <Loader2 className="animate-spin"></Loader2> :
                        "Submit"}
                    </Button>
                </form>
            </Form> : null}
            <div className="text-white">
              <span className="text-purple-700 hover:text-purple-800 hover:cursor-pointer font">
                <Link to="/login">Back to Login</Link>
              </span>
            </div>
        </div>
    </div> );
}
 
export default Reset;