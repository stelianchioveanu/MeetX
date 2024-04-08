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

const loginFormSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message:"Invalid email!"
      })
  });

const ResetPassword = () => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          email: ""
        },
      })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values)
    }
    
    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-10 w-96 shadow-xl shadow-neutral-900">
            <div className="text-white text-4xl font-semibold font">Reset Password</div>
            <div className="text-white text-base text-center -my-4 font">Enter your email and we'll send you an link to reset your password.</div>
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
                    <Button type="submit" className="bg-purple-700 hover:bg-purple-800 font">Submit</Button>
                </form>
            </Form>
            <div className="text-white">
              <span className="text-purple-700 hover:text-purple-800 hover:cursor-pointer font">
                <Link to="/login">Back to Login</Link>
              </span>
            </div>
        </div>
    </div> );
}
 
export default ResetPassword;