import { UserRound } from "lucide-react";
import NavigationItem from "./navigation-item";

const Profile = (props: {id: string}) => {
    return (
        <NavigationItem id={props.id}>
            <div className="bg-red-700 h-full w-full grid place-content-center">
                <UserRound color="white" />
            </div>
        </NavigationItem>
    );
}
 
export default Profile;