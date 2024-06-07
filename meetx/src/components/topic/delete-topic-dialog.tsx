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
  import { useTopicServiceDeleteApiTopicDeleteTopic } from "../../../openapi/queries/queries";
  import { useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetRecentTopicsKey } from "../../../openapi/queries/common";
  import { useQueryClient } from "@tanstack/react-query";
  import { useAppDispatch, useAppSelector } from "@/application/store";
  import { setGroup, setTopic } from "@/application/state-slices";
import { RequestResponse, TopicDeleteDTO } from "../../../openapi/requests/types.gen";
import { Trash2 } from "lucide-react";
import { ApiError } from "../../../openapi/requests/core/ApiError";
  
  const DeleteTopicDialog = () => {
    const queryClient = useQueryClient();
    const { selectedGroupId, selectedTopicId } = useAppSelector(x => x.selectedReducer);
    const dispatch = useAppDispatch();
    
    const { mutate } = useTopicServiceDeleteApiTopicDeleteTopic({
      onSuccess: () => {
            dispatch(setTopic("0"));
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey]});
            queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey]});
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
  
    const handleSubmit = (topicId: string, groupId: string) => {
        const topicDeleteDTO: TopicDeleteDTO = {
            topicId: topicId,
            groupId: groupId
        }
        mutate({requestBody : topicDeleteDTO});
    };
  
    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 className=" text-red-900 hover:cursor-pointer hover:text-red-500 transition-all"/>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the topic and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit(selectedTopicId ? selectedTopicId : "",
              selectedGroupId ? selectedGroupId : "")}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
  }
  
  export default DeleteTopicDialog;