import { cn } from "@/lib/utils"
import { UserInfo } from "./popover-user";


const UserAvatar = (props: {user: UserInfo, className: String}) => {
    const className = "w-[20%] h-[20%] rounded-full absolute right-[8%] bottom-[8%] "
    return (
    <div className={cn("relative", props.className)}>
        <img src={props.user.img} className="w-full h-full
        rounded-full"/>
        <div className="w-[36%] h-[36%] bg-[#171b25]
        rounded-full absolute right-0 bottom-0
        group-hover:bg-neutral-600 transition-colors"/>
        <div className={className + (props.user.status ? "bg-green-600" : "bg-neutral-400")}/>
    </div> );
}
 
export default UserAvatar;