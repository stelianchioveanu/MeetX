import { UsersRound } from "lucide-react";

const ChatTopBar = (props: {topic:any, setUsersOpened: any, usersOpened: boolean}) => {

    const handleOnClick = () => {
        props.setUsersOpened(!props.usersOpened);
    }

    return (
    <div className="w-full max-h-12 shadow-lg flex items-center py-3 px-6 text-white justify-between">
        {props.topic.name}
        <UsersRound className="w-6 h-6" onClick={handleOnClick}/>
    </div>);
}
 
export default ChatTopBar;