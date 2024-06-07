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
import { LeaveGroupDTO, RequestResponse } from "../../../openapi/requests/types.gen";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { setAdmin, setGroup, setPublic, setTopic } from "@/application/state-slices";
import { ApiError } from "../../../openapi/requests/core/ApiError";

const LeaveGroupDialog = () => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    
    const { mutate } = useGroupServicePutApiGroupLeaveGroup({
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
            hover:bg-blue-700 hover:text-neutral-100">
                Leave Group
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
              Leaving the group will revoke your access and you won't be able to access the group's data.
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