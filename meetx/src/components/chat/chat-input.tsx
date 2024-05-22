import { PlusCircle, SmileIcon, X } from "lucide-react";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import data from '@emoji-mart/data'
import Picker  from '@emoji-mart/react'
import FilesUpload from "./files-upload";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppSelector } from "@/application/store";
import Connector from '../../signalRConnection/signalr-connection'
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import FileCard from "./file-card";
import { useMessageFilesServicePostApiMessageFilesAddFilesTopicMessage } from "../../../openapi/queries/queries";

const ChatInput = (props: {isGroup: boolean, userId?: string}) => {
    const [input, setInput] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [emojiOpened, setEmojiOpened] = useState(false);
    const [uploaderOpened, setUploaderOpened] = useState(false);
    const ref = useDetectClickOutside({ onTriggered: () => setUploaderOpened(false) });
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const { selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const { selectedConvId } = useAppSelector(x => x.selectedReducer);
    const { newMessage, newPrivateMessage } = Connector();
    const imagesRef = useRef<HTMLInputElement>(null);
    const filesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInput("");
        setUploaderOpened(false);
        setEmojiOpened(false);
        setImages([]);
        setFiles([]);
    }, [selectedTopicId, selectedGroupId, selectedConvId]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const imagesHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files) as File[];
            setImages((prevImages) => [...prevImages, ...fileList]);
        }
    }

    const filesHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files) as File[];
            setFiles((prevFiles) => [...prevFiles, ...fileList]);
        }
    }

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

    const { mutate } = useMessageFilesServicePostApiMessageFilesAddFilesTopicMessage({
        onError: (error : any) => {
            console.log(error.message);
        },
        onSuccess: (result : any) => {
            console.log(result.response.files);
            if (props.isGroup) {
                newMessage(selectedGroupId ? selectedGroupId : "", selectedTopicId ? selectedTopicId : "", input, result.response.files);
            } else {
                newPrivateMessage(props.userId === undefined ? "" : props.userId, input, result.response.files)
            }
            setInput("");
            setImages([]);
            setFiles([]);
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = {
            Images: images.length !== 0 ? images : undefined,
            Files: files.length !== 0 ? files : undefined,
            TopicId: selectedTopicId !== null && selectedTopicId !== "0" ? selectedTopicId : "00000000-0000-0000-0000-000000000000",
            PrivateConversationId: selectedConvId !== null && selectedConvId !== "0" ? selectedConvId : "00000000-0000-0000-0000-000000000000"
        }
        if (images.length === 0 && files.length === 0) {
            if (props.isGroup) {
                newMessage(selectedGroupId ? selectedGroupId : "", selectedTopicId ? selectedTopicId : "", input, null);
            } else {
                newPrivateMessage(props.userId === undefined ? "" : props.userId, input, null)
            }
            setInput("");
            setImages([]);
            setFiles([]);
        } else {
            console.log(data);
            mutate({formData: data});
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
      };

    return (
    <form className="max-h-full float-end bg-[#68738f] rounded-md flex flex-col
    items-center px-3 gap-2 relative w-full justify-between" onSubmit={handleSubmit}>
        { images.length !==0 || files.length !== 0 ?
            <ScrollArea className="w-full h-fit">
                <div className="flex w-full space-x-4 p-4">
                {
                    images.map(function(image : File, id){
                        return (
                            <FileCard key={id} id={id} file={image} setImages={setImages}
                            setFiles={setFiles} images={images} files={files} type="image"/>
                        )
                    })
                }
                {
                    files.map(function(file : File, id){
                        return (
                            <FileCard key={id} id={id} file={file} setImages={setImages}
                            setFiles={setFiles} images={images} files={files} type="file"/>
                        )
                    })
                }
                </div>
                <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea> : null
        }
        <div className="flex items-center gap-2 relative w-full">
            {
                uploaderOpened !== true ?
                <PlusCircle fill="#68738f" className="w-7 h-7 text-[#d8ddeb]" onClick={openUploader}/> :
                <>
                    <X className="w-7 h-7 text-[#d8ddeb]" onClick={closeUploader}/>
                    <FilesUpload imagesRef={imagesRef} filesRef={filesRef} innerRef={ref}/>
                </>
            }
            <input className=" h-[45px] text-[#d8ddeb] bg-transparent
            focus-visible:outline-none grow" placeholder="#Type here"
            value={input} onChange={handleChange} onKeyDown={handleKeyPress} />
            <input type="file" accept="image/*" multiple={true} hidden ref={imagesRef} onChange={imagesHandleChange}/>
            <input type="file" accept=".txt, .rtf, .md, .doc, .docx, .pdf, .xls,
            .xlsx, .csv, .ppt, .pptx, .key, .mp3, .wav, .ogg, .flac, .mp4, .mov, .avi, .mkv, .zip,
            .rar, .7z, .tar, .tar.gz, .js, .jsx, .html, .tsx, .css, .scss, .sass, .py, .java, .cpp,
            .h, .c, .cs, .php, .rb, .swift, .go, .ts, .json, .xml, .yaml, .yml, .exe" multiple={true} hidden
            ref={filesRef} onChange={filesHandleChange}/>
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
        </div>
    </form> );
}
 
export default ChatInput;