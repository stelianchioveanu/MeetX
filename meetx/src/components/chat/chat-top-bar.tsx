import { UsersRound } from "lucide-react";
import { ChevronRight } from 'lucide-react';

const ChatTopBar = (props: {topic:any, setUsersOpened: any, usersOpened: boolean, topicOpened: boolean, setTopicOpened: any, isGroup: boolean}) => {

    const handleOnClickGroup = () => {
        props.setUsersOpened(!props.usersOpened);
    }

    const handleOnClickArrow = () => {
        props.setTopicOpened(!props.topicOpened);
    }

    return (
    <div className="w-full max-h-12 shadow-lg flex items-center py-3
    px-6 text-white justify-between">
        {props.topic.name}
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
    </div>);
}
 
export default ChatTopBar;