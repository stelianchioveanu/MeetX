import { Copy } from "lucide-react"
 
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
import { useRefreshToken } from "@/hooks/useRefreshToken"
import { useAppSelector } from "@/application/store"
import { toast } from "react-toastify"
import { useState } from "react"
 
export function GenerateLinkDialog() {
  const {refresh} = useRefreshToken();
  const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
  const [clicked, setClicked] = useState(false);

  const {data, refetch} = useQuery({
      queryKey: [useGroupServiceGetApiGroupGetInviteLinkKey],
      queryFn: () => {
          return GroupService.getApiGroupGetInviteLink({id: selectedGroupId === null ? undefined : selectedGroupId});
      },
      retry(failureCount, error) {
          if (failureCount > 0) {
              toast("Get link failed! Please try again later!");
              return false;
          }
          refresh();
          return true;
      },
      retryDelay: 0,
      enabled: false
  });
  return (
    <Dialog onOpenChange={() => setClicked(false)}>
      <DialogTrigger asChild>
            <Button onClick={() => {setClicked(true); refetch()}} className="w-3/4
                    dark:bg-neutral-900 dark:text-white
                    bg-neutral-100 text-neutral-900
                    dark:hover:bg-neutral-100 dark:hover:text-neutral-900
                    hover:bg-neutral-900 hover:text-white">
                Generate Link
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
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
                data?.response?.link === null || data?.response?.link === undefined ? "" : data.response.link
              }
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={() =>  navigator.clipboard.writeText(data?.response?.link === null || data?.response?.link === undefined ? "" : data.response.link)}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4"/>
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