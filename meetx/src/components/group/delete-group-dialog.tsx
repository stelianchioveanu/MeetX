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
import { useGroupServiceDeleteApiGroupDeleteGroup } from "../../../openapi/queries/queries";
import { useGroupServiceGetApiGroupGetGroupsKey } from "../../../openapi/queries/common";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { setAdmin, setGroup, setPublic, setTopic } from "@/application/state-slices";
import { RequestResponse } from "../../../openapi/requests/types.gen";
import { ApiError } from "../../../openapi/requests/core/ApiError";

const DeleteGroupDialog = () => {
  const queryClient = useQueryClient();
  const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
  const dispatch = useAppDispatch();
  
  const { mutate } = useGroupServiceDeleteApiGroupDeleteGroup({
    onSuccess: () => {
		dispatch(setGroup("0"));
		dispatch(setPublic(false));
		dispatch(setAdmin(false));
		queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
    },
    onError: (error: ApiError) => {
      const body: RequestResponse = error.body as RequestResponse;
      if (body.errorMessage?.code === "NotAMember" || body.errorMessage?.code === "GroupNotFound" || body.errorMessage?.code === "ConvNotFound") {
          dispatch(setGroup("0"));
          return;
      }
      if (body.errorMessage?.code === "TopicNotFound") {
          dispatch(setTopic("0"));
          return;
      }
  }});

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
              This action cannot be undone. This will permanently delete the group and remove its data from our servers.
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