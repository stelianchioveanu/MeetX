import UserButton from "./user-button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import PopoverUser from "./popover-user";
import UserAvatar from "./user-avatar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupMembersKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { useAppSelector } from "@/application/store";
import { Skeleton } from "../ui/skeleton";

const GroupUsers = () => {
    const [page, setPage] = useState(1);
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);

    const { data, isFetching } = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey],
        queryFn: () => {
            return GroupService.getApiGroupGetGroupMembers({page: page, groupId: selectedGroupId ? selectedGroupId : undefined});
        },
        retry: false
    });

    return (
    <div className="max-w-full float-right h-full flex justify-center bg-[#171b25] p-3">
        <ScrollArea className="max-h-full bg-[#171b25] flex flex-col items-center py-6 px-2">
            <ScrollBar className="flex"/>
            {
                isFetching ?
                <Skeleton className="w-52 h-16"/> :
                <>
                    <p className="w-52 min-h-12 flex items-center my-2">
                        #Members
                    </p>
                    {
                        data?.response?.data !== null && data?.response?.data !== undefined ?
                        data?.response?.data.map((user, index) => {
                            return (
                                <PopoverUser userId={user.user?.id} side="left" key={index} isGroup={true}>
                                    <UserButton variant={"ghost"}
                                    className="w-52 h-12 hover:bg-neutral-600 gap-2 flex justify-start group mt-1">
                                        <UserAvatar user={user.user} className="w-10 h-10 text-xs" status="hidden"/>
                                        <p className="w-[calc(100%-40px)] truncate text-left">
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