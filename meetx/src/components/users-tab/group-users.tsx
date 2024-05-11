import UserButton from "./user-button";
import { ScrollArea } from "../ui/scroll-area";
import PopoverUser from "./popover-user";
import UserAvatar from "./user-avatar";
import { UserDTO } from "../../../openapi/requests/types.gen";

const GroupUsers = () => {
    const users:UserDTO[] = [{name: "stelicas",
    email: "stelian.chioveanu@yahoo.com"}, {name: "mihai",
    email: "mihai.chioveanu@yahoo.com"}];

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
                    {users[0].name}
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
                                {user.name}
                            </UserButton>
                        </PopoverUser>
                    );
                })
            }
        </ScrollArea>
    </div>);
}
 
export default GroupUsers;