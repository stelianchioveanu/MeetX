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
import { useGroupServicePutApiGroupRemoveMember } from "../../../openapi/queries/queries";
import { useGroupServiceGetApiGroupGetGroupMembersKey } from "../../../openapi/queries/common";
import { useQueryClient } from "@tanstack/react-query";
import { RemoveMemberDTO, RequestResponse } from "../../../openapi/requests/types.gen";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { ApiError } from "../../../openapi/requests/core/ApiError";
import { setGroup, setTopic } from "@/application/state-slices";

const RemoveUser = (props: {userId?: string}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
	const dispatch = useAppDispatch();
    
    const { mutate } = useGroupServicePutApiGroupRemoveMember({
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey]});
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

    const handleSubmit = () => {
        const userId = props.userId;
        const groupId = selectedGroupId ? selectedGroupId : undefined;
        const removeUserData: RemoveMemberDTO = {
            userId,
            groupId
        };
        const dataToSend = {
            requestBody: removeUserData
        };
        mutate(dataToSend);
    };

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
                <Button className="w-[100%] h-8 bg-red-900 text-white hover:bg-red-500">
                    Remove
                </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure you want to remove this user from the group? </AlertDialogTitle>
              <AlertDialogDescription>
              This action will revoke their access to group resources and features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
}
 
export default RemoveUser;