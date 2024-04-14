import { Button } from "../ui/button";
import PopoverUser, { UserInfo } from "../users-tab/popover-user";
import UserAvatar from "../users-tab/user-avatar";

export interface TopicInfo {
    title: string,
    message: string,
    user: UserInfo,
    answers: number
}

const Topic = (props: {topic: TopicInfo}) => {
    return (
    <div className="w-full h-fit flex gap-3">
        <UserAvatar status="hidden" user={props.topic.user} className="h-10 min-w-10"/>
        <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
                <PopoverUser user={props.topic.user} side="right">
                    <Button variant={"link"} className="p-0 text-base font-semibold">
                        {props.topic.user.username}
                    </Button>
                </PopoverUser>
                <p className="text-gray-500 text-xs">{props.topic.user.date}</p>
            </div>
            <p className="flex text-[18px] w-full overflow-hidden truncate-to-2-lines"># {props.topic.title}</p>
            <p className="flex text-[14px] w-full overflow-hidden truncate-to-2-lines">{props.topic.message}</p>
        </div>
    </div>
    );
}
 
export default Topic;