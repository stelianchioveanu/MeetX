import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import PopoverUser from "../users-tab/popover-user";
import UserAvatar from "../users-tab/user-avatar";
import { FileGetDTO, MessageDTO } from "../../../openapi/requests/types.gen";
import FileMessageCard from "./file-message-card";

const MessageItem = (props: {message: MessageDTO, className?: string, isGroup: boolean}) => {
    return (
    <div className={cn("w-full h-fit py-2 hover:bg-[#00000020] flex gap-3 p-2", props.className)}>
        <UserAvatar status="hidden" user={props.message.user?.user} className="h-10 min-w-10"/>
        <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
                <PopoverUser member={props.message.user} side="right">
                    <Button variant={"link"} className="p-0 text-base font-semibold">
                        {props.message.user?.user?.name}
                    </Button>
                </PopoverUser>
                <p className="text-gray-500 text-xs">{props.message.createdDate}</p>
            </div>
            <p className="flex text-[14px]">{props.message.text}</p>
            <div className="w-full h-fit flex flex-wrap gap-3">
                {
                    props.message.files?.map(function(file : FileGetDTO, id){
                        return (
                            <FileMessageCard key={id} file={file} isGroup={props.isGroup}/>
                        )
                    })
                }
            </div>
        </div>
    </div>);
}
 
export default MessageItem;