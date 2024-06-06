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
import { useAppDispatch, useAppSelector } from "@/application/store";
import { RequestResponse } from "../../../openapi/requests/types.gen";
import { setGroup, setTopic } from "@/application/state-slices";
import { fetchQuery } from "@/App";

const ChatFrame = (props:{isGroup: boolean}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { userId } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();

    const [usersOpened, setUsersOpened] = useState(false);
    const [topicOpened, setTopicOpened] = useState(false);

    useEffect(() => {
        setTopicOpened(false);
        setUsersOpened(false);
    }, [selectedTopicId])

    const topic = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetTopicKey, selectedGroupId, selectedTopicId, selectedConvId],
        queryFn: () => {
            return fetchQuery(TopicService.getApiTopicGetTopic({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined}), dispatch);
        },
        retry: false,
    });

    const conv = useQuery({
        queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, selectedGroupId, selectedTopicId, selectedConvId],
        queryFn: () => {
            return fetchQuery(PrivateConversationService.getApiPrivateConversationGetPrivateConversation({convId: selectedConvId === null ? undefined : selectedConvId}), dispatch)
        },
        retry: false,
    });

    useEffect(() => {
        if (props.isGroup && selectedTopicId !== "0" && selectedGroupId !== "0") {
            topic.refetch();
        } else {
            conv.refetch();
        }
    }, [selectedTopicId, selectedConvId])

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey]});
    }, [selectedTopicId, topic.dataUpdatedAt])

    return (
        <div className="w-[calc(100%-304px)] h-full flex flex-col">
            <ChatTopBar topic={topic.data?.response} conv={conv.data?.response} setUsersOpened={setUsersOpened}
            usersOpened={usersOpened} topicOpened={topicOpened} setTopicOpened={setTopicOpened}
            isGroup={props.isGroup} isFetching={props.isGroup ? topic.isFetching : conv.isFetching} />
            <div className="flex w-full h-[calc(100%-48px)]">
                <div className="flex grow p-4 flex-col gap-8 relative justify-end overflow-hidden">
                    {
                        topicOpened && props.isGroup ?
                        <TopicItem topic={topic.data?.response} isFetching={topic.isFetching}/> :
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