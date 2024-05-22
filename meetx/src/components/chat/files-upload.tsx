import { Button } from "../ui/button";
import { ImageUp } from 'lucide-react';
import { FileUp } from 'lucide-react';

const FilesUpload = (props: {innerRef: any, filesRef: any, imagesRef: any}) => {
    return (
    <div ref={props.innerRef} className="h-fit w-[200px] absolute
    bg-[#151617] bottom-12 left-0 rounded-md flex items-center flex-col py-3 gap-2">
        <Button onClick={() => props.imagesRef.current.click()} type="button" className="w-[90%] flex justify-start gap-2 text-[#d8ddeb]" variant="ghost">
            <ImageUp className="w-6 h-6"/>
            Upload Images
        </Button>
        <Button onClick={() => props.filesRef.current.click()} type="button" className="w-[90%] flex justify-start gap-2 text-[#d8ddeb]" variant="ghost">
            <FileUp className="w-6 h-6"/>
            Upload Files
        </Button>
    </div> );
}
 
export default FilesUpload;