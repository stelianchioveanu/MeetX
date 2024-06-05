import { resetProfile } from "@/application/state-slices"
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
   
  export function LogoutButtonAlert() {
	const dispatch = useAppDispatch();
	const { redirectToLogin } = useAppRouter();

	const { mutate } = useUserServicePostApiUserLogout({
        onSuccess: () => {
            dispatch(resetProfile());
			redirectToLogin()
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