import { Button } from "../ui/button";

const UserButton = (props: {username: String, img: any, status: boolean}) => {
    const className = "w-[10px] h-[10px] rounded-full absolute right-[4px] bottom-[4px] "
    return (
    <Button className="w-52 h-12 hover:bg-neutral-600 gap-2
    flex justify-start group" variant="ghost">
        <div className="w-10 h-10 relative">
            <img src={props.img} className="w-full h-full
            rounded-full"/>
            <div className="w-[18px] h-[18px] bg-[#171b25]
            rounded-full absolute right-0 bottom-0
            group-hover:bg-neutral-600 transition-colors"/>
            <div className={className + (props.status ? "bg-green-600" : "bg-neutral-400")}/>
        </div>
        {props.username}
    </Button> );
}
 
export default UserButton;