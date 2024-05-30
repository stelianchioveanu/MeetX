import { Separator } from "../ui/separator";
import GroupTopic from "./group-topic";
import AddTopic from "./add-topic";
import { ScrollArea } from "../ui/scroll-area";
import { GroupService, TopicService } from "../../../openapi/requests/services.gen";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { useGroupServiceGetApiGroupGetGroupKey, useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetRecentTopicsKey } from "../../../openapi/queries/common";
import { setAdmin, setGroup } from "@/application/state-slices";
import { TopicDTO } from "openapi/requests/types.gen";
import LeaveGroupDialog from "./leave-group-dialog";
import DeleteGroupDialog from "./delete-group-dialog";
import { GenerateLinkDialog } from "./generate-link-dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const GroupFrame = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    const [pageMyTopics, setPageMyTopics] = useState<number>(1);
    const [pageRecentTopics, setPageRecentTopics] = useState<number>(1);

    const group = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupKey, selectedGroupId],
        queryFn: () => {
            return GroupService.getApiGroupGetGroup({groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get group failed! Please try again later!");
                dispatch(setGroup("0"));
                return false;
            }
            return true;
        },
        retryDelay: 0,
    });

    useEffect(() => {dispatch(setAdmin(group.data?.response?.groupRole === "Admin"))}, [group.data])

    const myTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetMyTopics({search: "", pageSize: 5 * pageMyTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get my topics failed! Please try again later!");
                dispatch(setGroup("0"));
                return false;
            }
            return true;
        },
        retryDelay: 0,
    });

    const recentTopics = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetRecentTopics({search: "", pageSize: 5 * pageRecentTopics, groupId: selectedGroupId === null ? undefined : selectedGroupId});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get recent topics failed! Please try again later!");
                dispatch(setGroup("0"));
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    useEffect(() => {
        myTopics.refetch();
    }, [pageMyTopics]);

    useEffect(() => {
        recentTopics.refetch();
    }, [pageRecentTopics]);

    return (
    <div className="h-full w-60 bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">{group.data?.response?.group?.name}</div>
        <AddTopic/>
        <Separator className="bg-neutral-600 w-4/5"/>
        <ScrollArea className="flex w-full flex-col p-2">
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
                <Button variant={"link"} className="w-full text-blue-700" onClick={() => {setPageRecentTopics(pageRecentTopics + 1);}}>Load more...</Button> : null
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
                <Button variant={"link"} className="w-full text-blue-700" onClick={() => {setPageMyTopics(pageMyTopics + 1);}}>Load more...</Button> : null
            }
        </ScrollArea>
        <Separator className="bg-neutral-600 w-4/5"/>
        {
            group?.data?.response?.groupRole == "Admin" ?
            <>
                <GenerateLinkDialog/>
                <DeleteGroupDialog/>
            </> : null
        }
        <LeaveGroupDialog/>
    </div> );
}
 
export default GroupFrame;