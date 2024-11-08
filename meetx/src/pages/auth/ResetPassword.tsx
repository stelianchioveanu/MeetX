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
import { Link } from "react-router-dom"
import { RequestResetDTO, RequestResponse } from "../../../openapi/requests/types.gen"
import { useAuthorizationServicePostApiAuthorizationRequestReset } from "../../../openapi/queries/queries"
import { Loader2 } from "lucide-react"
import Connector from '../../signalRConnection/signalr-connection';
import { useEffect } from "react"
import { ApiError } from "../../../openapi/requests/core/ApiError"

const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .refine((value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value ?? ""), 'Email is not valid!'),
});

const ResetPassword = () => {
    const connector = Connector();
    
    useEffect(() => {
        connector.stopConnection();
    }, [])

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          email: ""
        },
      })

    const { mutate, isPending, isSuccess } = useAuthorizationServicePostApiAuthorizationRequestReset({
        onError: (error : ApiError) => {
            const body: RequestResponse = error.body as RequestResponse;
            form.setError('email', { type: 'custom', message: body.errorMessage?.message || error.message });
        },
        onSuccess: (response : any) => {
            console.log(response);
        }
    });

    const handleSubmit = (user : { email: string }) => {
        const { email} = user;
        const resetData: RequestResetDTO = {
            email
        };
        const dataToSend = {
            requestBody: resetData
        };
        mutate(dataToSend);
    };
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold font text-center">{isSuccess ? "Email sent" : "Reset Password"}</div>
            <div className="text-white text-base text-center -my-4 font">{isSuccess ? <>A link to reset your password has been sent to you on <span className=" text-purple-400">{form.getValues("email")}</span></> : "Enter your email and we'll send you a link to reset your password."}</div>
            {!isSuccess ? <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <Input placeholder="Email" className="font bg-white text-black" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white font">
                        {isPending ? <Loader2 className="animate-spin text-white"></Loader2> :
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
 
export default ResetPassword;