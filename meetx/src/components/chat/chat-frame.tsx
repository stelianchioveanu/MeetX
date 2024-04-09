import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "@/components/users-tab/group-users";
import { useState } from "react";

const ChatFrame = (props:{topic: any}) => {
    const [usersOpened, setUsersOpened] = useState(true);

    return (
    <div className="grow h-full flex flex-col">
        <ChatTopBar topic={props.topic} setUsersOpened={setUsersOpened} usersOpened={usersOpened} />
        <div className="flex w-full h-[calc(100%-48px)]">
            <div className="flex grow p-4">
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