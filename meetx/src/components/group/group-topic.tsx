import { Button } from "../ui/button";

const GroupTopic = (props: {setSelectedTopicId: any}) => {
    const topic = 1;
    return (
    <Button variant="ghost" className="w-full flex justify-start text-white hover:bg-neutral-600 hover:text-white"
    onClick={() => {props.setSelectedTopicId(topic)}}>
        # Topic 1
    </Button> );
}
 
export default GroupTopic;