import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTopicServicePostApiTopicAddTopic } from "../../../openapi/queries/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetTopicsKey } from "../../../openapi/queries/common";
import { ChangeEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { toast } from "react-toastify";
import FilesUpload from "../chat/files-upload";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import FileCard from "../chat/file-card";
import { RequestResponse } from "../../../openapi/requests/types.gen";
import { setGroup, setTopic } from "@/application/state-slices";
import { ApiError } from "../../../openapi/requests/core/ApiError";
 
const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Name must be at least 1 character!"})
        .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!'),
    description: z
        .string()
        .min(1, { message: "Name must be at least 1 character!"})
        .refine((value) => !/^\s.*/.test(value ?? ""), 'The name should not begin with a space!'),
})

const AddTopic = () => {
    const queryClient = useQueryClient();
    const [clicked, setClicked] = useState(false);
    const [success, setSuccess] = useState(false);
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const [images, setImages] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const imagesRef = useRef<HTMLInputElement>(null);
    const filesRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const fileHandleChange = (event: ChangeEvent<HTMLInputElement>, isImage: boolean) => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files) as File[];
            
            let filesSize = 0;
            let filesCount = images.length + files.length;
            let maximumNumber = false;
            let maximumSize = false;
            images.forEach(element => {
                filesSize += element.size;
            });
            files.forEach(element => {
                filesSize += element.size; 
            });

            const filteredFiles = fileList.filter(file => {
                if (file.size > 10 * 1024 * 1024) {
                    toast.error(`Image ${file.name} is too large! Max 10MB`);
                    return false;
                }
                if (filesCount === 10) {
                    maximumNumber = true;
                    return false;
                }
                if (filesSize + file.size > 25 * 1024 * 1024) {
                    maximumSize = true;
                    return false;
                }
                filesCount++;
                filesSize = filesSize + file.size;
                return true;
            });

            if (maximumNumber) {
                toast.error("Maximum files number is 10!")
            }
            if (maximumSize) {
                toast.error("Files size should not exceed 25MB!")
            }

            if (isImage) {
                setImages((prevImages) => [...prevImages, ...filteredFiles]);
            } else {
                setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
            }
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    });

    const { mutate, isPending } = useTopicServicePostApiTopicAddTopic({
        onError: (error : ApiError) => {
            setClicked(false);

            const body: RequestResponse = error.body as RequestResponse;
            if (body.errorMessage?.code === "NotAMember" || body.errorMessage?.code === "GroupNotFound" || body.errorMessage?.code === "ConvNotFound") {
                dispatch(setGroup("0"));
                return;
            }
            if (body.errorMessage?.code === "TopicNotFound") {
                dispatch(setTopic("0"));
                return;
            }

            form.setError('title', { type: 'custom', message: body.errorMessage?.message || error.message });
        },
        onSuccess: () => {
            setClicked(true);
            setSuccess(true);
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey]});
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetTopicsKey]});
        }
      });

    const handleSubmit = (topic : { title: string, description: string }) => {
        const { title, description } = topic;
        mutate({formData: {
            GroupId: selectedGroupId ? selectedGroupId : undefined,
            Title: title,
            Description: description,
            Images: images,
            Files: files}});
    };

    return (
        <Dialog onOpenChange={() => {setClicked(false); setSuccess(false); form.reset(); setImages([]), setFiles([])}}>
            <DialogTrigger asChild>
                <Button className="w-3/4
                    dark:bg-neutral-900 dark:text-white
                    bg-neutral-100 text-neutral-900
                    dark:hover:bg-neutral-100 dark:hover:text-neutral-900
                    hover:bg-neutral-900 hover:text-white">
                    Add Topic
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Add new Topic</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input maxLength={4095} placeholder="Topic Title" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormControl>
                                    <Input maxLength={4095} placeholder="Description" className="font" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <input type="file" accept=".jpeg, .jpg, .png" multiple={true} hidden ref={imagesRef}
                        onChange={(event) => fileHandleChange(event, true)}/>
                        <input type="file" accept=".txt, .rtf, .md, .doc, .docx, .pdf, .xls,
                        .xlsx, .csv, .ppt, .pptx, .key, .mp3, .wav, .ogg, .flac, .mp4, .mov, .avi, .mkv, .zip,
                        .rar, .7z, .tar, .tar.gz, .js, .jsx, .html, .tsx, .css, .scss, .sass, .py, .java, .cpp,
                        .h, .c, .cs, .php, .rb, .swift, .go, .ts, .json, .xml, .yaml, .yml, .exe" multiple={true} hidden
                        ref={filesRef} onChange={(event) => fileHandleChange(event, false)}/>
                        <FilesUpload innerRef={null} imagesRef={imagesRef} filesRef={filesRef}
                        className="w-full flex gap-2" classNameButtons="justify-center"/>
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
                                <ScrollBar orientation="horizontal" className="flex"></ScrollBar>
                            </ScrollArea> : null
                        }
                        <Button type="submit" size="sm" disabled={clicked ? true : false} className={success ? "px-3 bg-green-500 hover:bg-green-500" : "px-3"}>
                            {isPending ? <Loader2 className="animate-spin h-4 w-4"></Loader2> :
                            success ? <Check className="h-4 w-4"/> :
                            "Add new Topic"}
                        </Button>
                    </form>
                </Form>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddTopic;