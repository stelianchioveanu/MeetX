import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useGroupServicePutApiGroupLeaveGroup } from "../../../openapi/queries/queries";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LeaveGroupDTO } from "../../../openapi/requests/types.gen";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { setGroup } from "@/application/state-slices";

const LeaveGroupDialog = () => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    
    const { mutate } = useGroupServicePutApiGroupLeaveGroup({
      onSuccess: () => {
            dispatch(setGroup("0"));
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
        }
    });

    const handleSubmit = (group : { groupId: string }) => {
        const { groupId } = group;
        const leaveGroupData: LeaveGroupDTO = {
            groupId
        };
        const dataToSend = {
            requestBody: leaveGroupData
        };
        mutate(dataToSend);
    };

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-3/4
            bg-blue-950 text-white
            hover:bg-blue-700 hover:text-neutral-100 mb-4">
                Leave Group
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit({groupId: selectedGroupId ? selectedGroupId : ""})}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
}
 
export default LeaveGroupDialog;