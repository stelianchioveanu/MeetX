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
import { Linkedin, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthorizationServicePostApiAuthorizationRegister } from "../../../openapi/queries/queries"
import { RegisterDTO } from "../../../openapi/requests/types.gen"

const registerFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .refine((value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value ?? ""), 'Email is not valid!'),
    name: z
        .string()
        .min(1, { message: "This field has to be filled." }),
    password: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .refine((value) => !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(value ?? ""), 'Password is not valid!'),
    confirm: z
        .string()
        .min(1, { message: "This field has to be filled." })
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
});

const Register = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          email: "",
          password: "",
          name: "",
          confirm: ""
        },
      })

    const { mutate, isPending, isSuccess } = useAuthorizationServicePostApiAuthorizationRegister({
        onError: (error : any) => {
            form.setError(error.body?.errorMessage?.code === 'UserAlreadyExists' ? 'email' : 'confirm', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
        },
        onSuccess: (response : any) => {
            console.log(response);
        }
    });

    const handleSubmit = (user : { email: string, password: string, name: string }) => {
        const { email, name, password } = user;
        const registerData: RegisterDTO = {
            email,
            name,
            password
        };
        const dataToSend = {
            requestBody: registerData
        };
        mutate(dataToSend);
    };
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold text-center">{isSuccess ? "Success" : "Register"}</div>
            {!isSuccess ?
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Email" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Name" className="font" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Password" type="password" className="font" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input placeholder="Confirm Password" type="password" className="font" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="bg-purple-700 hover:bg-purple-800 font">
                            {isPending ? <Loader2 className="animate-spin"></Loader2> :
                            "Register"}
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-center items-center w-full gap-1 -my-4">
                    <div className="w-full h-px bg-neutral-400 mt-1"></div>
                    <span className="text-neutral-400">or</span>
                    <div className="w-full h-px bg-neutral-400 mt-1"></div>
                </div>
                <Button className="font w-full gap-3 bg-[#0a66c2]">
                    <Linkedin className="h-5"></Linkedin>
                    Continue with LinkedIn
                </Button>
                <div className="text-white font">
                    Already on MeetX? 
                    <span className="text-purple-700 hover:text-purple-800 hover:cursor-pointer">
                        <Link to="/login"> Sign In</Link>
                    </span>
                </div>
            </> : 
            <>
                <div className="text-white text-base text-center -my-4 font">Congratulations, your account has been successfully created.</div>
                <div className="text-white">
                <span className="text-purple-700 hover:text-purple-800 hover:cursor-pointer font">
                    <Link to="/login">Back to Login</Link>
                </span>
                </div>
            </>}
        </div>
    </div> );
}
 
export default Register;