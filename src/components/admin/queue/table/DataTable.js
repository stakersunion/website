'use client'

import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSend } from '@/utils/query/admin/send'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { toast } from 'sonner'

const DataTable = ({ columns, data }) => {
  const [statusFilter, setStatusFilter] = useState('pending')
  const [columnFilters, setColumnFilters] = useState([])
  const { mutateAsync: send, isPending: sending } = useSend()
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  const handleSend = async () => {
    try {
      let response = await send()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setColumnFilters([{ id: 'status', value: statusFilter }])
  }, [statusFilter])

  const handleStatusChange = (value) => {
    setStatusFilter(value)

    setColumnFilters((current) => {
      const newFilter = { id: 'status', value }
      return current.some((f) => f.id === 'status')
        ? current.map((f) => (f.id === 'status' ? newFilter : f))
        : [...current, newFilter]
    })
  }

  return (
    <div>
      <div className={'flex justify-end mb-4 gap-4'}>
        <Button
          onClick={handleSend}
          disabled={sending}
        >
          {sending && (
            <FontAwesomeIcon
              icon={faLoader}
              className={'animate-spin mr-2'}
            />
          )}
          Trigger
        </Button>
        <Select
          onValueChange={handleStatusChange}
          defaultValue={statusFilter}
        >
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Filter by Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value={'pending'}>Pending</SelectItem>
              <SelectItem value={'sent'}>Sent</SelectItem>
              <SelectItem value={'failed'}>Failed</SelectItem>
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
                  className={row.original.archived && 'opacity-50'}
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
