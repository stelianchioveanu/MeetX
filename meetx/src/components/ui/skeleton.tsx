import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted bg-[rgb(125,131,145)] dark:bg-[#2d3341]", className)}
      {...props}
    />
  )
}

export { Skeleton }
