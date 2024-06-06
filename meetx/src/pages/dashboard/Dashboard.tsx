import ChatFrame from "@/components/chat/chat-frame";
import GroupPage from "@/components/group-page/group-page";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import PrivateFrame from "@/components/private-chats/private-frame";
import { useAppDispatch, useAppSelector } from "@/application/store";
import ProfileFrame from "@/components/profile/profile-frame";
import Connector from '../../signalRConnection/signalr-connection';
import { setGroup, setTopic } from "@/application/state-slices";
import { toast } from "react-toastify";
import { ErrorCodes } from "../../../openapi/requests/types.gen";
import { useEffect } from "react";

const Dashboard = () => {
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    const connector = Connector();
    
    useEffect(() => {
        connector.startConnection();
    }, [])
    
    const messageHandler = (message : ErrorCodes) => {
        if (message === "GroupNotFound") {
            dispatch(setGroup("0"));
            toast.error("Group doesn't exist!");
        } else if (message === "NotAMember") {
            dispatch(setGroup("0"));
            toast.error("Your are not part of the group");
        } else if (message === "ConvNotFound") {
            dispatch(setGroup("0"));
            toast.error("Conversation doesn't exist!");
        } else if (message === "TopicNotFound") {
            dispatch(setTopic("0"));
            toast.error("Topic doesn't exist!");
        }
    };
    connector.error(messageHandler);

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