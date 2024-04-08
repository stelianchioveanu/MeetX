import { PlusCircle, SmileIcon, X } from "lucide-react";
import { ChangeEvent, MouseEvent, useState } from "react";
import data from '@emoji-mart/data'
import Picker  from '@emoji-mart/react'

const ChatInput = () => {
    const [input, setInput] = useState("");
    const [emojiOpened, setEmojiOpened] = useState(false);

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

    const openPicker = (e:MouseEvent) => {
        e.stopPropagation();
        setEmojiOpened(true);
    }

    return (
    <div className="max-h-[45px] bg-[#68738f] rounded-md flex
    items-center px-3 gap-2 mt-auto relative w-full">
        <PlusCircle fill="#68738f" className="w-7 h-7 text-[#d8ddeb]" />
        <input className=" h-[45px] text-[#d8ddeb] bg-transparent
        focus-visible:outline-none grow" placeholder="#Type here"
        value={input} onChange={handleChange} />
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
    </div> );
}
 
export default ChatInput;