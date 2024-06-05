import { CalendarDays } from "lucide-react"
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "../ui/button"
 
export function GroupNameCard(props: {name: string | null | undefined}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
            <Button variant={"link"} className="w-full h-full p-0 flex">
                <p className="w-full h-full truncate font-normal text-base text-start">
                    {props.name}
                </p>
            </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit font-normal text-base">
        {props.name}
      </HoverCardContent>
    </HoverCard>
  )
}