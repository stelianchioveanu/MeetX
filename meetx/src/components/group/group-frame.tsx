import { Separator } from "../ui/separator";
import GroupTopic from "./group-topic";
import AddTopic from "./add-topic";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { GroupService, TopicService } from "../../../openapi/requests/services.gen";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { useGroupServiceGetApiGroupGetGroupKey, useTopicServiceGetApiTopicGetMyTopicsKey,
    useTopicServiceGetApiTopicGetRecentTopicsKey } from "../../../openapi/queries/common";
import { setAdmin, setAppRole, setPublic } from "@/application/state-slices";
import { TopicDTO } from "openapi/requests/types.gen";
import LeaveGroupDialog from "./leave-group-dialog";
import DeleteGroupDialog from "./delete-group-dialog";
import { GenerateLinkDialog } from "./generate-link-dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";
import { GroupNameCard } from "./group-name-card";
import ChangeNameGroup from "../navigation/change-name-group";
import { fetchQuery } from "@/App";

const GroupFrame = () => {
    const { selectedGroupId, isAdmin, isPublic, appRole } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    const [pageMyTopics, setPageMyTopics] = useState<number>(1);
    const [pageRecentTopics, setPageRecentTopics] = useState<number>(1);

    const group = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupKey, selectedGroupId],
        queryFn: () => {
            return fetchQuery(GroupService.getApiGroupGetGroup({groupId: selectedGroupId === null ? undefined : selectedGroupId}), dispatch);
        },
        retry: false,
    });

    useEffect(() => {dispatch(setAdmin(group.data?.response?.groupRole === "Admin"));
    dispatch(setPublic(group.data?.response?.group?.isPublic ? group.data?.response?.group?.isPublic : false));
    dispatch(setAppRole(group.data?.response?.userRole === "Admin" ? true : false))
    }, [group.dataUpdatedAt])

    const myTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey, selectedGroupId],
        queryFn: () => {
            return fetchQuery(TopicService.getApiTopicGetMyTopics({search: "", pageSize: 5 * pageMyTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId}), dispatch);
        },
        retry: false
    });

    const recentTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey, selectedGroupId],
        queryFn: () => {
            return fetchQuery(TopicService.getApiTopicGetRecentTopics({search: "", pageSize: 5 * pageRecentTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId}), dispatch);
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
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white gap-2">
            {
                group.isLoading ? 
                <Skeleton className="w-full h-full"/> :
                <>
                    <GroupNameCard name={group.data?.response?.group?.name} className={isAdmin ? "w-[calc(100%-24px)]" : "w-full"}/>
                    {
                        isAdmin ?
                        <ChangeNameGroup/> : null
                    }
                </>
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
            <ScrollBar className="flex"/>
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
            isPublic ?
            <>
                {
                    appRole ?
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
                    isAdmin ? null :
                    group.isFetching ?
                    <Skeleton className="w-3/4 h-12"/> :
                    <LeaveGroupDialog/>
                }
            </> :
            <>
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
            </>
        }
    </div> );
}
 
export default GroupFrame;