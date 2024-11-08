import { Check, Copy, Loader2 } from "lucide-react"
 
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { useGroupServiceGetApiGroupGetInviteLinkKey } from "../../../openapi/queries/common"
import { GroupService } from "../../../openapi/requests/services.gen"
import { useAppDispatch, useAppSelector } from "@/application/store"
import { fetchQuery } from "@/App"
import { useState } from "react"
 
export function GenerateLinkDialog() {
  	const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
  	const dispatch = useAppDispatch();
    const [copied, setCopied] = useState<boolean>(false);

  const {data, refetch, isFetching} = useQuery({
      queryKey: [useGroupServiceGetApiGroupGetInviteLinkKey],
      queryFn: () => {
          return fetchQuery(GroupService.getApiGroupGetInviteLink({id: selectedGroupId === null ? undefined : selectedGroupId}), dispatch);
      },
      retry: false,
      enabled: false
  });
  return (
    <Dialog onOpenChange={() => setCopied(false)}>
      <DialogTrigger asChild>
            <Button onClick={() => {refetch()}} className="w-3/4
                    bg-neutral-100 text-neutral-900
                    hover:bg-neutral-600 hover:text-neutral-100">
                Generate Link
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join the group. The invite is valid for 15 minutes or until a new one is created.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              readOnly
              value={
                isFetching ? "" :
                (data?.response?.link === null || data?.response?.link === undefined ? "" : data.response.link)
              }
            />
          </div>
          <Button type="submit" size="sm" disabled={copied} className={copied ? "bg-green-500 " : "" + "px-3"} onClick={() =>  navigator.clipboard.writeText(data?.response?.link === null || data?.response?.link === undefined ? "" : data.response.link).then(() => setCopied(true))}>
            <span className="sr-only">Copy</span>
            {
              isFetching ?
              <Loader2 className="h-4 w-4 animate-spin"/>:
              (
                copied ?
                <Check className="h-4 w-4"/> :
                <Copy className="h-4 w-4"/>
              )
            }
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