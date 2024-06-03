import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import TopicScrollItem from "./topic-scroll-item";
import { TopicDTO } from "../../../openapi/requests/types.gen";
import { useTopicServiceGetApiTopicGetTopicsKey } from "../../../openapi/queries/common";
import { TopicService } from "../../../openapi/requests/services.gen";
import { useAppSelector } from "@/application/store";
import { Button } from "../ui/button";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

const GroupPage = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const [page, setPage] = useState<number>(1);
    const [searched, setSearched] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const chatRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView(false);
        }
    }

    useEffect(() => {
        setPage(1);
        setSearch("");
        setSearched("");
        scrollToTop();
    }, [selectedGroupId])

    const {data, refetch, isFetchedAfterMount, isRefetching} = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetTopics({search: searched, pageSize: 10 * page, groupId: selectedGroupId ? selectedGroupId : undefined});
        },
        retry: false
    });

    useEffect(() => {
        refetch();
    }, [page, searched])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setPage(1);
            setSearched(search);
            setSearch("");
            scrollToTop();
        }
    };

    return ( 
    <div className="w-[calc(100%-304px)] h-full flex flex-col p-10 gap-5">
        {
            !isFetchedAfterMount ?
            null :
            <div className="flex flex-col gap-2">
                <p className="text-xl font-bolt">Search Topic</p>
                <Input className="bg-transparent" value={search} onChange={handleChange} onKeyDown={handleKeyPress} placeholder="Search topic"/>
            </div>
        }
        <ScrollArea className="w-full h-full">
            {
                !isFetchedAfterMount || (isRefetching && page === 1) ?
                <Skeleton className="w-full h-20"/> :
                <>
                <div className="h-0" ref={chatRef}></div>
                { searched !== "" ?
                    <p className="mb-2">Results for "{searched}"</p> : 
                    (
                        data?.response?.data?.length === 0 ?
                        <p className="mb-2">No topics found</p> :
                        <p className="mb-2">All Topics</p>
                    )
                }
                {
                    data?.response?.data?.map(function(topic : TopicDTO){
                        return (
                            <TopicScrollItem key={topic.id} topic={topic}/>
                        )
                    })
                }
                {
                    data?.response?.totalCount !== data?.response?.data?.length ?
                    (
                        isRefetching ?
                        <div className="w-full h-fit flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin"/>
                        </div> :
                        <Button variant={"link"} className="w-full text-blue-700" onClick={() => setPage(page + 1)}>Load more...</Button>
                    ) : null
                }
            </>
            }
        </ScrollArea>
    </div>
    );
}
 
export default GroupPage;