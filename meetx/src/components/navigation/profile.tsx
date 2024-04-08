import { UserRound } from "lucide-react";
import NavigationItem from "./navigation-item";

const Profile = (props: {selectedId: Number, setSelectedId: any, id: Number}) => {
    return (
        <NavigationItem selectedId={props.selectedId} setSelectedId={props.setSelectedId} id={props.id}>
            <div className="bg-red-700 h-full w-full grid place-content-center">
                <UserRound color="white" />
            </div>
        </NavigationItem>
    );
}
 
export default Profile;