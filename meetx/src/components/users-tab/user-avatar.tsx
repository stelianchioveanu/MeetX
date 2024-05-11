import { cn } from "@/lib/utils"
import { UserDTO } from "openapi/requests/types.gen";
import stelian from "../../pages/home/sections/img/stelian.jpeg"


const UserAvatar = (props: {user?: UserDTO, className: String, status: "hidden" | "visible"}) => {
    const className = "w-[20%] h-[20%] rounded-full absolute right-[8%] bottom-[8%] "
    return (
    <div className={cn("relative", props.className)}>
        <img src={stelian} className="w-full h-full
        rounded-full"/>
        {
            props.status === "visible" ?
            <>
                <div className="w-[36%] h-[36%] bg-[#171b25]
                rounded-full absolute right-0 bottom-0
                group-hover:bg-neutral-600 transition-colors"/>
                <div className={className + (true ? "bg-green-600" : "bg-neutral-400")}/>
            </> :
            null
        }
    </div> );
}
 
export default UserAvatar;