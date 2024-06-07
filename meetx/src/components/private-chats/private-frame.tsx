import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import ConversationButton from "./conversation-button";
import { PrivateConversationDTO } from "../../../openapi/requests/types.gen";
import { usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey } from "../../../openapi/queries/common";
import { PrivateConversationService } from "../../../openapi/requests/services.gen";
import Connector from '../../signalRConnection/signalr-connection';
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch } from "@/application/store";
import { fetchQuery } from "@/App";
import { NIL } from "uuid";

const PrivateFrame = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

    const {data, isLoading} = useQuery({
        queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey],
        queryFn: () => {
            return fetchQuery(PrivateConversationService.getApiPrivateConversationGetPrivateConversations({page: 1, pageSize: 1000000}), dispatch);
        },
        retry: false
    });

    useEffect(() => {
        const connector = Connector();
        
        const messageHandler1 = (message : any) => {

            if (message.convId !== NIL && message.topicId === NIL && message.groupId === NIL)
            {
                queryClient.invalidateQueries({queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey]})
            }
        };

        connector.events(messageHandler1);

        return () => {
            connector.removeEvent("ReceiveMessage", messageHandler1);
        };
    }, []);

    return (
    <div className="h-full w-60 bg-[rgb(119,125,141)] dark:bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">
            {
                isLoading ?
                <Skeleton className="w-full h-8"/> :
                <p className="text-white">Private Chats</p>
            }
        </div>
        <ScrollArea className="flex w-full flex-col p-2">
            <ScrollBar className="flex"/>
            {
                isLoading ?
                <Skeleton className="w-full h-10"/> :
                data?.response?.data?.map(function(conv : PrivateConversationDTO){
                    return (
                        <ConversationButton key={conv.id} conv={conv}/>
                    )
                })
            }
        </ScrollArea>
    </div> );
}
 
export default PrivateFrame;