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
import { Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

const registerFormSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      }),
    password: z
      .string({
        required_error: "Message is required"
      })
  });

const Register = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        console.log(values)
    }
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold">Register</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 w-full">
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
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-800 font">Register</Button>
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
        </div>
    </div> );
}
 
export default Register;