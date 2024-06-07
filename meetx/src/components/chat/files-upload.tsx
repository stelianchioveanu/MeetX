import { Button } from "../ui/button";
import { ImageUp } from 'lucide-react';
import { FileUp } from 'lucide-react';

const FilesUpload = (props: {innerRef: any, filesRef: any, imagesRef: any, className: string, classNameButtons: string}) => {
    return (
    <div ref={props.innerRef} className={props.className}>
        <Button onClick={() => props.imagesRef.current.click()} type="button" className={"w-[90%] flex gap-2 " + props.classNameButtons} variant="ghost">
            <ImageUp className="w-6 h-6"/>
            Upload Images
        </Button>
        <Button onClick={() => props.filesRef.current.click()} type="button" className={"w-[90%] flex gap-2 " + props.classNameButtons} variant="ghost">
            <FileUp className="w-6 h-6"/>
            Upload Files
        </Button>
    </div> );
}
 
export default FilesUpload;