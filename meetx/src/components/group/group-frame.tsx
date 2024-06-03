import { Separator } from "../ui/separator";
import GroupTopic from "./group-topic";
import AddTopic from "./add-topic";
import { ScrollArea } from "../ui/scroll-area";
import { GroupService, TopicService } from "../../../openapi/requests/services.gen";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { useGroupServiceGetApiGroupGetGroupKey, useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetRecentTopicsKey } from "../../../openapi/queries/common";
import { setAdmin } from "@/application/state-slices";
import { TopicDTO } from "openapi/requests/types.gen";
import LeaveGroupDialog from "./leave-group-dialog";
import DeleteGroupDialog from "./delete-group-dialog";
import { GenerateLinkDialog } from "./generate-link-dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

const GroupFrame = () => {
    const { selectedGroupId, isAdmin } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    const [pageMyTopics, setPageMyTopics] = useState<number>(1);
    const [pageRecentTopics, setPageRecentTopics] = useState<number>(1);

    const group = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupKey, selectedGroupId],
        queryFn: () => {
            return GroupService.getApiGroupGetGroup({groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry: false,
    });

    useEffect(() => {dispatch(setAdmin(group.data?.response?.groupRole === "Admin"))}, [group.data])

    const myTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetMyTopics({search: "", pageSize: 5 * pageMyTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry: false
    });

    const recentTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetRecentTopics({search: "", pageSize: 5 * pageRecentTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry: false
    });

    useEffect(() => {
        myTopics.refetch();
    }, [pageMyTopics]);

    useEffect(() => {
        recentTopics.refetch();
    }, [pageRecentTopics]);

    return (
    <div className="h-full w-60 bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">
            {
                group.isLoading ? 
                <Skeleton className="w-full h-full"/> :
                group.data?.response?.group?.name
            }
        </div>
        {
            group.isLoading ?
            <Skeleton className="w-3/4 h-12"/> :
            <AddTopic/>
        }
        {
            group.isLoading ?
            null :
            <Separator className="bg-neutral-600 w-4/5"/>
        }
        <ScrollArea className="flex w-full flex-col p-2">
            {
                group.isFetching ?
                <Skeleton className="w-full h-8"/>:
                <>
                    <div className="min-h-12 flex items-center mb-2 px-2">
                        #Recent topics
                    </div>
                    {
                        recentTopics.data?.response?.data !== null && recentTopics.data?.response?.data !== undefined ?
                        recentTopics.data.response?.data.map(function(topic : TopicDTO){
                                return (
                                    <GroupTopic key={topic.id} topic={topic}></GroupTopic>
                                )
                            }) : null
                    }
                    {
                        recentTopics.data?.response?.totalCount !== recentTopics.data?.response?.data?.length ?
                        (
                            recentTopics.isFetching ?
                            <div className="w-full h-fit flex items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin"/>
                            </div> :
                            <Button variant={"link"} className="w-full text-blue-700" onClick={() => {setPageRecentTopics(pageRecentTopics + 1);}}>Load more...</Button>
                        ) : null
                    }
                    <div className="min-h-12 flex items-center mb-2 px-2">
                        #Your topics
                    </div>
                    {
                        myTopics.data?.response?.data !== null && myTopics.data?.response?.data !== undefined ?
                            myTopics.data.response?.data.map(function(topic : TopicDTO){
                                return (
                                    <GroupTopic key={topic.id} topic={topic}></GroupTopic>
                                )
                            }) : null
                    }
                    {
                        myTopics.data?.response?.totalCount !== myTopics.data?.response?.data?.length ?
                        (
                            myTopics.isFetching ?
                            <div className="w-full h-fit flex items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin"/>
                            </div> :
                            <Button variant={"link"} className="w-full text-blue-700" onClick={() => {setPageMyTopics(pageMyTopics + 1);}}>Load more...</Button>
                        ) : null
                    }
                </>
            }
        </ScrollArea>
        {
            group.isFetching ?
            null :
            <Separator className="bg-neutral-600 w-4/5"/>
        }
        {
            isAdmin ?
            <>
                {
                    group.isFetching ?
                    null :
                    <GenerateLinkDialog/>
                }
                {
                    group.isFetching ?
                    null :
                    <DeleteGroupDialog/>
                }
            </> : null
        }
        {
            group.isFetching ?
            <Skeleton className="w-3/4 h-12"/> :
            <LeaveGroupDialog/>
        }
    </div> );
}
 
export default GroupFrame;