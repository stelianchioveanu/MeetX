import MessagesFrame from "../message/messages-frame";
import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "@/components/users-tab/group-users";
import { useState } from "react";

const ChatFrame = (props:{topic: any}) => {
    const [usersOpened, setUsersOpened] = useState(true);

    return (
    <div className="w-[calc(100%-304px)] h-full flex flex-col">
        <ChatTopBar topic={props.topic} setUsersOpened={setUsersOpened} usersOpened={usersOpened} />
        <div className="flex w-full h-[calc(100%-48px)]">
            <div className="flex w-full p-4 flex-col gap-8">
                <MessagesFrame/>
                <ChatInput/>
            </div>
            {usersOpened ?
                <GroupUsers/> :
                null
            }
        </div>
    </div> );
}
 
export default ChatFrame;