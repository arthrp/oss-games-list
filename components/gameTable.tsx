'use client';
import { ExtendedColumn, IGameData } from '@/data/columns';
import React, { useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  createColumnHelper
} from '@tanstack/react-table';
import GameDetailsModal from './gameDetailsModal/gameDetailsModal';
import { arraySorter, caseInsensitiveAlphabeticalSorter, dateSorter } from '@/helpers/sorters';
import { format } from 'date-fns';
import Carousel from './carousel/carousel';

const GameTable = ({ data }: { data: IGameData[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [homepage, setHomepage] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<IGameData>();

  const columns = React.useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
      enableColumnFilter: false,
    }),
    columnHelper.accessor('game', {
      header: 'Game',
      cell: info => {
        const value = info.getValue();
        return (
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
            setTitle(value.txt);
            setHomepage(value.link);
            setScreenshots(value.screens.map(s => `img/${parseInt(info.row.original.id.toString(), 10)}/${s}`));
          }}>{value.txt}</a>
        );
      },
      sortingFn: (rowA, rowB) => caseInsensitiveAlphabeticalSorter(rowA.original, rowB.original),
      enableColumnFilter: true,
      filterFn: (row, columnId, value) => {
        return row.original.game.txt.toLowerCase().includes(value.toLowerCase());
      }
    }),
    columnHelper.accessor('firstReleaseDate', {
      header: 'First release date',
      cell: info => <>{format(info.getValue(), "MMMM dd, yyyy")}</>,
      enableColumnFilter: false,
      sortingFn: (rowA, rowB) => dateSorter(rowA.original, rowB.original, 'firstReleaseDate')
    }),
    columnHelper.accessor('genres', {
      header: 'Genre(s)',
      cell: info => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((genre: string) => (
            <span
              key={genre}
              className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
        </div>
      ),
      sortingFn: (rowA, rowB) => arraySorter(rowA.original, rowB.original, 'genres'),
      enableColumnFilter: true,
      filterFn: (row, columnId, value) => {
        return row.original.genres.some(genre => 
          genre.toLowerCase().includes(value.toLowerCase())
        );
      }
    }),
    columnHelper.accessor('codeLicense', {
      header: 'Code license',
      cell: info => info.getValue(),
      enableColumnFilter: true,
    }),
    columnHelper.accessor('langs', {
      header: 'Languages',
      cell: info => <>{info.getValue().join(', ')}</>,
      enableSorting: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, value) => {
        return row.original.langs.some(lang => 
          lang.toLowerCase().includes(value.toLowerCase())
        );
      }
    }),
    columnHelper.accessor('sourceLink', {
      header: 'Repository',
      cell: info => <a href={info.getValue()}>source</a>,
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ], [columnHelper]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span>
                        {header.column.getCanSort()
                          ? {
                              asc: ' ⇈',
                              desc: ' ⇊',
                            }[header.column.getIsSorted() as string] ?? ' ⇅'
                          : ''}
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={`filter-${headerGroup.id}`}>
              {headerGroup.headers.map(header => (
                <td key={`filter-${header.id}`} colSpan={header.colSpan}>
                  {header.column.getCanFilter() ? (
                    <input
                      type="text"
                      value={(header.column.getFilterValue() ?? '') as string}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      placeholder={`Filter ${header.column.columnDef.header}...`}
                      className="w-full placeholder-gray-400 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <GameDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} homepage={homepage}>
        <p>Status: playable</p>
        <p>Screenshots:</p>
        <Carousel images={screenshots} />
      </GameDetailsModal>
    </>
  );
};

export default GameTable;