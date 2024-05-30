import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import UserAvatar from "./user-avatar";
import { Input } from "../ui/input";
import { useAppSelector } from "@/application/store";
import RemoveUser from "./remove-user";
import ChangeRole from "./change-role";
import Connector from '../../signalRConnection/signalr-connection'
import { useQuery } from "@tanstack/react-query";
import { GroupService, UserService } from "../../../openapi/requests/services.gen";
import { NIL as NIL_UUID } from 'uuid';
import { toast } from "react-toastify";
import { useGroupServiceGetApiGroupGetMemberKey, useUserServiceGetApiUserGetByIdByIdKey } from "../../../openapi/queries/common";

const PopoverUser = (props: {children: ReactNode, userId?: string, side: any, isGroup: boolean}) => {
    const { userId } = useAppSelector(x => x.profileReducer);
    const { isAdmin, selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const [input, setInput] = useState("");
    const { newPrivateMessage } = Connector();
    const [opened, setOpened] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const user = useQuery({
        queryKey: [useUserServiceGetApiUserGetByIdByIdKey],
        queryFn: () => {
            return UserService.getApiUserGetByIdById({id: props.userId === undefined ? NIL_UUID : props.userId});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get user failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0,
        enabled: false
    });

    const member = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetMemberKey],
        queryFn: () => {
            return GroupService.getApiGroupGetMember({userId: props.userId, groupId: selectedGroupId ? selectedGroupId : NIL_UUID});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get member failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0,
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
        <Popover onOpenChange={(open) => setOpened(open)}>
            <PopoverTrigger asChild>
                {props.children}
            </PopoverTrigger>
            <PopoverContent  hideWhenDetached side={props.side} sideOffset={30} className="h-fit
            w-64 flex flex-col bg-[#171b25] p-0 rounded-md overflow-hidden">
                <div className="bg-purple-700 w-full h-14"></div>
                <div className="w-52 h-14 relative">
                    <UserAvatar user={props.isGroup ? member.data?.response?.user :
                        user.data?.response} className="w-20 h-20 absolute bottom-4 left-3 text-2xl" status="visible"/>
                </div>
                <div className="flex flex-col p-3 gap-1">
                    {props.isGroup ?
                    <p className=" text-[#248379]">
                        {member.data?.response?.isAdmin ? "Admin" : "Member"}
                    </p> : null }
                    <p className=" text-purple-700 text-xl font-semibold">
                        {props.isGroup ? member.data?.response?.user?.name :
                        user.data?.response?.name}
                    </p>
                    <p className="text-sm">
                        {props.isGroup ? member.data?.response?.user?.email :
                        user.data?.response?.email}
                    </p>
                    <p className="text-xs text-[#5c6682]">
                        Registered since: {props.isGroup ? member.data?.response?.user?.registeredDate :
                        user.data?.response?.registeredDate}
                    </p>
                </div>
                {props.isGroup && member.data?.response?.user?.id !== userId && isAdmin ?
                <div className="flex px-3 gap-2">
                    <ChangeRole userId={member.data?.response?.user?.id} isAdmin={member.data?.response?.isAdmin}/>
                    <RemoveUser userId={member.data?.response?.user?.id}/>
                </div> : null }
                {(props.isGroup ? member.data?.response?.user?.id !== userId : user.data?.response?.id !== userId) ?
                    <div className="p-3">
                        <Input className="bg-transparent border-[#272D3D]" placeholder="#Send message" value={input}
                        onChange={handleChange} onKeyDown={handleKeyPress} />
                    </div> : null
                }
            </PopoverContent>
        </Popover>
     );
}
 
export default PopoverUser;