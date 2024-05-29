import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera } from "lucide-react"
import AvatarEditorComponent from "./avatar-editor-component"
import { useRef } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
 
export interface CropImage {
    saveImageCropped(): void;
}

export const AvatarDialog = (props: {setImage: React.Dispatch<React.SetStateAction<string | null>>,
    setImageChanged: React.Dispatch<React.SetStateAction<boolean>>,
    setImageRemoved: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const cropRef = useRef<CropImage>(null);

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className='bg-[#873dff] rounded-full w-16 h-16 absolute bottom-0 right-0 p-2 hover:bg-[#873dff]'>
                <Camera className='text-white w-full h-full'/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Choose avatar</DialogTitle>
            </DialogHeader>
                <AvatarEditorComponent setImage={props.setImage} setImageChanged={props.setImageChanged} ref={cropRef}/>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={() => {props.setImage(null); props.setImageRemoved(true)} } className="bg-red-700" type="submit">Remove avatar</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={() => {cropRef.current?.saveImageCropped(); props.setImageRemoved(false)}} type="submit">Add avatar</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
  )
}