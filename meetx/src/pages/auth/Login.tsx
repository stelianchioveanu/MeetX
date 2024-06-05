import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthorizationServicePostApiAuthorizationLogin } from "../../../openapi/queries/queries";

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
import { LoginDTO } from "openapi/requests/types.gen";
import { useAppDispatch } from "@/application/store";
import { setToken } from "@/application/state-slices";
import { useAppRouter } from "@/hooks/useAppRouter";

const loginFormSchema = z.object({
    email: z.string().min(1, {
        message: "This field has to be filled.",
    }),
    password: z.string().min(1, {
        message: "This field has to be filled.",
    }),
  });

const Login = () => {
    const dispatch = useAppDispatch();
    const { redirectToHome } = useAppRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })

    const { mutate, isPending } = useAuthorizationServicePostApiAuthorizationLogin({
        onError: (error : any) => {
            form.setError('password', { type: 'custom', message: error.body?.errorMessage?.message || error.message });
        },
        onSuccess: (result : any) => {
            dispatch(setToken(result.response?.token ?? ''));
            redirectToHome();
        }
      });

    const handleSubmit = (user : { email: string, password: string }) => {
        const { email, password } = user;
        const loginData: LoginDTO = {
            email,
            password
        };
        const dataToSend = {
            requestBody: loginData
        };
        mutate(dataToSend);
    };
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold text-center">Login</div>
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
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-800 font">
                        {isPending ? <Loader2 className="animate-spin"></Loader2> :
                        "Login"}
                    </Button>
                    <Link to="/requestResetPassword" className="text-white hover:text-purple-800 hover:cursor-pointer font text-xs -mt-3 w-fit justify-self-end">Forgot password?</Link>
                </form>
            </Form>
            <div className="flex justify-center items-center w-full gap-1 -mb-4 -mt-9">
                <div className="w-full h-px bg-neutral-400 mt-1"></div>
                <span className="text-neutral-400">or</span>
                <div className="w-full h-px bg-neutral-400 mt-1"></div>
            </div>
            <a className="w-full h-fit" href="http://localhost:5000/signin-linkedin-link">
                <Button className="font w-full gap-3 bg-[#0a66c2]">
                    <Linkedin className="h-5"></Linkedin>
                    Continue with LinkedIn
                </Button>
            </a>
            <div className="text-white font">
                Not a member? 
                <span className="text-purple-700 hover:text-purple-800 hover:cursor-pointer">
                    <Link to="/register"> Sign Up now!</Link>
                </span>
            </div>
        </div>
    </div> );
}
 
export default Login;