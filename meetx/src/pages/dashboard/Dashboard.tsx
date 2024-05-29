import ChatFrame from "@/components/chat/chat-frame";
import GroupPage from "@/components/group-page/group-page";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import PrivateFrame from "@/components/private-chats/private-frame";
import { useQuery } from "@tanstack/react-query";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { GroupService } from "../../../openapi/requests/services.gen";
import { toast } from "react-toastify";
import { useAppSelector } from "@/application/store";
import { useEffect } from "react";
import Connector from '../../signalRConnection/signalr-connection';
import ProfileFrame from "@/components/profile/profile-frame";

const Dashboard = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);

    const {data, status} = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupsKey],
        queryFn: () => {
            return GroupService.getApiGroupGetGroups();
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get groups failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    useEffect(() => {if(status === "success") Connector()}, [status, data])

    return (
        <div className="w-full h-screen flex bg-[#272d3d] font">
            <NavigationBar groups={data?.response?.data}/>
            {
                selectedGroupId === "0" ?
                    <PrivateFrame/> :
                    null
            }
            {
                selectedGroupId === "0" && selectedConvId !== "0" ?
                    <ChatFrame isGroup={false}/> :
                    null
            }
            {
                selectedGroupId === "0" && selectedConvId === "0" ?
                    <ProfileFrame/> :
                    null
            }
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