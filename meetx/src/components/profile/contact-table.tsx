import * as React from "react"
import {
ColumnDef,
ColumnFiltersState,
SortingState,
VisibilityState,
flexRender,
getCoreRowModel,
getFilteredRowModel,
getPaginationRowModel,
getSortedRowModel,
useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Loader2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
DropdownMenu,
DropdownMenuCheckboxItem,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { ContactFormAddDTO, ContactFormDTO, ContactFormUpdateDTO, UserDTO } from "../../../openapi/requests/types.gen"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContactFormServiceGetApiContactFormGetContactFormsKey, useUserServiceGetApiUserGetUsersKey } from "../../../openapi/queries/common"
import { ContactFormService, UserService } from "../../../openapi/requests/services.gen"
import { useAppDispatch } from "@/application/store"
import { fetchQuery } from "@/App"
import { useContactFormServicePutApiContactFormUpdateContactForm, useUserServicePutApiUserMakeStaff, useUserServicePutApiUserRemoveStaff } from "../../../openapi/queries/queries"
import { Checkbox } from "../ui/checkbox"

export const columns: ColumnDef<ContactFormDTO>[] = [
{
	accessorKey: "name",
	header: ({ column }) => {
	return (
		<Button
		variant="ghost"
		onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
		Name
		<ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	)
	},
	cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
},
{
	accessorKey: "email",
	header: ({ column }) => {
	return (
		<Button
		variant="ghost"
		onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
		Email
		<ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	)
	},
	cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
},
{
	accessorKey: "message",
	header: "Message",
	cell: ({ row }) => (
	<div className="capitalize">{row.getValue("message")}</div>
	),
},
{
	id: "actions",
    header: "Checked",
	cell: ({ row }) => {
	const contact = row.original
	const queryClient = useQueryClient()
	const updateChecked = useContactFormServicePutApiContactFormUpdateContactForm({
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: [useContactFormServiceGetApiContactFormGetContactFormsKey]});
		}
	});

    const sendData: ContactFormUpdateDTO = {
        contactId: contact.id,
        check: !contact.isChecked
    }

	return (
		updateChecked.isPending ? 
		<Loader2 className="w-6 h-6 animate-spin"/> :
		<Checkbox checked={contact.isChecked} onClick={() => {updateChecked.mutate({requestBody: sendData})}}/>
	)
	},
},
]

export function ContactTable() {
const [sorting, setSorting] = React.useState<SortingState>([])
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
	[]
)
const [columnVisibility, setColumnVisibility] =
	React.useState<VisibilityState>({})
const [rowSelection, setRowSelection] = React.useState({})
const dispatch = useAppDispatch();
const [data, setData] = React.useState<ContactFormDTO[]>([]);

const query = useQuery({
	queryKey: [useContactFormServiceGetApiContactFormGetContactFormsKey],
	queryFn: () => {
		return fetchQuery(ContactFormService.getApiContactFormGetContactForms({page: 1, pageSize: 100000000}), dispatch);
	},
	retry: false
});

React.useEffect(() => {
	setData(query?.data?.response?.data);
}, [query.dataUpdatedAt])

const table = useReactTable({
	data,
	columns,
	onSortingChange: setSorting,
	onColumnFiltersChange: setColumnFilters,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	onColumnVisibilityChange: setColumnVisibility,
	onRowSelectionChange: setRowSelection,
	state: {
	sorting,
	columnFilters,
	columnVisibility,
	rowSelection,
	},
})

return (
	<div className="w-full">
	<div className="flex items-center py-4">
		<Input
		placeholder="Filter emails..."
		value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
		onChange={(event) =>
			table.getColumn("email")?.setFilterValue(event.target.value)
		}
		className="max-w-sm"
		/>
		<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" className="ml-auto">
			Columns <ChevronDown className="ml-2 h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			{table
			.getAllColumns()
			.filter((column) => column.getCanHide())
			.map((column) => {
				return (
				<DropdownMenuCheckboxItem
					key={column.id}
					className="capitalize"
					checked={column.getIsVisible()}
					onCheckedChange={(value) =>
					column.toggleVisibility(!!value)
					}
				>
					{column.id}
				</DropdownMenuCheckboxItem>
				)
			})}
		</DropdownMenuContent>
		</DropdownMenu>
	</div>
	<div className="rounded-md border">
		<Table>
		<TableHeader>
			{table.getHeaderGroups().map((headerGroup) => (
			<TableRow key={headerGroup.id}>
				{headerGroup.headers.map((header) => {
				return (
					<TableHead key={header.id}>
					{header.isPlaceholder
						? null
						: flexRender(
							header.column.columnDef.header,
							header.getContext()
						)}
					</TableHead>
				)
				})}
			</TableRow>
			))}
		</TableHeader>
		<TableBody>
			{table.getRowModel().rows?.length ? (
			table.getRowModel().rows.map((row) => (
				<TableRow
				key={row.id}
				data-state={row.getIsSelected() && "selected"}
				>
				{row.getVisibleCells().map((cell) => (
					<TableCell key={cell.id}>
					{flexRender(
						cell.column.columnDef.cell,
						cell.getContext()
					)}
					</TableCell>
				))}
				</TableRow>
			))
			) : (
			<TableRow>
				<TableCell
				colSpan={columns.length}
				className="h-24 text-center"
				>
				No results.
				</TableCell>
			</TableRow>
			)}
		</TableBody>
		</Table>
	</div>
	<div className="flex items-center justify-end space-x-2 py-4">
		<div className="space-x-2">
		<Button
			variant="outline"
			size="sm"
			onClick={() => {table.previousPage()}}
			disabled={!table.getCanPreviousPage()}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			onClick={() => {table.nextPage()}}
			disabled={!table.getCanNextPage()}
		>
			Next
		</Button>
		</div>
	</div>
	</div>
)
}
