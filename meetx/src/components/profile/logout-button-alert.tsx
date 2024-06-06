import { resetProfile, setGroup, setTopic } from "@/application/state-slices"
import { useAppDispatch } from "@/application/store"
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
import { useAppRouter } from "@/hooks/useAppRouter";
import { useUserServicePostApiUserLogout } from "../../../openapi/queries/queries";
import { RequestResponse } from "../../../openapi/requests/types.gen";
import { ApiError } from "../../../openapi/requests/core/ApiError";
   
  export function LogoutButtonAlert() {
	const dispatch = useAppDispatch();
	const { redirectToLogin } = useAppRouter();

	const { mutate } = useUserServicePostApiUserLogout({
        onSuccess: () => {
            dispatch(resetProfile());
			      redirectToLogin()
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

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          	<Button type="button" className="bg-red-800 hover:bg-red-500 font">
                Logout
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
            	<AlertDialogAction onClick={() => {mutate()}}>Continue</AlertDialogAction>
          	</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }