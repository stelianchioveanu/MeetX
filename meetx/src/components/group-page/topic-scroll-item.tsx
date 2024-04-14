import { Check, X } from "lucide-react";
import Topic, { TopicInfo } from "./topic";

const TopicScrollItem = (props: {topic: TopicInfo, setSelectedTopicId: (newValue: number) => void}) => {
    return (
    <div className="w-full h-fit flex rounded-md gap-3 p-2 items-start hover:bg-[#00000050] hover:cursor-pointer"
    onClick={() => {props.setSelectedTopicId(1)}}>
        {
            props.topic.answers !== 0 ?
            <p className="bg-green-500 p-1 rounded-md flex min-w-fit">
                <Check/> {props.topic.answers} answers
            </p> :
            <p className="bg-red-500 p-1 rounded-md flex min-w-fit">
                <X/> {props.topic.answers} answers
            </p>
        }
        <Topic topic={props.topic}/>
    </div>
    );
}
 
export default TopicScrollItem;