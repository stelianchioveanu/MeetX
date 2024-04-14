import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode } from "react";
import UserAvatar from "./user-avatar";
import { Input } from "../ui/input";

export interface UserInfo{
    date: string;
    status: boolean;
    username: string;
    img: any;
    email: string;
}

const PopoverUser = (props: {children: ReactNode, user: UserInfo, side: any}) => {
    return ( 
        <Popover>
            <PopoverTrigger asChild>
                {props.children}
            </PopoverTrigger>
            <PopoverContent  hideWhenDetached side={props.side} sideOffset={30} className="h-fit
            w-64 flex flex-col bg-[#171b25] p-0 rounded-md overflow-hidden">
                <div className="bg-purple-700 w-full h-14"></div>
                <div className="w-52 h-14 relative">
                    <UserAvatar user={props.user} className="w-20 h-20 absolute bottom-4 left-3" status="visible"/>
                </div>
                <div className="flex flex-col p-3 gap-1">
                    <p className=" text-purple-700 text-xl font-semibold">
                        {props.user.username}
                    </p>
                    <p className="text-sm">
                        {props.user.email}
                    </p>
                    <p className="text-xs text-[#5c6682]">
                        Registered since: {props.user.date}
                    </p>
                </div>
                <div className="p-3">
                    <Input className="bg-transparent border-[#272D3D]" placeholder="#Send message"/>
                </div>
            </PopoverContent>
        </Popover>
     );
}
 
export default PopoverUser;