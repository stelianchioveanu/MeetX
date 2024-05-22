import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import TopicScrollItem from "./topic-scroll-item";
import { TopicDTO } from "../../../openapi/requests/types.gen";
import { useTopicServiceGetApiTopicGetTopicsKey } from "../../../openapi/queries/common";
import { TopicService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";

const GroupPage = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);

    const {data} = useQuery({
        queryKey: [useTopicServiceGetApiTopicGetTopicsKey, selectedGroupId],
        queryFn: () => {
            return TopicService.getApiTopicGetTopics({groupId: selectedGroupId ? selectedGroupId : undefined});
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get topics failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    return ( 
    <div className="w-[calc(100%-304px)] h-full flex flex-col p-10 gap-5">
        <div className="flex flex-col gap-2">
            <p className="text-xl font-bolt">Search Topic</p>
            <Input className="bg-transparent"/>
        </div>
        <ScrollArea className="w-full h-full">
            {
                data?.response?.data?.map(function(topic : TopicDTO){
                    return (
                        <TopicScrollItem key={topic.id} topic={topic}/>
                    )
                })
            }
        </ScrollArea>
    </div>
    );
}
 
export default GroupPage;