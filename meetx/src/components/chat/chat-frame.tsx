import MessagesFrame from "../message/messages-frame";
import TopicItem from "../topic/topic-item";
import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "@/components/users-tab/group-users";
import { useState } from "react";

const ChatFrame = (props:{topText: any, isGroup: boolean}) => {
    const [usersOpened, setUsersOpened] = useState(false);
    const [topicOpened, setTopicOpened] = useState(false);

    return (
    <div className="w-[calc(100%-304px)] h-full flex flex-col">
        <ChatTopBar topic={props.topText} setUsersOpened={setUsersOpened}
        usersOpened={usersOpened} topicOpened={topicOpened} setTopicOpened={setTopicOpened} isGroup={props.isGroup} />
        <div className="flex w-full h-[calc(100%-48px)]">
            <div className="flex w-full p-4 flex-col gap-8 relative">
                {
                    topicOpened && props.isGroup ?
                    <TopicItem/> :
                    null
                }
                <MessagesFrame/>
                <ChatInput/>
            </div>
            {usersOpened && props.isGroup ?
                <GroupUsers/> :
                null
            }
        </div>
    </div> );
}
 
export default ChatFrame;