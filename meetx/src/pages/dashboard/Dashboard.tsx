import ChatFrame from "@/components/chat/chat-frame";
import GroupPage from "@/components/group-page/group-page";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import PrivateFrame from "@/components/private-chats/private-frame";
import { useAppSelector } from "@/application/store";
import ProfileFrame from "@/components/profile/profile-frame";

const Dashboard = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);

    return (
        <div className="w-full h-screen flex bg-[#272d3d] font">
            <NavigationBar/>
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