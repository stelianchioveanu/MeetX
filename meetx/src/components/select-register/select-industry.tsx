import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGroupServiceGetApiGroupGetPublicGroupsKey } from "../../../openapi/queries/common"
import { GroupService } from "../../../openapi/requests/services.gen"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { NIL } from "uuid"
import { fetchQuery } from "@/App"
import { useAppDispatch } from "@/application/store"
import { GroupDTO } from "openapi/requests/types.gen"
 
export function SelectIndustry(props: {groupId: string; setGroupId: any}) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined | null>("");
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const { data, refetch, isFetching } = useQuery({
    queryKey: [useGroupServiceGetApiGroupGetPublicGroupsKey],
    queryFn: () => fetchQuery(GroupService.getApiGroupGetPublicGroups({ search: search, pageSize: 800 }), dispatch),
    enabled: false,
    retry: false,
    });

    useEffect(() => {
        refetch()
    }, [search, refetch]);

    const handleValueChange = (value: string) => {
        setSearch(value);
    };
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {
            props.groupId !== NIL ?
                <p className="w-full truncate text-left">
                    {name}
                </p>
            : "Select industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[304px] p-0">
        <Command>
          <CommandInput onValueChange={handleValueChange} placeholder="Search group..." />
          <CommandList>
            {
                isFetching ?
                <div className="w-full h-8 flex justify-center items-center">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div> :
                <>
                    {
                        data?.response?.data?.length === 0 ?
                        <CommandEmpty>No group found.</CommandEmpty> :
                        null
                    }
                    {
                        data?.response?.data?.map((group: GroupDTO) => (
                            <div className="w-full h-fit hover:cursor-pointer hover:bg-[#aaaaaa] transition-all rounded-sm mb-1 p-1"
                            onClick={() => {props.setGroupId(group.id); setName(group.name); setOpen(false);}} key={group.id}>
                                <p>
                                    {group.name}
                                </p>
                            </div>
                        ))
                    }
                </>
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}