import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  type DataTableColumn,
} from "./data-table"
import { Button } from "./button"
import { Badge } from "./badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { DropdownMenuItem } from "./dropdown-menu"
import { Trash2, Edit, Copy, Download, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem as DropdownItem, DropdownMenuTrigger } from "./dropdown-menu"

const meta: Meta<typeof DataTable> = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof DataTable>

// Mock data types
interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  department: string
  joinDate: string
  salary: number
}

interface Order {
  id: string
  customer: string
  product: string
  amount: number
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
  items: Array<{ id: string; name: string; price: number; qty: number }>
}

// Mock data
const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Williams",
    "Charlie Brown",
    "Diana Prince",
    "Ethan Hunt",
    "Fiona Apple",
  ][i % 8],
  email: `user${i + 1}@example.com`,
  role: ["Admin", "User", "Editor", "Viewer"][i % 4],
  status: i % 3 === 0 ? "inactive" : "active",
  department: ["Engineering", "Design", "Product", "Marketing", "Sales"][i % 5],
  joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split("T")[0],
  salary: 50000 + (i * 1000) % 100000,
}))

const mockOrders: Order[] = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: ["Alice Corp", "Bob Inc", "Charlie LLC", "Diana Co"][i % 4],
  product: ["Widget A", "Widget B", "Widget C", "Service D"][i % 4],
  amount: 100 + i * 25,
  status: ["pending", "processing", "completed", "cancelled"][i % 4] as any,
  date: new Date(2024, 11, (i % 28) + 1).toISOString().split("T")[0],
  items: Array.from({ length: (i % 3) + 1 }, (_, j) => ({
    id: `item-${i}-${j}`,
    name: `Product ${j + 1}`,
    price: 50 + j * 25,
    qty: j + 1,
  })),
}))

/**
 * Basic data table with search and pagination.
 */
export const Default: Story = {
  render: function DefaultTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status}
            </Badge>
          )
        },
      },
    ]

    return (
      <DataTable
        columns={columns}
        data={mockUsers.slice(0, 10)}
        searchable
        searchColumn="name"
        searchPlaceholder="Search by name..."
        paginated
        pageSize={5}
      />
    )
  },
}

/**
 * Table with fixed/frozen columns.
 * ID column is sticky on the left, Actions sticky on the right.
 */
