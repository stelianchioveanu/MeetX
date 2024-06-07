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
import { Link, useSearchParams } from "react-router-dom"
import { useAuthorizationServicePostApiAuthorizationRegister } from "../../../openapi/queries/queries"
import { RegisterDTO } from "../../../openapi/requests/types.gen"
import { SelectIndustry } from "@/components/select-register/select-industry"
import { useEffect, useState } from "react"
import { NIL } from "uuid"
import Connector from '../../signalRConnection/signalr-connection';

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
        .min(1, { message: "This field has to be filled." }),
    industry: z.string().min(1, { message: "This field has to be filled." })
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
});

const Register = () => {
    const [groupId, setGroupId] = useState<string>(NIL);
    const [queryParameters] = useSearchParams();
    const connector = Connector();
    
    useEffect(() => {
        connector.stopConnection();
    }, [])

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          email: "",
          password: "",
          name: "",
          confirm: "",
          industry: ""
        },
    })

    const setGroup = (groupId: string) => {
        setGroupId(groupId);
        form.setValue('industry', groupId, {shouldValidate: true});
    }

    const { mutate, isPending, isSuccess } = useAuthorizationServicePostApiAuthorizationRegister({
        onError: (error : any) => {
            form.setError(error.body?.errorMessage?.code === 'UserAlreadyExists' ? 'email' : 'industry', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
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
            password,
            groupId
        };
        const dataToSend = {
            requestBody: registerData
        };
        mutate(dataToSend);
    };

    useEffect(() => {
        const nameParam = queryParameters.get("name");
        const emailParam = queryParameters.get("email");
        form.setValue("name", nameParam ? nameParam : "");
        form.setValue("email", emailParam ? emailParam : "");
    }, [])
    
    return (
    <div className="w-full h-fit min-h-full bg flex justify-center items-center bg-auth py-10">
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
                                    <Input maxLength={255} placeholder="Email" className="font bg-white text-black" {...field}/>
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
                                    <Input maxLength={255} placeholder="Name" className="font bg-white text-black" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="industry"
                        render={() => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <SelectIndustry groupId={groupId} setGroupId={setGroup}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input maxLength={255} placeholder="Password" type="password" className="font bg-white text-black" {...field} />
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
                                    <Input maxLength={255} placeholder="Confirm Password" type="password" className="font bg-white text-black" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white font">
                            {isPending ? <Loader2 className="animate-spin text-white"></Loader2> :
                            "Register"}
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-center items-center w-full gap-1 -my-4">
                    <div className="w-full h-px bg-neutral-400 mt-1"></div>
                    <span className="text-neutral-400">or</span>
                    <div className="w-full h-px bg-neutral-400 mt-1"></div>
                </div>
                <a className="w-full h-fit" href="http://localhost:5000/signup-linkedin-link">
                    <Button className="font w-full gap-3 bg-[#0a5dc2] hover:bg-[rgb(30,112,214)] text-white">
                        <Linkedin className="h-5 text-white"></Linkedin>
                        Continue with LinkedIn
                    </Button>
                </a>
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