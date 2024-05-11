import { useAppDispatch } from "@/application/store";
import { Button } from "../ui/button";
import { setTopic } from "@/application/state-slices";
import { TopicDTO } from "../../../openapi/requests/types.gen";

const GroupTopic = (props: {topic : TopicDTO}) => {
    const dispatch = useAppDispatch();
    return (
    <Button variant="ghost" className="w-full flex justify-start text-white hover:bg-neutral-600 hover:text-white"
        onClick={() => {props.topic.id !== undefined ? dispatch(setTopic(props.topic.id)) : null;}}>
        #{props.topic.title}
    </Button> );
}
 
export default GroupTopic;