export const FixedColumns: Story = {
  render: function FixedColumnsTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "id",
        header: "ID",
        meta: { sticky: "left" },
      },
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => `$${row.getValue<number>("salary").toLocaleString()}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DataTableRowActions>
            <DropdownMenuItem onClick={() => console.log("Edit", row.original.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete", row.original.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DataTableRowActions>
        ),
        meta: { sticky: "right" },
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Fixed Columns</CardTitle>
          <CardDescription>
            ID column is fixed on left, Actions fixed on right. Try scrolling horizontally.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers.slice(0, 10)}
            stickyColumns
            stickyHeader
            maxHeight="400px"
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Grouped column headers with multi-level nesting.
 */
export const GroupedHeaders: Story = {
  render: function GroupedHeadersTable() {
    const columns: DataTableColumn<User>[] = [
      {
        id: "personal",
        header: "Personal Information",
        columns: [
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
        ],
      },
      {
        id: "work",
        header: "Work Details",
        columns: [
          {
            accessorKey: "department",
            header: "Department",
          },
          {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
          },
          {
            accessorKey: "joinDate",
            header: "Join Date",
          },
        ],
      },
      {
        id: "compensation",
        header: "Compensation",
        columns: [
          {
            accessorKey: "salary",
            header: "Annual Salary",
            cell: ({ row }) => `$${row.getValue<number>("salary").toLocaleString()}`,
          },
        ],
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Grouped Column Headers</CardTitle>
          <CardDescription>
            Multi-level headers automatically rendered by TanStack Table
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers.slice(0, 10)}
            paginated
            pageSize={5}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Row selection with bulk actions toolbar.
 */
export const RowSelection: Story = {
  render: function RowSelectionTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status}
            </Badge>
          )
        },
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Row Selection</CardTitle>
          <CardDescription>
            Select rows to see bulk actions. Try selecting multiple rows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers.slice(0, 15)}
            selectable
            paginated
            pageSize={5}
            renderBulkActions={(selectedRows) => (
              <>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    console.log("Delete", selectedRows.map((r) => r.original.id))
                    alert(`Delete ${selectedRows.length} users?`)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    console.log("Export", selectedRows.map((r) => r.original))
                    alert(`Export ${selectedRows.length} users?`)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Expandable rows for detailed information.
 */
export const ExpandableRows: Story = {
  render: function ExpandableRowsTable() {
    const columns: DataTableColumn<Order>[] = [
      {
        accessorKey: "id",
        header: "Order ID",
      },
      {
        accessorKey: "customer",
        header: "Customer",
      },
      {
        accessorKey: "product",
        header: "Product",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => `$${row.getValue<number>("amount")}`,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            pending: "secondary",
            processing: "default",
            completed: "outline",
            cancelled: "destructive",
          }
          return <Badge variant={variants[status]}>{status}</Badge>
        },
      },
      {
        accessorKey: "date",
        header: "Date",
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Expandable Rows</CardTitle>
          <CardDescription>
            Click the arrow to expand and see order items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockOrders.slice(0, 10)}
            expandable
            getRowCanExpand={(row) => row.original.items.length > 0}
            renderExpandedRow={(row) => (
              <div className="space-y-2">
                <h4 className="font-semibold">Order Items:</h4>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="font-medium">Product</div>
                  <div className="font-medium">Price</div>
                  <div className="font-medium">Quantity</div>
                  <div className="font-medium">Total</div>
                </div>
                {row.original.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 gap-4 text-sm">
                    <div>{item.name}</div>
                    <div>${item.price}</div>
                    <div>{item.qty}</div>
                    <div>${item.price * item.qty}</div>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-4 border-t pt-2 text-sm font-semibold">
                  <div className="col-span-3 text-right">Subtotal:</div>
                  <div>
                    $
                    {row.original.items.reduce(
                      (sum, item) => sum + item.price * item.qty,
                      0
                    )}
                  </div>
                </div>
              </div>
            )}
            paginated
            pageSize={5}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Density control with toggle (compact/comfortable/spacious).
 */
export const DensityControl: Story = {
  render: function DensityTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Density Control</CardTitle>
          <CardDescription>
            Use the density toggle to switch between compact/comfortable/spacious modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers.slice(0, 10)}
            densityControl
            paginated
            pageSize={5}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Custom column headers with React components (filters, buttons, etc.).
 */
export const CustomHeaders: Story = {
  render: function CustomHeadersTable() {
    const [statusFilter, setStatusFilter] = React.useState<string | null>(null)

    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          headerComponent: (
            <div className="flex items-center gap-2">
              <span>Status</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Filter className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownItem onClick={() => setStatusFilter(null)}>
                    All
                  </DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter("inactive")}>
                    Inactive
                  </DropdownItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        },
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status}
            </Badge>
          )
        },
      },
    ]

    const filteredData = statusFilter
      ? mockUsers.filter((u) => u.status === statusFilter)
      : mockUsers

    return (
      <Card>
        <CardHeader>
          <CardTitle>Custom Column Headers</CardTitle>
          <CardDescription>
            Status column has a custom filter button in the header
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredData.slice(0, 10)}
            paginated
            pageSize={5}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * CSV export functionality.
 */
export const ExportCSV: Story = {
  render: function ExportTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "salary",
        header: "Salary",
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>CSV Export</CardTitle>
          <CardDescription>
            Click the Export button to download table data as CSV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers.slice(0, 20)}
            exportable
            exportFilename="users-export"
            searchable
            searchColumn="name"
            paginated
            pageSize={10}
          />
        </CardContent>
      </Card>
    )
  },
}

/**
 * Full-featured enterprise table with all features enabled.
 */
export const EnterpriseTable: Story = {
  render: function EnterpriseFullTable() {
    const columns: DataTableColumn<User>[] = [
      {
        accessorKey: "id",
        header: "ID",
        meta: { sticky: "left" },
      },
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => `$${row.getValue<number>("salary").toLocaleString()}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <DataTableRowActions>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DataTableRowActions>
        ),
        meta: { sticky: "right" },
      },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Data Table</CardTitle>
          <CardDescription>
            All features enabled: search, selection, density, export, fixed columns, sticky header
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockUsers}
            searchable
            searchColumn="name"
            searchPlaceholder="Search by name..."
            selectable
            paginated
            pageSize={10}
            pageSizeOptions={[10, 20, 50]}
            columnVisibility
            densityControl
            exportable
            exportFilename={`users-${new Date().toISOString().split("T")[0]}`}
            stickyColumns
            stickyHeader
            maxHeight="600px"
            renderBulkActions={(selectedRows) => (
              <>
                <Button size="sm" variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({selectedRows.length})
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
    )
  },
}
