import NavigationItem from "./navigation-item";

const Group = (props: {group :any, selectedId: Number, setSelectedId: any}) => {
    return ( 
        <NavigationItem selectedId={props.selectedId} setSelectedId={props.setSelectedId} id={props.group.id}>
            <div style={{backgroundColor: props.group.color}} className={`h-full w-full grid place-content-center text-white`}>
                {props.group.name}
            </div>
        </NavigationItem>
    );
}
 
export default Group;