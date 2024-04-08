import { ReactNode } from 'react';

import { cn } from "@/lib/utils";

const NavigationItem = (props: { children: ReactNode, selectedId: Number, setSelectedId: any, id: Number }) => {
    return (
    <button onClick={() => {props.setSelectedId(props.id)}} className="group flex items-center relative">
        <div className={cn(
          "absolute -left-2 bg-white rounded-r-full transition-all w-[4px] z-40",
          props.selectedId !== props.id && "group-hover:h-[20px]",
          props.selectedId === props.id ? "h-[36px]" : "h-[0px]"
        )} />
        <div className={cn(
          "group flex h-11 w-11 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
          props.selectedId === props.id && "bg-white/10 text-primary rounded-[16px]"
        )}>
        {props.children}
        </div>
    </button> );
}
 
export default NavigationItem;