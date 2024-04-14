import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import PopoverUser, { UserInfo } from "../users-tab/popover-user";

export interface UserMessage extends UserInfo {
    message: string,
    files: any,
    messageDate: string
}

const MessageItem = (props: {userMessage: UserMessage, className?: string}) => {
    return (
    <div className={cn("w-full h-fit py-2 hover:bg-[#00000020] flex gap-3 p-2", props.className)}>
        <img className="w-10 h-10 rounded-full" src={props.userMessage.img}/>
        <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
                <PopoverUser user={props.userMessage} side="right">
                    <Button variant={"link"} className="p-0 text-base font-semibold">
                        {props.userMessage.username}
                    </Button>
                </PopoverUser>
                <p className="text-gray-500 text-xs">{props.userMessage.messageDate}</p>
            </div>
            <p className="flex text-[14px]">{props.userMessage.message}</p>
        </div>
    </div>);
}
 
export default MessageItem;