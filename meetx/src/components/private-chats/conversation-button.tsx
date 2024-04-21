import { Button } from "../ui/button";
import { UserInfo } from "../users-tab/popover-user";
import UserAvatar from "../users-tab/user-avatar";

const ConversationButton = (props: {setSelectedConvId: any, user: UserInfo, }) => {
    const conv = 1;
    return (
    <Button variant="ghost" className="w-full h-14 flex justify-start text-white hover:bg-neutral-600 hover:text-white gap-3"
    onClick={() => {props.setSelectedConvId(conv)}}>
        <UserAvatar user={props.user} className="w-11 h-11" status="visible"/>
        <p className="w-2 truncate-to-2-lines">
            biaiafu anf anfukanfkanf ahbvhbaa
        </p>
    </Button> );
}
 
export default ConversationButton;