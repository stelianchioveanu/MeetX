import { useAppDispatch } from "@/application/store";
import { Button } from "../ui/button";
import { setTopic } from "@/application/state-slices";
import { TopicDTO } from "../../../openapi/requests/types.gen";
import Linkify from 'react-linkify';

const GroupTopic = (props: {topic : TopicDTO}) => {
    const linkifyDecorator = (href: string, text: string, key: number) => (
        <a href={href} key={key} className="link" target="_blank" rel="noopener noreferrer">
          link
        </a>
    );
    const dispatch = useAppDispatch();
    return (
    <Button variant="ghost" className="w-full max-w-56 flex justify-start text-white hover:bg-neutral-600 hover:text-white"
        onClick={() => {props.topic.id !== undefined ? dispatch(setTopic(props.topic.id)) : null;}}>
        <Linkify componentDecorator={linkifyDecorator}>
            <p className="truncate">
                #{props.topic.title}
            </p>
        </Linkify>
    </Button> );
}
 
export default GroupTopic;