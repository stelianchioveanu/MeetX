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
import { useGroupServiceDeleteApiGroupDeleteGroup, useGroupServicePutApiGroupLeaveGroup } from "../../../openapi/queries/queries";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { useQueryClient } from "@tanstack/react-query";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { setGroup } from "@/application/state-slices";

const DeleteGroupDialog = () => {
  const queryClient = useQueryClient();
  const {refresh} = useRefreshToken();
  const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
  const dispatch = useAppDispatch();
  
  const { mutate } = useGroupServiceDeleteApiGroupDeleteGroup({
    onSuccess: () => {
          dispatch(setGroup("0"));
          queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
      },
    retry(failureCount, error : any) {
        if (failureCount > 0) {
            toast("Delete group failed! Please try again later!" + error);
            return false;
        }
        if (error.message === "Unauthorized") {
            refresh();
            return true;
        }
        return false;
    },
  });

  const handleSubmit = (groupId : string) => {
      mutate({requestBody : groupId});
  };

  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-3/4
          bg-red-900 text-white
          hover:bg-red-500 hover:text-neutral-100">
              Delete Group
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
            <AlertDialogAction onClick={() => handleSubmit(selectedGroupId ? selectedGroupId : "")}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}

export default DeleteGroupDialog;