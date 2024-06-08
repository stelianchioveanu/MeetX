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
import { useGroupServicePutApiGroupChangeRole } from "../../../openapi/queries/queries";
import { useGroupServiceGetApiGroupGetGroupMembersKey } from "../../../openapi/queries/common";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeRoleDTO, GroupRoleEnum, RequestResponse } from "openapi/requests/types.gen";
import { useAppDispatch, useAppSelector } from "@/application/store";
import { ApiError } from "openapi/requests/core/ApiError";
import { setGroup, setTopic } from "@/application/state-slices";

const ChangeRole = (props: {userId?: string, isAdmin?: boolean, setOpened: any}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    
    const { mutate } = useGroupServicePutApiGroupChangeRole({
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey]});
            props.setOpened(false);
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
        const role: GroupRoleEnum = props.isAdmin ? "Member" : "Admin";
        const changeRoleData: ChangeRoleDTO = {
            userId,
            groupId,
            role
        };
        const dataToSend = {
            requestBody: changeRoleData
        };
        mutate(dataToSend);
    };

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
                <Button className="w-[100%] h-8 bg-blue-950 text-white hover:bg-blue-700">
                    {
                        props.isAdmin ?
                        "Make Member" :
                        "Make Admin"
                    }
                </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to change the role of this user?</AlertDialogTitle>
              <AlertDialogDescription>
              This action will modify the user's permissions!
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
 
export default ChangeRole;