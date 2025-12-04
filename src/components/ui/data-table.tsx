"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
  type ExpandedState,
  type RowSelectionState,
  type Row,
} from "@tanstack/react-table"
import { 
  ArrowUpDown, 
  ChevronDown, 
  ChevronRight,
  MoreHorizontal, 
  Download,
  Settings2,
  Maximize2,
  Minimize2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Checkbox } from "./checkbox"
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "./dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./pagination"

/**
 * Table density modes
 */
export type DataTableDensity = "compact" | "comfortable" | "spacious"

/**
 * Column meta configuration for advanced features
 */
export interface DataTableColumnMeta {
  /** Sticky column position */
  sticky?: "left" | "right"
  /** Custom header component */
  headerComponent?: React.ReactNode
  /** Enable column grouping */
  group?: string
  /** Group level (for nested groups) */
  groupLevel?: number
}

/**
 * Extended column definition with meta
 */
export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  meta?: DataTableColumnMeta
}

export interface DataTableProps<TData, TValue> {
  /** Column definitions with advanced meta options */
  columns: DataTableColumn<TData, TValue>[]
  /** Table data */
  data: TData[]
  
  // Search/Filter
  /** Enable global search */
  searchable?: boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Column ID to search (defaults to first column) */
  searchColumn?: string
  
  // Visibility
  /** Enable column visibility toggle */
  columnVisibility?: boolean
  
  // Pagination
  /** Enable pagination */
  paginated?: boolean
  /** Page size (default: 10) */
  pageSize?: number
  /** Page size options */
  pageSizeOptions?: number[]
  
  // Row Selection
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Selected rows (controlled) */
  selectedRows?: RowSelectionState
  /** Callback when selection changes */
  onSelectionChange?: (selection: RowSelectionState) => void
  /** Render bulk actions toolbar when rows are selected */
  renderBulkActions?: (selectedRows: Row<TData>[]) => React.ReactNode
  
  // Row Expansion
  /** Enable expandable rows */
  expandable?: boolean
  /** Render expanded row content */
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode
  /** Get row can expand */
  getRowCanExpand?: (row: Row<TData>) => boolean
  
  // Density Control
  /** Table density mode */
  density?: DataTableDensity
  /** Show density toggle */
  densityControl?: boolean
  /** Callback when density changes */
  onDensityChange?: (density: DataTableDensity) => void
  
  // Fixed/Sticky Columns
  /** Enable sticky columns (requires column meta.sticky) */
  stickyColumns?: boolean
  /** Sticky header on scroll */
  stickyHeader?: boolean
  
  // Note: Grouped column headers are automatically supported via TanStack Table's column grouping.
  // Define columns with nested 'columns' property to create groups.
  
  // Export
  /** Enable CSV export */
  exportable?: boolean
  /** Custom export filename */
  exportFilename?: string
  
  // Customization
  /** Custom empty state */
  emptyState?: React.ReactNode
  /** Custom className for table container */
  className?: string
  /** Custom className for table */
  tableClassName?: string
  /** Max height (enables vertical scroll) */
  maxHeight?: string | number
}

