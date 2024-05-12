import { useAppSelector } from "@/application/store";
import MessageItem from "./message-item";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { useQuery } from "@tanstack/react-query";
import { useMessageServiceGetApiMessageGetMessagesKey } from "../../../openapi/queries/common";
import { MessageService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { MessageDTO } from "../../../openapi/requests/types.gen";
import { useEffect, useState } from "react";
import Connector from '../../signalRConnection/signalr-connection'

const MessagesFrame = () => {
    const {refresh} = useRefreshToken();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const { token } = useAppSelector(x => x.profileReducer);
    const { events } = Connector(token ? token : "");
    
    const {data, status} = useQuery({
        queryKey: [useMessageServiceGetApiMessageGetMessagesKey, selectedTopicId, selectedGroupId],
        queryFn: () => {
            return MessageService.getApiMessageGetMessages({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get messages failed! Please try again later!");
                return false;
            }
            refresh();
            return true;
        },
        retryDelay: 0,
    });

    useEffect(() => {
        if (status === 'success') {
            if (data.response?.data) {
                setMessages(data.response.data);
              }
        }
      }, [status, data]);

    useEffect(() => {
        events((message : MessageDTO) => setMessages(messages => [...messages, message]));
    }, [setMessages]);
    
    return (
        <ScrollArea className="w-full h-fit">
            {
                messages.map(function(message : MessageDTO){
                    return (
                        <MessageItem key={message.id} message={message}/>
                    )
                })
            }
        </ScrollArea>
     );
}
 
export default MessagesFrame;