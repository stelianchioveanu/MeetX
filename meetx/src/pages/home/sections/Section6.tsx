import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MapPin, Phone, Mail } from 'lucide-react';
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
 
const contactFormSchema = z.object({
    name: z
      .string({
        required_error: "Name is required"
      })
      .min(2, {
        message: "Name must be at least 2 characters",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address"
      }),
    message: z
      .string({
        required_error: "Message is required"
      })
      .min(2, {
        message: "Message must be at least 10 characters",
      })
  });

const Section6 = () => {
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
          name: "",
          email: "",
          message: ""
        },
      })

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values)
    }
    
    return (
    <div id="contact" className="w-full h-fit flex justify-center items-center flex-col p-5 box-border pt-12 pb-20 gap-3 max-w-[1500px]">
        <div className="text-white text-3xl sm:text-4xl
            md:text-5xl xl:text-6xl font-semibold mb-5">Contact Us</div>
        <div className="text-white text-lg sm:text-xl md:text-2xl font-light md:mb-3">
          Let's Start a Conversation
        </div>
        <div className="flex w-full h-fit justify-center items-center gap-8 flex-wrap gap-y-16 p-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-w-sm w-full">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name" className="bg-white text-stone-900" {...field}/>
                            </FormControl>
                            <FormMessage className="text-red-700"/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" className="bg-white text-stone-900" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700"/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormControl>
                                <Textarea placeholder="Your message" {...field} className="h-40 resize-none bg-white text-stone-900"></Textarea>
                            </FormControl>
                            <FormMessage className="text-red-700"/>
                        </FormItem>
                    )}
                    />
                    <Button className="col-span-2 text-white bg-stone-900 hover:bg-stone-950" type="submit">Submit</Button>
                </form>
            </Form>
            <div className="flex justify-center gap-4 sm:gap-7 md:gap-10 max-w-sm w-full">
              <div className="flex flex-col gap-10">
                <MapPin color="white"></MapPin>
                <Phone color="white"></Phone>
                <Mail color="white"></Mail>
              </div >
              <div className="flex flex-col gap-10">
                <div className="text-white">Bd. Unirii 53 Focsani</div>
                <div className="text-white">+40762655156</div>
                <div className="text-white">meetx@gmail.com</div>
              </div>
            </div>
        </div>
    </div>
    );
}
 
export default Section6;