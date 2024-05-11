import { GroupDTO } from "openapi/requests/types.gen";
import NavigationItem from "./navigation-item";

const Group = (props: {group :GroupDTO}) => {
    return ( 
        <NavigationItem id={props.group.id}>
            <div style={{backgroundColor: "" + props.group.color
            }} className={`h-full w-full grid place-content-center text-white`}>
                {props.group.shortName}
            </div>
        </NavigationItem>
    );
}
 
export default Group;