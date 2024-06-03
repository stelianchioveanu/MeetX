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
import { RemoveMemberDTO } from "openapi/requests/types.gen";
import { useAppSelector } from "@/application/store";

const RemoveUser = (props: {userId?: string}) => {
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    
    const { mutate } = useGroupServicePutApiGroupRemoveMember({
      onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupMembersKey]});
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
                <Button className="w-[50%] h-8 bg-red-900 text-white hover:bg-red-500">
                    Remove
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
 
export default RemoveUser;