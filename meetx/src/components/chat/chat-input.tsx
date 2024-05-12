import { PlusCircle, SmileIcon, X } from "lucide-react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import data from '@emoji-mart/data'
import Picker  from '@emoji-mart/react'
import FilesUpload from "./files-upload";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppSelector } from "@/application/store";
import Connector from '../../signalRConnection/signalr-connection'

const ChatInput = () => {
    const [input, setInput] = useState("");
    const [emojiOpened, setEmojiOpened] = useState(false);
    const [uploaderOpened, setUploaderOpened] = useState(false);
    const ref = useDetectClickOutside({ onTriggered: () => setUploaderOpened(false) });
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { token } = useAppSelector(x => x.profileReducer);
    const { newMessage } = Connector(token ? token : "");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onEmojiClick = (emojiObject:any) => {
        setEmojiOpened(false);
        setInput(input + emojiObject.native);
    };

    const closePicker = () => {
        setEmojiOpened(false)
    }

    const closeUploader = () => {
        setUploaderOpened(false);
    }

    const openPicker = (e:MouseEvent) => {
        e.stopPropagation();
        setEmojiOpened(true);
    }

    const openUploader = (e:MouseEvent) => {
        e.stopPropagation();
        setUploaderOpened(true);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        newMessage(selectedGroupId ? selectedGroupId : "", selectedTopicId ? selectedTopicId : "", "", input);
        setInput("");
      };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
      };

    return (
    <form className="max-h-[45px] bg-[#68738f] rounded-md flex
    items-center px-3 gap-2 relative w-full" onSubmit={handleSubmit}>
        {
            uploaderOpened !== true ?
            <PlusCircle fill="#68738f" className="w-7 h-7 text-[#d8ddeb]" onClick={openUploader}/> :
            <>
                <X className="w-7 h-7 text-[#d8ddeb]" onClick={closeUploader}/>
                <FilesUpload innerRef={ref}/>
            </>
        }
        <input className=" h-[45px] text-[#d8ddeb] bg-transparent
        focus-visible:outline-none grow" placeholder="#Type here"
        value={input} onChange={handleChange} onKeyDown={handleKeyPress} />
        {
            emojiOpened !== true ?
            <SmileIcon id="slime" className="w-7 h-7 text-[#d8ddeb]"
            onClick={openPicker}/>:
            <>
                <X className="w-7 h-7 text-[#d8ddeb]"
                onClick={closePicker}/>
                <div className="absolute right-0 bottom-12">
                    <Picker data={data} onEmojiSelect={onEmojiClick}
                    onClickOutside={closePicker}/>
                </div>
            </>
        }
    </form> );
}
 
export default ChatInput;