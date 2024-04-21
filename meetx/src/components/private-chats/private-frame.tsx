import { ScrollArea } from "../ui/scroll-area";
import { UserInfo } from "../users-tab/popover-user";
import ConversationButton from "./conversation-button";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"

const PrivateFrame = (props: {setSelectedConvId: any}) => {
    const user:UserInfo = {
        date: "10-3-2023",
        status: true,
        username: "stelicas",
        img: stelicas,
        email: "stelian.chioveanu@yahoo.com"
    }
    return (
    <div className="h-full w-60 bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">Private Chats</div>
        <ScrollArea className="flex w-full flex-col p-2">
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
            <ConversationButton user={user} setSelectedConvId={props.setSelectedConvId}/>
        </ScrollArea>
    </div> );
}
 
export default PrivateFrame;