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
import { UserDTO } from "../../../openapi/requests/types.gen"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useUserServiceGetApiUserGetUsersKey } from "../../../openapi/queries/common"
import { UserService } from "../../../openapi/requests/services.gen"
import { useAppDispatch } from "@/application/store"
import { fetchQuery } from "@/App"
import { useUserServicePutApiUserMakeStaff, useUserServicePutApiUserRemoveStaff } from "../../../openapi/queries/queries"

export const columns: ColumnDef<UserDTO>[] = [
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
	accessorKey: "role",
	header: "Role",
	cell: ({ row }) => (
	<div className="capitalize">{row.getValue("role")}</div>
	),
},
{
	id: "actions",
	enableHiding: false,
	cell: ({ row }) => {
	const user = row.original
	const queryClient = useQueryClient()
	const makeStaff = useUserServicePutApiUserMakeStaff({
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetUsersKey]});
		}
	});
	const removeStaff = useUserServicePutApiUserRemoveStaff({
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetUsersKey]});
		}
	});

	return (
		makeStaff.isPending || removeStaff.isPending ? 
		<Loader2 className="w-6 h-6 animate-spin"/> :
		<DropdownMenu>
		<DropdownMenuTrigger asChild>
			{
				user.role !== "Admin" ?
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button> : null
			}
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => user.role === "Staff" ? removeStaff.mutate({requestBody: user.id}) : makeStaff.mutate({requestBody: user.id})}>
					{
						user.role === "Client" ?
						"Make Staff" : "Remove Staff"
					}
				</DropdownMenuItem>
		</DropdownMenuContent>
		</DropdownMenu>
	)
	},
},
]

export function UsersTable() {
const [sorting, setSorting] = React.useState<SortingState>([])
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
	[]
)
const [columnVisibility, setColumnVisibility] =
	React.useState<VisibilityState>({})
const [rowSelection, setRowSelection] = React.useState({})
const dispatch = useAppDispatch();
const [data, setData] = React.useState<UserDTO[]>([]);

const query = useQuery({
	queryKey: [useUserServiceGetApiUserGetUsersKey],
	queryFn: () => {
		return fetchQuery(UserService.getApiUserGetUsers({page: 1, pageSize: 100000000}), dispatch);
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
