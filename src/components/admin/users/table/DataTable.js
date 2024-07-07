'use client'

import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DataTable = ({ columns, data }) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const fields = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'discord', label: 'Discord' },
  ]
  const [filterField, setFilterField] = useState(0)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className={'flex items-center py-4 gap-x-4'}>
        <Input
          placeholder={`Search by ${fields[filterField].label}`}
          value={table.getColumn(fields[filterField].value)?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn(fields[filterField].value)?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <Select
          value={fields[filterField].value}
          onValueChange={(value) =>
            setFilterField(fields.findIndex((field) => field.value === value))
          }
        >
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Select a fruit'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fields</SelectLabel>
              {fields.map((field) => (
                <SelectItem
                  key={field.value}
                  value={field.value}
                >
                  {field.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className={'rounded-md border'}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
