import { Check, X } from "lucide-react";
import Topic from "./topic";
import { useAppDispatch } from "@/application/store";
import { setTopic } from "@/application/state-slices";
import { TopicDTO } from "openapi/requests/types.gen";

const TopicScrollItem = (props: {topic: TopicDTO}) => {
    const dispatch = useAppDispatch();
    return (
    <div className="w-full h-fit flex rounded-md gap-3 p-2 items-start hover:bg-[#00000050] hover:cursor-pointer"
    onClick={() => {dispatch(setTopic("1"))}}>
        {
            props.topic.numberAnswers !== 0 ?
            <p className="bg-green-500 p-1 rounded-md flex min-w-fit">
                <Check/> {props.topic.numberAnswers} answers
            </p> :
            <p className="bg-red-500 p-1 rounded-md flex min-w-fit">
                <X/> {props.topic.numberAnswers} answers
            </p>
        }
        <Topic topic={props.topic}/>
    </div>
    );
}
 
export default TopicScrollItem;