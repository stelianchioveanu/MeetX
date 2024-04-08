import ChatFrame from "@/components/chat/chat-frame";
import GroupFrame from "@/components/group/group-frame";
import NavigationBar from "@/components/navigation/navigation-bar";
import { useState } from "react";

const Dashboard = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [groups, setGroups] = useState([{name: "CN", id: 1, color: "#FF0000"}, {name: "CL", id: 2, color: "#00FF00"}, {name: "CB", id: 3, color: "#0000ff"}]);
    const topic = {name: "# Topic 1", id: 1}

    return ( 
    <div className="w-full h-screen flex bg-[#272d3d] font">
        <NavigationBar setSelectedId={setSelectedId} selectedId={selectedId} groups={groups}/>
        { selectedId !== 0 ?
        <GroupFrame id={selectedId}/> : 
        null}
        { selectedId !== 0 ? 
        <ChatFrame topic={topic}/> :
        null
        }
    </div>
    );
}
 
export default Dashboard;