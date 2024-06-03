import {
    Card,
    CardContent,
    CardFooter
  } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { File, X } from 'lucide-react';

const FileCard = (props: {file: File; type: "image" | "file", id: number, setImages: any,
                setFiles: any, images: any, files: any}) => {
    const [imageUrl, setImageUrl] = useState("");

    const deleteItem = (index: number) => {
        if (props.type === "image") {
            const updatedItems = [...props.images];
            updatedItems.splice(index, 1);
            props.setImages(updatedItems);
        } else {
            const updatedItems = [...props.files];
            updatedItems.splice(index, 1);
            props.setFiles(updatedItems);
        }
    };

    useEffect(() => {
        if (props.file && props.type === "image") {
        const imageUrl = URL.createObjectURL(props.file);
        setImageUrl(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
        }
    }, [props.file, props.type]);

    return ( 
        <Card className="w-[140px] min-w-[140px] aspect-square flex flex-col
        justify-between items-center p-4 bg-[#424b60] border-0 relative">
            <X className="absolute right-[2px] top-[2px] w-5 h-5
            text-white hover:text-red-400 hover:cursor-pointer" onClick={() => deleteItem(props.id)}/>
            <CardContent className="w-[85%] aspect-square p-0">
                {
                    props.type === "image" ?
                    <img src={imageUrl} className="w-full
                    aspect-square object-contain"></img> :
                    <File className="w-full h-full"/>
                }
            </CardContent>
            <CardFooter className="p-0 w-full overflow-hidden h-7">
                <p className="w-full text-sm truncate">{props.file.name}</p>
            </CardFooter>
        </Card>
    );
}
 
export default FileCard;