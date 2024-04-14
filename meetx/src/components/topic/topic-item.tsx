import MessageItem, { UserMessage } from "../message/message-item";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"
import { ScrollArea } from "../ui/scroll-area";

const TopicItem = () => {
    const userMessage: UserMessage = {
        username: "stelicas",
        message: "salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme",
        files: null,
        messageDate:"10/25/2022 12:56 AM",
        email: "stelian.chioveanu@yahoo.com",
        img: stelicas,
        date: "February 17, 2024",
        status: true
    }

    return (
    <div className="absolute top-0 left-0 bg-[#68738f]
    h-1/2 max-h-[50%] w-full z-[50] shadow-lg p-4">
        <ScrollArea className="w-full h-full">
            <MessageItem userMessage={userMessage} className="hover:bg-transparent"/>
        </ScrollArea>
    </div> );
}
 
export default TopicItem;