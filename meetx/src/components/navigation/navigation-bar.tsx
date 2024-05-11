import { GroupDTO } from "openapi/requests/types.gen";
import { ModeToggle } from "../themes/mode-toggle";
import { Separator } from "../ui/separator";
import AddGroup from "./add-group";
import Group from "./group";
import Profile from "./profile";

const NavigationBar = (props: { groups: Array<GroupDTO> | null | undefined }) => {
    return ( 
    <div className="w-16 bg-[rgba(17,20,28,1)] flex items-center flex-col gap-3 py-2 box-border">
        <Profile id="0"/>
        <Separator className="bg-neutral-600 w-3/4"></Separator>
        {
            props.groups !== null && props.groups !== undefined && props.groups.length !== 0 ?
            <div className="w-full flex items-center flex-col gap-3 overflow-auto">
                {props.groups.map(function(group : GroupDTO){
                    return (
                        <Group key={group.id} group={group}></Group>
                    )
                })}
            </div> : null
        }
        <AddGroup/>
        <Separator className="bg-neutral-600 w-3/4"></Separator>
        <ModeToggle></ModeToggle>
    </div>
    );
}
 
export default NavigationBar;