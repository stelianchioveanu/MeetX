import {
    Card,
    CardContent,
    CardFooter
  } from "@/components/ui/card"
import { Download, File, X } from 'lucide-react';
import { FileGetDTO } from "../../../openapi/requests/types.gen";
import { useAppSelector } from "@/application/store";
import axios from "axios";

const FileMessageCard = (props: {file: FileGetDTO, isGroup: boolean}) => {
    const { selectedTopicId, selectedConvId } = useAppSelector(x => x.selectedReducer);

    const handleDownloadClick = () => {
        axios({
            url: props.isGroup ? `http://localhost:5000/${selectedTopicId}/Topics/${props.file.path}` : `http://localhost:5000/${selectedConvId}/Users/${props.file.path}`,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.file && props.file.name ? props.file.name : "unknown");
            document.body.appendChild(link);
            link.click();
          });
    };

    return ( 
        <Card className=" w-[140px] aspect-square flex flex-col
        justify-between items-center p-4 bg-[#424b60] border-0 relative">
            <Download className="absolute right-[2px] top-[2px] w-5 h-5
            text-white hover:text-green-600 hover:cursor-pointer" onClick={handleDownloadClick}>
            </Download>
            <CardContent className="w-[85%] aspect-square p-0">
                {
                    props.file.type === "Image" ?
                    <img src={props.isGroup ? `http://localhost:5000/${selectedTopicId}/Topics/${props.file.path}` : `http://localhost:5000/${selectedConvId}/Users/${props.file.path}`} className="w-full
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
 
export default FileMessageCard;