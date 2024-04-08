import { UsersRound } from "lucide-react";

const ChatTopBar = (props: {topic:any, setUsersOpened: any}) => {

    const handleOnClick = (e: any) => {
        e.stopPropagation();
        props.setUsersOpened(true);
    }

    return (
    <div className="absolute w-full h-12 shadow-lg flex items-center py-3 px-6 text-white left-0 top-0 justify-between">
        {props.topic.name}
        <UsersRound className="w-6 h-6" onClick={handleOnClick}/>
    </div>);
}
 
export default ChatTopBar;