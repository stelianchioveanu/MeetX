import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PlusCircle } from "lucide-react";

const AddTopic = () => {
    return (
        <Dialog>
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
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                    Link
                    </Label>
                    <Input placeholder="Topic Title"/>
                </div>
                <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <PlusCircle className="h-4 w-4"/>
                </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddTopic;