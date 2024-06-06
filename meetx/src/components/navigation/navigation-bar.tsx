import { GroupDTO } from "openapi/requests/types.gen";
import { ModeToggle } from "../themes/mode-toggle";
import { Separator } from "../ui/separator";
import AddGroup from "./add-group";
import Group from "./group";
import Profile from "./profile";
import { useEffect } from "react";
import Connector from '../../signalRConnection/signalr-connection';
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useAppDispatch } from "@/application/store";
import { fetchQuery } from "@/App";

const NavigationBar = () => {
    const dispatch = useAppDispatch();
    const {data, status, isFetching} = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupsKey],
        queryFn: () => {
            return fetchQuery(GroupService.getApiGroupGetGroups({pageSize: 1000000000}), dispatch);
        },
        retry: false
    });

    useEffect(() => {if(status === "success") Connector()}, [status, data])

    return ( 
    <div className="w-16 bg-[rgba(17,20,28,1)] flex items-center flex-col gap-3 py-2 box-border">
        {
            isFetching ?
            <Skeleton className="h-11 w-11 rounded-full"/> : 
            <>
                <Profile id="0"/>
                <Separator className="bg-neutral-600 w-3/4"></Separator>
                <ScrollArea className="w-full">
                    {
                        data?.response?.data !== null && data?.response?.data !== undefined && data?.response?.data.length !== 0 ?
                        <div className="w-full flex items-center flex-col gap-3">
                            {data?.response?.data.map(function(group : GroupDTO){
                                return (
                                    <Group key={group.id} group={group}></Group>
                                )
                            })}
                        </div> : null
                    }
                </ScrollArea>
                <AddGroup/>
                <Separator className="bg-neutral-600 w-3/4"></Separator>
                <ModeToggle></ModeToggle>
            </>
        }
    </div>
    );
}
 
export default NavigationBar;