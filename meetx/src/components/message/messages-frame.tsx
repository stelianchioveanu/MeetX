import { useAppSelector } from "@/application/store";
import MessageItem from "./message-item";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { useQuery } from "@tanstack/react-query";
import { useMessageServiceGetApiMessageGetMessagesKey } from "../../../openapi/queries/common";
import { MessageService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { MessageDTO } from "../../../openapi/requests/types.gen";
import { useEffect, useRef, useState } from "react";
import Connector from '../../signalRConnection/signalr-connection';
import InfiniteScroll from './message-scroll-area';
import { Loader2 } from "lucide-react";

const MessagesFrame = () => {
    const {refresh} = useRefreshToken();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const { token } = useAppSelector(x => x.profileReducer);
    const { events } = Connector(token ? token : "");
    const [page, setPage] = useState(1);
    const chatRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [newMessage, setNewMessage] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    const [isLoading, setIsloading] = useState(false);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView(false);
        }
    }
    
    const {data, status, refetch} = useQuery({
        queryKey: [useMessageServiceGetApiMessageGetMessagesKey],
        queryFn: () => {
            return MessageService.getApiMessageGetMessages({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined, page: 1, lastMessageId: messages.length === 0 ? undefined : messages[0].id});
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
        enabled: false,
    });

    useEffect(() => {
        if (status === 'success') {
            if (data.response?.data) {
                setMessages(data.response.data.reverse().concat(messages));
                
                if (data.response.totalCount === data.response.data.length) {
                    setHasMore(false);
                }
                if (containerRef.current !== null) {
                    setScrollValue(containerRef.current?.scrollHeight);
                }
            }
        }
        setIsloading(false);
        setPage(prevPage => prevPage + 1);
    }, [status, data]);

    useEffect(() => {
        if (page === 2) {
            scrollToBottom();
        }
    }, [page]);

    useEffect(() => {
        const element = document.getElementById("loader");
        if (containerRef.current?.scrollTop !== undefined && containerRef.current?.scrollTop < (element?.scrollHeight === undefined ? 0 : element?.scrollHeight)) {
            containerRef.current?.scrollTo({top: containerRef.current?.scrollHeight - scrollValue});
        }
    }, [scrollValue]);


    useEffect(() => {setMessages([]); setPage(1); setHasMore(true); setIsloading(false)}, [selectedTopicId]);

    useEffect(() => {
        if (newMessage === true) {
            scrollToBottom();
            setNewMessage(false);
        }
    }, [newMessage]);


    useEffect(() => {
        events((message : MessageDTO) => {
            if (selectedGroupId === message.groupId && selectedTopicId === message.topicId) {
                setMessages(messages => [...messages, message]);
                setNewMessage(true);
            }
        });
    }, []);

    return (
        <ScrollArea className="w-full h-fit" ref={containerRef}>
            <InfiniteScroll hasMore={hasMore} isLoading={isLoading} next={() => {setIsloading(true); refetch();}} threshold={1} reverse={true}>
                {hasMore && 
                    <div id="loader" className="w-full h-fit flex justify-center items-center top-auto">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>}
                {!hasMore && <div className="w-full h-fit text-center top-auto">This is the beginning of the topic!</div>}
            </InfiniteScroll>
            {
                messages.map(function(message : MessageDTO){
                    return (
                        <MessageItem key={message.id} message={message}/>
                    )
                })
            }
            <div ref={chatRef}></div>
        </ScrollArea>
     );
}
 
export default MessagesFrame;