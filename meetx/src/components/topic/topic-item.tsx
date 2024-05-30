import { MessageDTO, TopicDTO } from "openapi/requests/types.gen";
import MessageItem from "../message/message-item";
import { ScrollArea } from "../ui/scroll-area";

const TopicItem = (props: {topic?: TopicDTO}) => {
    const message: MessageDTO = {
        id: props.topic?.id,
        text: props.topic?.description,
        createdDate: props.topic?.createdDate,
        user: props.topic?.user
    }

    return (
    <div className="absolute top-0 left-0 bg-[#68738f]
    h-fit max-h-[50%] w-full z-[50] shadow-lg p-4">
        <ScrollArea className="w-full h-full">
            <MessageItem message={message} className="hover:bg-transparent" isGroup={true}/>
        </ScrollArea>
    </div> );
}
 
export default TopicItem;