import ChatFrame from "@/components/chat/chat-frame";
import GroupPage from "@/components/group-page/group-page";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import PrivateFrame from "@/components/private-chats/private-frame";
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";

const Dashboard = () => {
    const {refresh} = useRefreshToken();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { token } = useAppSelector(x => x.profileReducer);

    const {data} = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupsKey],
        queryFn: () => {
            return GroupService.getApiGroupGetGroups();
        },
        retry(failureCount, error) {
            if (failureCount > 0) {
                toast("Get groups failed! Please try again later!");
                return false;
            }
            refresh();
            return true;
        },
        retryDelay: 0
    });

    const topic = {name: "# Topic 1", id: 1}
    const user1 = {name: "stelicas", id: 1}

    return (
        <div className="w-full h-screen flex bg-[#272d3d] font">
            <NavigationBar groups={data?.response?.data}/>
            {/* {
                selectedGroupId === "0" ?
                    <PrivateFrame setSelectedConvId={setSelectedConvId}/> :
                    null
            }
            {
                selectedGroupId === "0" && selectedConvId !== "0" ?
                    <ChatFrame topText={user1} isGroup={false}/> :
                    null
            }
            {
                selectedGroupId === "0" && selectedConvId === "0" ?
                    <GroupPage setSelectedTopicId={setSelectedTopicId}/> :
                    null
            } */}
            {
                selectedGroupId !== "0" ?
                    <GroupFrame/> : 
                    null
            }
            {
                selectedGroupId !== "0" && selectedTopicId !== "0" ? 
                    <ChatFrame isGroup={true}/> :
                    null
            }
            {
                selectedGroupId !== "0" && selectedTopicId === "0" ?
                    <GroupPage/> :
                    null
            }
        </div>
    );
}
 
export default Dashboard;