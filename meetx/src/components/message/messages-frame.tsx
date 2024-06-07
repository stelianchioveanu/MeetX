import { useAppDispatch, useAppSelector } from "@/application/store";
import MessageItem from "./message-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query";
import { MessageService } from "../../../openapi/requests/services.gen";
import { MessageDTO } from "../../../openapi/requests/types.gen";
import { useEffect, useRef, useState } from "react";
import Connector from '../../signalRConnection/signalr-connection';
import InfiniteScroll from './message-scroll-area';
import { Loader2 } from "lucide-react";
import { useMessageServiceGetApiMessageGetPrivateMessagesKey,
    useMessageServiceGetApiMessageGetTopicMessagesKey } from "../../../openapi/queries/common";
import { fetchQuery } from "@/App";

const MessagesFrame = (props: {isGroup: boolean}) => {
    const { selectedGroupId, selectedConvId, selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { userId } = useAppSelector(x => x.profileReducer);
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const [page, setPage] = useState(1);
    const chatRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [newMessage, setNewMessage] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useAppDispatch();

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView(false);
        }
    }
    
    const topic = useQuery({
        queryKey: [useMessageServiceGetApiMessageGetTopicMessagesKey],
        queryFn: () => {
            return fetchQuery(MessageService.getApiMessageGetTopicMessages({groupId: selectedGroupId ? selectedGroupId : undefined, topicId: selectedTopicId ? selectedTopicId : undefined, page: 1, lastMessageId: messages.length === 0 ? undefined : messages[0].id}), dispatch);
        },
        retry:false,
        enabled: false,
    });

    const conv = useQuery({
        queryKey: [useMessageServiceGetApiMessageGetPrivateMessagesKey],
        queryFn: () => {
            return fetchQuery(MessageService.getApiMessageGetPrivateMessages({convId: selectedConvId ? selectedConvId : undefined, page: 1, lastMessageId: messages.length === 0 ? undefined : messages[0].id}), dispatch);
        },
        retry:false,
        enabled: false,
    });

    useEffect(() => {
        if (props.isGroup && topic.status === 'success') {
            if (topic.data.response?.data) {
                setMessages(topic.data.response.data.reverse().concat(messages));
                
                if (topic.data.response.totalCount === topic.data.response.data.length) {
                    setHasMore(false);
                }
                if (containerRef.current !== null) {
                    setScrollValue(containerRef.current?.scrollHeight);
                }
            }
            setIsloading(false);
            setPage(prevPage => prevPage + 1);
            return;
        }
        if (!props.isGroup && conv.status === 'success') {
            if (conv.data.response?.data) {
                setMessages(conv.data.response.data.reverse().concat(messages));
                
                if (conv.data.response.totalCount === conv.data.response.data.length) {
                    setHasMore(false);
                }
                if (containerRef.current !== null) {
                    setScrollValue(containerRef.current?.scrollHeight);
                }
            }
            setIsloading(false);
            setPage(prevPage => prevPage + 1);
            return;
        }
    }, [topic.dataUpdatedAt, conv.dataUpdatedAt]);

    useEffect(() => {
        if (newMessage === true) {
            scrollToBottom();
            setNewMessage(false);
        }
    }, [newMessage]);

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

    useEffect(() => {
        setMessages([]);
        setPage(1);
        setHasMore(true);
        setScrollValue(0);
    }, [selectedTopicId, selectedConvId]);

    useEffect(() => {
        const connector = Connector();
        
        const messageHandler = (message : any) => {
            if (props.isGroup && selectedGroupId === message.groupId && selectedTopicId === message.topicId) {
                const value = (containerRef.current?.scrollHeight || 0) -
                        (containerRef.current?.scrollTop || 0) -
                        (containerRef.current?.clientHeight || 0);
                if (value <= 1) {
                    setMessages(messages => [...messages, message]);
                    setNewMessage(true);
                } else {
                    setMessages(messages => [...messages, message]);
                    if (message.user?.user?.id === userId) {
                        setNewMessage(true);
                    }
                }
            } else if (!props.isGroup && selectedConvId === message.convId) {
                const value = (containerRef.current?.scrollHeight || 0) -
                        (containerRef.current?.scrollTop || 0) -
                        (containerRef.current?.clientHeight || 0);
                if (value <= 1) {
                    setMessages(messages => [...messages, message]);
                    setNewMessage(true);
                } else {
                    setMessages(messages => [...messages, message]);
                    if (message.user?.user?.id === userId) {
                        setNewMessage(true);
                    }
                }
            }
        };

        connector.events(messageHandler);

        return () => {
            connector.removeEvent("ReceiveMessage", messageHandler);
        };
    }, [selectedTopicId, selectedGroupId, selectedConvId, props.isGroup, userId]);

    return (
        <ScrollArea className="w-full h-fit min-h-10" ref={containerRef}>
            <ScrollBar className="flex"/>
            <InfiniteScroll hasMore={hasMore} isLoading={isLoading} next={() => {setIsloading(true); if (props.isGroup) {topic.refetch();} else {conv.refetch();}}} threshold={1} reverse={true}>
                <div id="loader" className="w-full h-8 top-auto">
                {hasMore && 
                    <div className="w-full h-full flex justify-center items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>}
                {!hasMore && <p className="w-full h-full text-center truncate text-white">This is the beginning of the {props.isGroup ? "topic" : "conversation"}!</p>}
                </div>
            </InfiniteScroll>
            {
                messages.map(function(message : MessageDTO){
                    return (
                        <MessageItem key={message.id} message={message} isGroup={props.isGroup} isTopic={false} topic={null}/>
                    )
                })
            }
            <div ref={chatRef}></div>
        </ScrollArea>
     );
}
 
export default MessagesFrame;