import UserButton from "./user-button";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"
import { ScrollArea } from "../ui/scroll-area";
import PopoverUser, { UserInfo } from "./popover-user";
import UserAvatar from "./user-avatar";

const GroupUsers = () => {
    const users:UserInfo[] = [{username: "stelicas",
    email: "stelian.chioveanu@yahoo.com", date: "February 17, 2024",
    status: true, img: stelicas}, {username: "mihai",
    email: "mihai.chioveanu@yahoo.com", date: "February 20, 2024",
    status: false, img: stelicas}];

    return (
    <div className="min-w-60 h-full flex justify-center bg-[#171b25]">
        <ScrollArea className="max-h-full bg-[#171b25] flex flex-col items-center py-6">
            <p className="w-52 min-h-12 flex items-center mb-2">
                #Me
            </p>
            <PopoverUser user={users[0]} side="left">
                <UserButton variant={"ghost"}
                className="w-52 h-12 hover:bg-neutral-600 gap-2 flex justify-start group">
                    <UserAvatar user={users[0]} className="w-10 h-10" status="visible"/>
                    {users[0].username}
                </UserButton>
            </PopoverUser>
            <p className="w-52 min-h-12 flex items-center my-2">
                #Other members
            </p>
            {
                users.map((user, index) => {
                    return (
                        <PopoverUser user={user} side="left" key={index}>
                            <UserButton variant={"ghost"}
                            className="w-52 h-12 hover:bg-neutral-600 gap-2 flex justify-start group">
                                <UserAvatar user={user} className="w-10 h-10" status="visible"/>
                                {user.username}
                            </UserButton>
                        </PopoverUser>
                    );
                })
            }
        </ScrollArea>
    </div>);
}
 
export default GroupUsers;