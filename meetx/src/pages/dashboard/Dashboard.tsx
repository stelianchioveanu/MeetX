import ChatFrame from "@/components/chat/chat-frame";
import GroupPage from "@/components/group-page/group-page";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import PrivateFrame from "@/components/private-chats/private-frame";
import { useState } from "react";

const Dashboard = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [selectedTopicId, setSelectedTopicId] = useState(0);
    const [selectedConvId, setSelectedConvId] = useState(0);

    const [groups, setGroups] = useState([{name: "CN", id: 1, color: "#FF0000"}, {name: "CL", id: 2, color: "#00FF00"}, {name: "CB", id: 3, color: "#0000ff"}]);
    const topic = {name: "# Topic 1", id: 1}
    const user1 = {name: "stelicas", id: 1}

    const setGroupId = (id: any) => {
        setSelectedGroupId(id);
        setSelectedTopicId(0);
        setSelectedConvId(0);
    }

    return ( 
    <div className="w-full h-screen flex bg-[#272d3d] font">
        <NavigationBar setSelectedId={setGroupId} selectedId={selectedGroupId} groups={groups}/>
        {
            selectedGroupId === 0 ?
                <PrivateFrame setSelectedConvId={setSelectedConvId}/> :
                null
        }
        {
            selectedGroupId === 0 && selectedConvId !== 0 ?
                <ChatFrame topText={user1} isGroup={false}/> :
                null
        }
        {
            selectedGroupId === 0 && selectedConvId === 0 ?
                <GroupPage setSelectedTopicId={setSelectedTopicId}/> :
                null
        }
        {
            selectedGroupId !== 0 ?
                <GroupFrame setSelectedTopicId={setSelectedTopicId}/> : 
                null}
        {
            selectedGroupId !== 0 && selectedTopicId !== 0 ? 
                <ChatFrame topText={topic} isGroup={true}/> :
                null
        }
        {
            selectedGroupId !== 0 && selectedTopicId === 0 ?
                <GroupPage setSelectedTopicId={setSelectedTopicId}/> :
                null
        }
    </div>
    );
}
 
export default Dashboard;