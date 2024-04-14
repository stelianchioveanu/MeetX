import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { TopicInfo } from "./topic";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"
import TopicScrollItem from "./topic-scroll-item";

const GroupPage = (props: {setSelectedTopicId: (newValue: number) => void}) => {
    const topic:TopicInfo = {
        title: "Hello guy whats the problem",
        //message: "salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme",
        message: "hello",
        answers: 4,
        user: {username: "stelicas",
        email: "stelian.chioveanu@yahoo.com", date: "February 17, 2024",
        status: true, img: stelicas}
    }
    const topic1:TopicInfo = {
        title: "Hello guy whats the problem",
        message: "salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme",
        //message: "hello",
        answers: 0,
        user: {username: "stelicas",
        email: "stelian.chioveanu@yahoo.com", date: "February 17, 2024",
        status: true, img: stelicas}
    }
    return ( 
    <div className="w-[calc(100%-304px)] h-full flex flex-col p-10 gap-5">
        <div className="flex flex-col gap-2">
            <p className="text-xl font-bolt">Search Topic</p>
            <Input className="bg-transparent"/>
        </div>
        <ScrollArea className="w-full h-full">
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic} setSelectedTopicId={props.setSelectedTopicId}/>
            <TopicScrollItem topic={topic1} setSelectedTopicId={props.setSelectedTopicId}/>
        </ScrollArea>
    </div>
    );
}
 
export default GroupPage;