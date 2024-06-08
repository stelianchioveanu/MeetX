import { MessageDTO, TopicDTO } from "openapi/requests/types.gen";
import MessageItem from "../message/message-item";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const TopicItem = (props: {topic?: TopicDTO, isFetching: boolean}) => {
    const message: MessageDTO = {
        id: props.topic?.id,
        text: props.topic?.description,
        createdDate: props.topic?.createdDate,
        user: props.topic?.user,
        topicId: props.topic?.id,
        files: props.topic?.files
    }

    return (
    <div className="absolute top-0 left-0 bg-[rgb(189,195,211)] dark:bg-[#68738f]
    h-[40%] w-full z-[48] shadow-lg p-4">
        <ScrollArea className="w-full h-full">
            <ScrollBar orientation="vertical" className="flex"></ScrollBar>
            {
                props.isFetching ?
                <div className="flex gap-2">
                    <Skeleton className="w-10 h-10 rounded-full"/>
                    <Skeleton className="h-10 grow max-w-44"/>
                </div> :
                <MessageItem message={message} isTopic={true} topic={props.topic?.title} className="hover:bg-transparent" isGroup={true}/>
            }
        </ScrollArea>
    </div> );
}
 
export default TopicItem;