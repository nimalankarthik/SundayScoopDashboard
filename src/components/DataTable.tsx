import React, { useState } from 'react';
import { Company } from '../App';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';


interface DataTableProps {
  companies: Company[];
}

const DataTable: React.FC<DataTableProps> = ({ companies }) => {
const [globalFilter, setGlobalFilter] = useState('');

const columnHelper = createColumnHelper<Company>();
const columns = [
    columnHelper.accessor('logo', {
      header: 'Logo',
      cell: info => <img src={info.getValue()} alt="Company Logo" style={{ width: '50px', height: '50px' }} />,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('company_url', {
      header: 'Website',
      cell: info => <a href={info.getValue()} target="_blank" rel="noopener noreferrer">Visit</a>,
    }),
    columnHelper.accessor('linkedin_url', {
      header: 'LinkedIn',
      cell: info => <a href={info.getValue()} target="_blank" rel="noopener noreferrer">Profile</a>,
    }),
    columnHelper.accessor('industry', {
      header: 'Industry',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('headquarters_city_state', {
      header: 'Location',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('latest_funding', {
      header: 'Latest Funding',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('latest_funding_round', {
      header: 'Funding Round',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('size', {
      header: 'Size',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('li_size', {
      header: 'LinkedIn Size',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('age_founded', {
      header: 'Founded',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('glass_door', {
      header: 'Glassdoor Rating',
      cell: info => info.getValue(),
    }),
    // columnHelper.accessor('ceo_approvals', {
    //   header: 'CEO Approval',
    //   cell: info => `${info.getValue() * 100}%`,
    // }),
    // columnHelper.accessor('recommended', {
    //   header: 'Recommended',
    //   cell: info => `${info.getValue() * 100}%`,
    // }),
 
  ];

  const table = useReactTable({
    data: companies, 
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='min-h-full min-w-screen fill-gray-900'>
    <div className="p-2 min-h-full min-w-full mx-auto text-white bg-gray-900">
      <div className="flex justify-between mb-2">
        <div className="w-full h-full flex items-center gap-1">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-indigo-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-gray-900"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
  );
};

export default DataTable;