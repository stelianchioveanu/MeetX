import { useState } from "react";
import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "./group-users";
import { useDetectClickOutside } from 'react-detect-click-outside';

const ChatFrame = (props:{topic: any}) => {
    const [usersOpened, setUsersOpened] = useState(true);
    const ref = useDetectClickOutside({ onTriggered: () => setUsersOpened(false) });

    return (
    <div className="grow h-full p-4 flex flex-col relative">
        <ChatTopBar topic={props.topic} setUsersOpened={setUsersOpened} />
        <ChatInput/>
        { usersOpened ?
            <GroupUsers innerRef={ref}/> :
            null
        }
    </div> );
}
 
export default ChatFrame;