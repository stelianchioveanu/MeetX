import { TopicDTO } from "openapi/requests/types.gen";
import { Button } from "../ui/button";
import PopoverUser from "../users-tab/popover-user";
import UserAvatar from "../users-tab/user-avatar";
import Linkify from 'react-linkify';

const Topic = (props: {topic: TopicDTO}) => {
    const linkifyDecorator = (href: string, text: string, key: number) => (
        <a href={href} key={key} className="link" target="_blank" rel="noopener noreferrer">
          link
        </a>
    );

    return (
    <div className="w-[calc(100%-118px)] h-fit flex gap-3">
        <UserAvatar status="hidden" user={props.topic?.user?.user} className="h-10 min-w-10 text-xs"/>
        <div className="w-[calc(100%-40px)] flex flex-col gap-2">
            <div className="w-[90%] flex items-center gap-2">
                <PopoverUser userId={props.topic.user?.user?.id} isGroup={true} side="right">
                    <Button variant={"link"} className="p-0 text-base font-semibold w-fit max-w-[calc(100%-144px)]">
                        <p className="truncate text-white">
                            {props.topic?.user?.user?.name}
                        </p>
                    </Button>
                </PopoverUser>
                <p className="text-white dark:text-gray-500 text-xs min-w-36 float-right">{props.topic.createdDate}</p>
            </div>
            <Linkify componentDecorator={linkifyDecorator}><p className="text-[18px] max-w-[90%] truncate text-white"># {props.topic?.title}</p></Linkify>
            <Linkify componentDecorator={linkifyDecorator}><p className="text-[18px] max-w-[90%] truncate text-white">{props.topic?.description}</p></Linkify>
        </div>
    </div>
    );
}
 
export default Topic;