import UserButton from "./user-button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import PopoverUser from "./popover-user";
import UserAvatar from "./user-avatar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupMembersKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { Skeleton } from "../ui/skeleton";
import { fetchQuery } from "@/App";
import { GroupMemberDTO } from "openapi/requests/types.gen";

const GroupUsers = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();

    const { data, isFetching } = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey],
        queryFn: () => {
            return fetchQuery(GroupService.getApiGroupGetGroupMembers({page: 1, pageSize: 1000000, groupId: selectedGroupId ? selectedGroupId : undefined}), dispatch);
        },
        retry: false
    });

    return (
    <div className="max-w-full float-right h-full flex justify-center bg-[rgb(119,125,141)] dark:bg-[#171b25] p-3 absolute right-0 top-0 shadow-lg z-[51]">
        <ScrollArea className="max-h-full flex flex-col items-center py-6 px-2">
            <ScrollBar className="flex"/>
            {
                isFetching ?
                <Skeleton className="w-52 h-16"/> :
                <>
                    <p className="w-52 min-h-12 flex items-center my-2 text-white">
                        #Members
                    </p>
                    {
                        data?.response?.data !== null && data?.response?.data !== undefined ?
                        data?.response?.data.map((user: GroupMemberDTO, index: number) => {
                            return (
                                <PopoverUser userId={user.user?.id} side="left" key={index} isGroup={true}>
                                    <UserButton variant={"ghost"}
                                    className="w-52 h-12 hover:bg-neutral-600 gap-2 flex justify-start group mt-1">
                                        <UserAvatar user={user.user} className="w-10 min-w-10 h-10 text-xs" status="hidden"/>
                                        <p className="w-[calc(100%-40px)] truncate text-left text-white">
                                            {user.user?.name}
                                        </p>
                                    </UserButton>
                                </PopoverUser>
                            );
                        }) : null
                    }
                </>
            }
        </ScrollArea>
    </div>);
}
 
export default GroupUsers;