import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import GroupTopic from "./group-topic";
import AddTopic from "./add-topic";
import { ScrollArea } from "../ui/scroll-area";

const GroupFrame = (props : {id: Number}) => {
    const group = {name: "Cel mai tare grup", id: 1, color: "#FF0000"}

    return (
    <div className="h-full w-60 bg-[#171b25] flex flex-col gap-4 items-center">
        <div className="w-full h-12 shadow-lg flex items-center p-3 text-white">{group.name}</div>
        <AddTopic/>
        <Separator className="bg-neutral-600 w-4/5"/>
        <ScrollArea className="flex w-full flex-col p-2">
            <div className="min-h-12 flex items-center mb-2 px-2">
                #Recent topics
            </div>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <div className="min-h-12 flex items-center mb-2 px-2">
                #Your topics
            </div>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
            <GroupTopic></GroupTopic>
        </ScrollArea>
        <Separator className="bg-neutral-600 w-4/5"/>
        <Button className="w-3/4 mb-4
        bg-red-700 text-white
        hover:bg-red-900 hover:text-neutral-100">
            Leave Group
        </Button>
    </div> );
}
 
export default GroupFrame;