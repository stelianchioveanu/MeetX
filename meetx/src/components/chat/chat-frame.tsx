import { useQuery, useQueryClient } from "@tanstack/react-query";
import MessagesFrame from "../message/messages-frame";
import TopicItem from "../topic/topic-item";
import ChatInput from "./chat-input";
import ChatTopBar from "./chat-top-bar";
import GroupUsers from "@/components/users-tab/group-users";
import { useEffect, useState } from "react";
import { usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey,
    useTopicServiceGetApiTopicGetRecentTopicsKey, useTopicServiceGetApiTopicGetTopicKey } from "../../../openapi/queries/common";
import { PrivateConversationService, TopicService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";

const ChatFrame = (props:{isGroup: boolean}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { userId } = useAppSelector(x => x.profileReducer);

    const [usersOpened, setUsersOpened] = useState(false);
    const [topicOpened, setTopicOpened] = useState(false);

    const topic = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetTopicKey, selectedGroupId, selectedTopicId, selectedConvId],
        queryFn: () => {
            return TopicService.getApiTopicGetTopic({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get topic failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0,
        enabled: false
    });

    const conv = useQuery({
        queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, selectedGroupId, selectedTopicId, selectedConvId],
        queryFn: () => {
            return PrivateConversationService.getApiPrivateConversationGetPrivateConversation({convId: selectedConvId === null ? undefined : selectedConvId});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get conv failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0,
        enabled: false
    });

    useEffect(() => {
        if (props.isGroup && selectedTopicId !== "0" && selectedGroupId !== "0") {
            topic.refetch();
        } else {
            conv.refetch();
        }
    })

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey]});
    }, [selectedTopicId, topic.data, topic.isLoading, topic.isPending])

    return (
        <div className="w-[calc(100%-304px)] h-full flex flex-col">
            <ChatTopBar topic={topic.data?.response} conv={conv.data?.response} setUsersOpened={setUsersOpened}
            usersOpened={usersOpened} topicOpened={topicOpened} setTopicOpened={setTopicOpened} isGroup={props.isGroup} />
            <div className="flex w-full h-[calc(100%-48px)]">
                <div className="flex grow p-4 flex-col gap-8 relative justify-end overflow-hidden">
                    {
                        topicOpened && props.isGroup ?
                        <TopicItem topic={topic.data?.response}/> :
                        null
                    }
                    <MessagesFrame isGroup={props.isGroup}/>
                    <ChatInput userId={conv !== null && conv !== undefined ? (conv.data?.response?.user1?.id !== userId ? conv.data?.response?.user1?.id : conv.data?.response?.user2?.id) : undefined} isGroup={props.isGroup}/>
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