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
import { toast } from "react-toastify";
import { ChangeRoleDTO, GroupRoleEnum, RemoveMemberDTO } from "openapi/requests/types.gen";
import { useAppSelector } from "@/application/store";

const ChangeRole = (props: {userId?: string, isAdmin?: boolean}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    
    const { mutate } = useGroupServicePutApiGroupChangeRole({
      onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey]});
        },
      retry(failureCount) {
          if (failureCount > 0) {
              toast("Remove member failed! Please try again later!");
              return false;
          }
          toast("Remove member failed! Please try again later!");
          return false;
      },
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
                <Button className="w-[50%] h-8 bg-blue-950 text-white hover:bg-blue-700">
                    {
                        props.isAdmin ?
                        "Make Member" :
                        "Make Admin"
                    }
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
              <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
}
 
export default ChangeRole;