/**
 * Enterprise-grade data table with advanced features:
 * - Grouped column headers (multi-level)
 * - Fixed/frozen columns (sticky left/right)
 * - Row selection with bulk actions
 * - Row expansion for details
 * - Density control (compact/comfortable/spacious)
 * - Custom column headers (React components)
 * - CSV export
 * - Infinite scroll ready
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  // Search
  searchable = false,
  searchPlaceholder = "Search...",
  searchColumn,
  // Visibility
  columnVisibility = false,
  // Pagination
  paginated = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  // Selection
  selectable = false,
  selectedRows: controlledSelection,
  onSelectionChange,
  renderBulkActions,
  // Expansion
  expandable = false,
  renderExpandedRow,
  getRowCanExpand,
  // Density
  density: controlledDensity = "comfortable",
  densityControl = false,
  onDensityChange,
  // Sticky
  stickyColumns = false,
  stickyHeader = false,
  // Export
  exportable = false,
  exportFilename = "export",
  // Custom
  emptyState,
  className,
  tableClassName,
  maxHeight,
}: DataTableProps<TData, TValue>) {
  // State
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibilityState, setColumnVisibilityState] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [internalDensity, setInternalDensity] = React.useState<DataTableDensity>(controlledDensity)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  // Use controlled or internal density
  const density = controlledDensity ?? internalDensity
  const setDensity = (newDensity: DataTableDensity) => {
    setInternalDensity(newDensity)
    onDensityChange?.(newDensity)
  }

  // Prepare columns with selection checkbox
  const tableColumns = React.useMemo(() => {
    const cols = [...columns] as ColumnDef<TData, TValue>[]

    // Add selection column
    if (selectable) {
      cols.unshift({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        meta: { sticky: "left" },
      } as ColumnDef<TData, TValue>)
    }

    // Add expand column
    if (expandable) {
      cols.unshift({
        id: "expand",
        header: () => null,
        cell: ({ row }) => {
          if (!row.getCanExpand()) return null
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={row.getToggleExpandedHandler()}
              className="h-6 w-6 p-0"
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )
        },
        enableSorting: false,
        enableHiding: false,
        meta: { sticky: "left" },
      } as ColumnDef<TData, TValue>)
    }

    return cols
  }, [columns, selectable, expandable])

  // Table instance
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility: columnVisibilityState,
      rowSelection: controlledSelection ?? rowSelection,
      expanded,
      pagination,
    },
    enableRowSelection: selectable,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      onSelectionChange?.(newSelection)
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibilityState,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
    getRowCanExpand: getRowCanExpand,
    manualPagination: false,
  })

  // Get search column ID
  const searchColumnId = searchColumn || (columns[0] as any)?.accessorKey

  // Selected rows
  const selectedRowsData = table.getFilteredSelectedRowModel().rows

  // Density classes
  const densityClasses = {
    compact: "text-xs",
    comfortable: "text-sm",
    spacious: "text-base",
  }

  const rowHeightClasses = {
    compact: "[&_td]:py-1 [&_td]:px-2 [&_th]:py-1 [&_th]:px-2",
    comfortable: "[&_td]:py-2 [&_td]:px-3 [&_th]:py-2 [&_th]:px-3",
    spacious: "[&_td]:py-4 [&_td]:px-4 [&_th]:py-4 [&_th]:px-4",
  }

  // CSV Export
  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows
    const headers = columns.filter(c => (c as any).accessorKey).map(c => (c as any).accessorKey)
    
    const csv = [
      headers.join(","),
      ...rows.map(row => 
        headers.map(h => {
          const value = row.getValue(h)
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        }).join(",")
      )
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${exportFilename}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Calculate sticky column offsets
  const getStickyStyles = (columnId: string, sticky?: "left" | "right") => {
    if (!stickyColumns || !sticky) return {}

    const colIndex = tableColumns.findIndex(c => c.id === columnId)
    let offset = 0

    if (sticky === "left") {
      // Sum widths of all left sticky columns before this one
      for (let i = 0; i < colIndex; i++) {
        const col = tableColumns[i] as DataTableColumn<TData, TValue>
        if (col.meta?.sticky === "left") {
          offset += 48 // Approximate column width
        }
      }
      return {
        position: "sticky" as const,
        left: offset,
        zIndex: 10,
        backgroundColor: "hsl(var(--background))",
        boxShadow: "2px 0 4px -2px rgba(0,0,0,0.1)",
      }
    } else if (sticky === "right") {
      // Sum widths of all right sticky columns after this one
      for (let i = colIndex + 1; i < tableColumns.length; i++) {
        const col = tableColumns[i] as DataTableColumn<TData, TValue>
        if (col.meta?.sticky === "right") {
          offset += 48
        }
      }
      return {
        position: "sticky" as const,
        right: offset,
        zIndex: 10,
        backgroundColor: "hsl(var(--background))",
        boxShadow: "-2px 0 4px -2px rgba(0,0,0,0.1)",
      }
    }

    return {}
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {(searchable || columnVisibility || densityControl || exportable || (selectable && selectedRowsData.length > 0)) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            {/* Search */}
            {searchable && searchColumnId && (
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(searchColumnId)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            )}

            {/* Bulk Actions */}
            {selectable && selectedRowsData.length > 0 && renderBulkActions && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md">
                <span className="text-sm font-medium">
                  {selectedRowsData.length} row(s) selected
                </span>
                {renderBulkActions(selectedRowsData)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Density Control */}
            {densityControl && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Density
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Table Density</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setDensity("compact")}>
                    <Minimize2 className="h-4 w-4 mr-2" />
                    Compact
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDensity("comfortable")}>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Comfortable
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDensity("spacious")}>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Spacious
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Export */}
            {exportable && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}

            {/* Column Visibility */}
            {columnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-auto">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div 
        className={cn(
          "rounded-md border overflow-auto",
          maxHeight && "relative"
        )}
        style={maxHeight ? { maxHeight } : undefined}
      >
        <Table className={cn(densityClasses[density], rowHeightClasses[density], tableClassName)}>
          <TableHeader className={cn(stickyHeader && "sticky top-0 z-20 bg-background")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = (header.column.columnDef as DataTableColumn<TData, TValue>).meta
                  return (
                    <TableHead 
                      key={header.id}
                      style={getStickyStyles(header.column.id, meta?.sticky)}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        meta?.headerComponent ?? 
                        flexRender(header.column.columnDef.header, header.getContext())
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
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      const meta = (cell.column.columnDef as DataTableColumn<TData, TValue>).meta
                      return (
                        <TableCell 
                          key={cell.id}
                          style={getStickyStyles(cell.column.id, meta?.sticky)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {/* Expanded Row */}
                  {expandable && row.getIsExpanded() && renderExpandedRow && (
                    <TableRow>
                      <TableCell colSpan={tableColumns.length} className="p-0">
                        <div className="p-4 bg-muted/50">
                          {renderExpandedRow(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  {emptyState ?? "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginated && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {table.getRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} results
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {pagination.pageSize}
                    <ChevronDown className="ml-2 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {pageSizeOptions.map(size => (
                    <DropdownMenuItem 
                      key={size}
                      onClick={() => table.setPageSize(size)}
                    >
                      {size}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
                const currentPage = table.getState().pagination.pageIndex
                const showPage =
                  pageIndex === 0 ||
                  pageIndex === table.getPageCount() - 1 ||
                  Math.abs(pageIndex - currentPage) <= 1

                if (!showPage) {
                  if (pageIndex === 1 || pageIndex === table.getPageCount() - 2) {
                    return (
                      <PaginationItem key={pageIndex}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                }

                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      onClick={() => table.setPageIndex(pageIndex)}
                      isActive={pageIndex === currentPage}
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

/**
 * Helper to create sortable column header
 */
export function DataTableColumnHeader({
  column,
  title,
  className,
}: {
  column: any
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 data-[state=open]:bg-accent", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{title}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

/**
 * Helper for row actions dropdown
 */
export function DataTableRowActions({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { type ColumnDef, type Row }
