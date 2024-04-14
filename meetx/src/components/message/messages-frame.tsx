import MessageItem, { UserMessage } from "./message-item";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"
import { ScrollArea } from "@/components/ui/scroll-area"

const MessagesFrame = () => {
    const userMessage: UserMessage = {
        username: "stelicas",
        message: "salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme",
        files: null,
        messageDate:"10/25/2022 12:56 AM",
        email: "stelian.chioveanu@yahoo.com",
        img: stelicas,
        date: "February 17, 2024",
        status: true
    }
    
        return ( 
        <ScrollArea className="w-full h-fit">
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
            <MessageItem userMessage={userMessage}/>
        </ScrollArea>
     );
}
 
export default MessagesFrame;