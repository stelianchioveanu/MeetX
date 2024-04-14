import * as React from "react"
import { Button } from "../ui/button";

interface UserButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    children: React.ReactNode;
}

const UserButton = React.forwardRef<HTMLButtonElement, UserButtonProps>((props, ref) => {
    return (
    <Button {...props} ref={ref} variant={props.variant}>
        {props.children}
    </Button>);
})
 
export default UserButton;