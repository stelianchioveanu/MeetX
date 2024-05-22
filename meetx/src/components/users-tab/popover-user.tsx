import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChangeEvent, ReactNode, useState } from "react";
import UserAvatar from "./user-avatar";
import { Input } from "../ui/input";
import { GroupMemberDTO } from "../../../openapi/requests/types.gen";
import { useAppSelector } from "@/application/store";
import RemoveUser from "./remove-user";
import ChangeRole from "./change-role";
import Connector from '../../signalRConnection/signalr-connection'

const PopoverUser = (props: {children: ReactNode, member?: GroupMemberDTO, side: any}) => {
    const { userId } = useAppSelector(x => x.profileReducer);
    const { isAdmin } = useAppSelector(x => x.selectedReducer);
    const [input, setInput] = useState("");
    const { newPrivateMessage } = Connector();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        newPrivateMessage(props.member?.user?.id === undefined ? "" : props.member?.user?.id, input, null);
        setInput("");
      };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
    };

    return ( 
        <Popover>
            <PopoverTrigger asChild>
                {props.children}
            </PopoverTrigger>
            <PopoverContent  hideWhenDetached side={props.side} sideOffset={30} className="h-fit
            w-64 flex flex-col bg-[#171b25] p-0 rounded-md overflow-hidden">
                <div className="bg-purple-700 w-full h-14"></div>
                <div className="w-52 h-14 relative">
                    <UserAvatar user={props.member?.user} className="w-20 h-20 absolute bottom-4 left-3" status="visible"/>
                </div>
                <div className="flex flex-col p-3 gap-1">
                    <p className=" text-[#248379]">
                        {props.member?.isAdmin ? "Admin" : "Member"}
                    </p>
                    <p className=" text-purple-700 text-xl font-semibold">
                        {props.member?.user?.name}
                    </p>
                    <p className="text-sm">
                        {props.member?.user?.email}
                    </p>
                    <p className="text-xs text-[#5c6682]">
                        Registered since: {props.member?.user?.registeredDate}
                    </p>
                </div>
                {props.member?.user?.id !== userId && isAdmin ?
                <div className="flex px-3 gap-2">
                    <ChangeRole userId={props.member?.user?.id} isAdmin={props.member?.isAdmin}/>
                    <RemoveUser userId={props.member?.user?.id}/>
                </div> : null }
                {props.member?.user?.id !== userId ?
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