import { useAppSelector } from "@/application/store";
import ConnectionStatus from "@/signalRConnection/connection-status";
import { UsersRound } from "lucide-react";
import { ChevronRight } from 'lucide-react';
import { PrivateConversationDTO, TopicDTO } from "openapi/requests/types.gen";

const ChatTopBar = (props: {topic?: TopicDTO, conv?: PrivateConversationDTO, setUsersOpened: any, usersOpened: boolean, topicOpened: boolean, setTopicOpened: any, isGroup: boolean}) => {
    const { userId } = useAppSelector(x => x.profileReducer);

    const handleOnClickGroup = () => {
        props.setUsersOpened(!props.usersOpened);
    }

    const handleOnClickArrow = () => {
        props.setTopicOpened(!props.topicOpened);
    }

    return (
    <div className="w-full max-h-12 shadow-lg flex items-center py-3
    px-6 text-white justify-between">
        {
            props.isGroup ?
                props.topic?.title :
                props.conv?.user1?.id !== userId ? props.conv?.user1?.name : props.conv?.user2?.name
        }
        <div className="flex items-center gap-1">
            <ConnectionStatus/>
            {
                props.isGroup ?
                <>
                    <ChevronRight className={props.topicOpened ?
                    "w-6 h-6 ml-auto rotate-90 transition-rotate duration-75" :
                    "w-6 h-6 ml-auto transition-rotate duration-75"}
                    onClick={handleOnClickArrow}/>
                    <UsersRound className="w-6 h-6" onClick={handleOnClickGroup}/>
                </> :
                null
            }
        </div>
    </div>);
}
 
export default ChatTopBar;