import { ModeToggle } from "../themes/mode-toggle";
import { Separator } from "../ui/separator";
import Group from "./group";
import Profile from "./profile";

const NavigationBar = (props: { setSelectedId : any, selectedId: Number, groups: Array<any> }) => {
    return ( 
    <div className="w-16 bg-[rgba(17,20,28,1)] flex items-center flex-col gap-3 py-2 box-border">
        <Profile id={0} selectedId={props.selectedId} setSelectedId={props.setSelectedId}/>
        <Separator className="bg-neutral-600 w-3/4"></Separator>
        <div className="w-full flex items-center flex-col gap-3 overflow-auto no-scrollbar">
            {
                props.groups.map(function(group){
                    return (
                        <Group key={group.id} group={group} selectedId={props.selectedId} setSelectedId={props.setSelectedId}></Group>
                    )
                })
            }
        </div>
        <Separator className="bg-neutral-600 w-3/4"></Separator>
        <ModeToggle></ModeToggle>
    </div>
    );
}
 
export default NavigationBar;