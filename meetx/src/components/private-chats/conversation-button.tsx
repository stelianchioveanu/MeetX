import { useAppDispatch } from "@/application/store";
import { PrivateConversationDTO } from "../../../openapi/requests/types.gen";
import { Button } from "../ui/button";
import UserAvatar from "../users-tab/user-avatar";
import { setConv } from "@/application/state-slices";

const ConversationButton = (props: {conv: PrivateConversationDTO, }) => {
    const dispatch = useAppDispatch();
    return (
    <Button variant="ghost" className="w-full h-fit max-w-56 flex justify-start text-white hover:bg-neutral-600 hover:text-white gap-3"
    onClick={() => {dispatch(setConv(props.conv.id === undefined ? "0" : props.conv.id))}}>
        <UserAvatar user={props.conv.user1?.name !== undefined && props.conv.user1.name !== null ? props.conv.user1 : props.conv.user2} className="w-11 h-11" status="visible"/>
        <p className="truncate w-full max-w-[130px] text-left">
            {props.conv.user1?.name !== undefined && props.conv.user1.name !== null ? props.conv.user1?.name : props.conv.user2?.name}
        </p>
    </Button> );
}
 
export default ConversationButton;