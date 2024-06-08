import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import UserAvatar from "./user-avatar";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/application/store";
import RemoveUser from "./remove-user";
import ChangeRole from "./change-role";
import Connector from '../../signalRConnection/signalr-connection'
import { useQuery } from "@tanstack/react-query";
import { GroupService, UserService } from "../../../openapi/requests/services.gen";
import { NIL as NIL_UUID } from 'uuid';
import { useGroupServiceGetApiGroupGetMemberKey, useUserServiceGetApiUserGetByIdByIdKey } from "../../../openapi/queries/common";
import { fetchQuery } from "@/App";

const PopoverUser = (props: {children: ReactNode, userId?: string, side: any, isGroup: boolean}) => {
    const { userId } = useAppSelector(x => x.profileReducer);
    const { isAdmin, selectedGroupId, isPublic } = useAppSelector(x => x.selectedReducer);
    const [input, setInput] = useState("");
    const { newPrivateMessage } = Connector();
    const [opened, setOpened] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const user = useQuery({
        queryKey: [useUserServiceGetApiUserGetByIdByIdKey],
        queryFn: () => {
            return fetchQuery(UserService.getApiUserGetByIdById({id: props.userId === undefined ? NIL_UUID : props.userId}), dispatch);
        },
        retry: false,
        enabled: false
    });

    const member = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetMemberKey],
        queryFn: () => {
            return fetchQuery(GroupService.getApiGroupGetMember({userId: props.userId, groupId: selectedGroupId ? selectedGroupId : NIL_UUID}), dispatch);
        },
        retry: false,
        enabled: false
    });

    useEffect(() => {
        if (opened === true) {
            if (props.isGroup) {
                member.refetch();
            } else {
                user.refetch();
            }
        }
    }, [opened]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        newPrivateMessage(props.isGroup ? member.data?.response?.user?.id || NIL_UUID :
            user.data?.response?.id || NIL_UUID, input, null);
        setInput("");
      };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
    };

    return ( 
        <Popover open={opened} onOpenChange={(open) => setOpened(open)}>
            <PopoverTrigger asChild>
                {props.children}
            </PopoverTrigger>
            <PopoverContent  hideWhenDetached side={props.side} sideOffset={30} className="h-fit
            w-64 flex flex-col bg-[rgb(119,125,141)] dark:bg-[#171b25] p-0 rounded-md overflow-hidden border-[#00000000]">
                <div className="bg-[rgb(26,61,121)] dark:bg-purple-700 w-full h-14"></div>
                <div className="w-52 h-14 relative">
                    <UserAvatar user={props.isGroup ? member.data?.response?.user :
                        user.data?.response} className="w-20 h-20 absolute bottom-4 left-3 text-2xl" status="visible"/>
                </div>
                <div className="flex flex-col p-3 gap-1 font">
                    {props.isGroup ?
                        <p className="text-[rgb(172,199,248)] dark:text-[#244783]">
                            {member.data?.response?.user?.role === "Admin" || member.data?.response?.user?.role === "Staff" ? "Platform Staff" : null}
                        </p> :
                        <p className="text-purple-400 dark:text-[#244783]">
                            {user.data?.response?.role === "Admin" || user.data?.response?.role === "Staff" ? "Platform Staff" : null}
                        </p>
                    }

                    {props.isGroup ?
                    <p className="text-[rgb(106,201,191)] dark:text-[#248379]">
                        {member.data?.response?.isMember ? (isPublic ? "Member" : (member.data.response.isAdmin ? "Admin" : "Member")) : "Not a member"}
                    </p> : null }

                    <p className="text-[rgb(26,61,121)] dark:text-purple-700 text-xl font-semibold truncate">
                        {props.isGroup ? member.data?.response?.user?.name :
                        user.data?.response?.name}
                    </p>

                    <p className="text-sm truncate text-white">
                        {props.isGroup ? member.data?.response?.user?.email :
                        user.data?.response?.email}
                    </p>

                    <p className="text-xs text-[#a5adc3] dark:text-[#5c6682]">
                        Registered since: {props.isGroup ? member.data?.response?.user?.registeredDate :
                        user.data?.response?.registeredDate}
                    </p>

                </div>
                {props.isGroup && member.data?.response?.user?.id !== userId && isAdmin && member.data?.response?.isMember ?
                <div className="flex px-3 gap-2">
                    {
                        isPublic ? null :
                        <ChangeRole setOpened={setOpened} userId={member.data?.response?.user?.id} isAdmin={member.data?.response?.isAdmin}/>
                    }
                    <RemoveUser setOpened={setOpened} userId={member.data?.response?.user?.id}/>
                </div> : null }
                {(props.isGroup ? member.data?.response?.user?.id !== userId : user.data?.response?.id !== userId) ?
                    <div className="p-3">
                        <Input className="bg-transparent border-white placeholder:text-white" placeholder="#Send message" value={input}
                        onChange={handleChange} onKeyDown={handleKeyPress} maxLength={4095}/>
                    </div> : null
                }
            </PopoverContent>
        </Popover>
     );
}
 
export default PopoverUser;