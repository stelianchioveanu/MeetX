import { useAppSelector } from "@/application/store";
import ConnectionStatus from "@/signalRConnection/connection-status";
import { UsersRound } from "lucide-react";
import { ChevronRight } from 'lucide-react';
import { PrivateConversationDTO, TopicDTO } from "openapi/requests/types.gen";
import { Skeleton } from "../ui/skeleton";
import DeleteTopicDialog from "../topic/delete-topic-dialog";

const ChatTopBar = (props: {topic?: TopicDTO, conv?: PrivateConversationDTO, setUsersOpened: any,
    usersOpened: boolean, topicOpened: boolean, setTopicOpened: any, isGroup: boolean, isFetching: boolean}) => {
    const { userId } = useAppSelector(x => x.profileReducer);
    const { isAdmin } = useAppSelector(x => x.selectedReducer);

    const handleOnClickGroup = () => {
        props.setUsersOpened(!props.usersOpened);
    }

    const handleOnClickArrow = () => {
        props.setTopicOpened(!props.topicOpened);
    }

    return (
    <div className="w-full max-h-12 shadow-lg flex items-center py-3
    px-6 text-white justify-between gap-2">
        {
            props.isFetching ?
            <Skeleton className="grow max-w-44 h-6"/> :
            <p className="grow truncate">
                {props.isGroup ?
                    props.topic?.title :
                    props.conv?.user1?.id !== userId ? props.conv?.user1?.name : props.conv?.user2?.name}
            </p>
        }
        <div className="flex items-center gap-1 w-fit">
            {
                props.isFetching ?
                <Skeleton className="w-40 h-6"/> :
                <>
                    <ConnectionStatus/>
                    {
                        props.isGroup ?
                        <>
                            {
                                isAdmin || props.topic?.user?.user?.id === userId ? 
                                <DeleteTopicDialog/> : null
                            }
                            <ChevronRight className={props.topicOpened ?
                            "w-6 h-6 ml-auto rotate-90 transition-rotate duration-75 hover:cursor-pointer hover:text-[#aaaaaa] transition-all" :
                            "w-6 h-6 ml-auto transition-rotate duration-75 hover:cursor-pointer hover:text-[#aaaaaa] transition-all"}
                            onClick={handleOnClickArrow}/>
                            <UsersRound className="w-6 h-6 hover:cursor-pointer hover:text-[#aaaaaa] transition-all" onClick={handleOnClickGroup}/>
                        </> :
                        null
                    }
                </>
            }
        </div>
    </div>);
}
 
export default ChatTopBar;