import { useQuery } from "@tanstack/react-query";
import MessagesFrame from "../message/messages-frame";
import TopicItem from "../topic/topic-item";
import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "@/components/users-tab/group-users";
import { useState } from "react";
import { useTopicServiceGetApiTopicGetTopicKey } from "../../../openapi/queries/common";
import { TopicService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";
import { useRefreshToken } from "@/hooks/useRefreshToken";

const ChatFrame = (props:{isGroup: boolean}) => {
    const {refresh} = useRefreshToken();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);

    const [usersOpened, setUsersOpened] = useState(false);
    const [topicOpened, setTopicOpened] = useState(false);

    const {data} = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetTopicKey, selectedGroupId, selectedTopicId],
        queryFn: () => {
            return TopicService.getApiTopicGetTopic({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get topic failed! Please try again later!");
                return false;
            }
            refresh();
            return true;
        },
        retryDelay: 0
    });

    return (
        <div className="w-[calc(100%-304px)] h-full flex flex-col">
            <ChatTopBar topic={data?.response} setUsersOpened={setUsersOpened}
            usersOpened={usersOpened} topicOpened={topicOpened} setTopicOpened={setTopicOpened} isGroup={props.isGroup} />
            <div className="flex w-full h-[calc(100%-48px)]">
                <div className="flex w-full p-4 flex-col gap-8 relative">
                    {
                        topicOpened && props.isGroup ?
                        <TopicItem topic={data?.response}/> :
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
        </div>
);
}
 
export default ChatFrame;