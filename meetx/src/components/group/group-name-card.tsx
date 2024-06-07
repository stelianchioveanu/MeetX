import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "../ui/button"
 
export function GroupNameCard(props: {name: string | null | undefined, className: string}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
            <Button variant={"link"} className={"h-full p-0 flex " + props.className}>
                <p className="w-full h-full truncate font-normal text-base text-start text-white">
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