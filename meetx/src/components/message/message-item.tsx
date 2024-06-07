import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import PopoverUser from "../users-tab/popover-user";
import UserAvatar from "../users-tab/user-avatar";
import { FileGetDTO, MessageDTO } from "../../../openapi/requests/types.gen";
import FileMessageCard from "./file-message-card";
import Linkify from 'react-linkify';

const MessageItem = (props: {message: MessageDTO, className?: string, isGroup: boolean, isTopic: boolean, topic: string | null | undefined}) => {
    const linkifyDecorator = (href: string, text: string, key: number) => (
        <a href={href} key={key} className="link" target="_blank" rel="noopener noreferrer">
          link
        </a>
    );
    
    return (
    <div className={cn("w-full h-fit py-2 hover:bg-[#00000020] flex gap-3 p-2", props.className)}>
        <UserAvatar status="hidden" user={props.message.user?.user} className="h-10 min-w-10 text-xs"/>
        <div className="flex w-full flex-col">
            <div className="flex items-center gap-2 w-[95%]">
                <PopoverUser userId={props.message.user?.user?.id} side="right" isGroup={props.isGroup}>
                    <Button variant={"link"} className="p-0 text-base font-semibold w-fit max-w-[calc(100%-144px)]">
                        <p className="truncate text-white">
                            {props.message?.user?.user?.name}
                        </p>
                    </Button>
                </PopoverUser>
                <p className={"text-xs min-w-36 float-right " + (props.isTopic ? "text-white" : "dark:text-gray-500 text-white")}>{props.message.createdDate}</p>
            </div>
            {
                props.isTopic ?
                <Linkify componentDecorator={linkifyDecorator}>
                    <p className="text-lg mb-2 text-white">
                        #{props.topic}
                    </p>
                </Linkify> : null
            }
            <Linkify componentDecorator={linkifyDecorator}><p className="text-[14px] text-white">{props.message.text}</p></Linkify>
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