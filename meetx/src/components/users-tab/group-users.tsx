import UserButton from "./user-button";
import { ScrollArea } from "../ui/scroll-area";
import PopoverUser from "./popover-user";
import UserAvatar from "./user-avatar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupMembersKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";

const GroupUsers = () => {
    const [page, setPage] = useState(1);
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);

    const { data } = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey],
        queryFn: () => {
            return GroupService.getApiGroupGetGroupMembers({page: page, groupId: selectedGroupId ? selectedGroupId : undefined});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get group members failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    return (
    <div className="max-w-full float-right h-full flex justify-center bg-[#171b25] p-3">
        <ScrollArea className="max-h-full bg-[#171b25] flex flex-col items-center py-6 px-2">
            <p className="w-52 min-h-12 flex items-center my-2">
                #Members
            </p>
            {
                data?.response?.data !== null && data?.response?.data !== undefined ?
                data?.response?.data.map((user, index) => {
                    return (
                        <PopoverUser member={user} side="left" key={index}>
                            <UserButton variant={"ghost"}
                            className="w-52 h-12 hover:bg-neutral-600 gap-2 flex justify-start group mt-1">
                                <UserAvatar user={user.user} className="w-10 h-10" status="visible"/>
                                {user.user?.name}
                            </UserButton>
                        </PopoverUser>
                    );
                }) : null
            }
        </ScrollArea>
    </div>);
}
 
export default GroupUsers;