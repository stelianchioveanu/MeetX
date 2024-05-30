import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";
import ConversationButton from "./conversation-button";
import { PrivateConversationDTO } from "../../../openapi/requests/types.gen";
import { usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey } from "../../../openapi/queries/common";
import { PrivateConversationService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import Connector from '../../signalRConnection/signalr-connection';
import { useEffect } from "react";

const PrivateFrame = () => {
    const queryClient = useQueryClient();
    const { update } = Connector();

    const {data} = useQuery({
        queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey],
        queryFn: () => {
            return PrivateConversationService.getApiPrivateConversationGetPrivateConversations();
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get private conversations failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    useEffect(() => {
        update(() => {
            queryClient.invalidateQueries({queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey]})
        });
    }, 
    [])

    return (
    <div className="h-full w-60 bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">Private Chats</div>
        <ScrollArea className="flex w-full flex-col p-2">
            {
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