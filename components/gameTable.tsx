'use client';
import { ExtendedColumn, IGameData } from '@/data/columns';
import React, { useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  flexRender,
  SortingState,
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

  const columnHelper = createColumnHelper<IGameData>();

  const columns = React.useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
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
            setScreenshots(value.screens.map(s => `img/${parseInt(info.row.original.id.toString(), 10)+1}/${s}`));
          }}>{value.txt}</a>
        );
      },
      sortingFn: (rowA, rowB) => caseInsensitiveAlphabeticalSorter(rowA.original, rowB.original)
    }),
    columnHelper.accessor('firstReleaseDate', {
      header: 'First release date',
      cell: info => <>{format(info.getValue(), "MMMM dd, yyyy")}</>,
      sortingFn: (rowA, rowB) => dateSorter(rowA.original, rowB.original, 'firstReleaseDate')
    }),
    columnHelper.accessor('genres', {
      header: 'Genre(s)',
      cell: info => <>{info.getValue().join(', ')}</>,
      sortingFn: (rowA, rowB) => arraySorter(rowA.original, rowB.original)
    }),
    columnHelper.accessor('codeLicense', {
      header: 'Code license',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('sourceLink', {
      header: 'Repository',
      cell: info => <a href={info.getValue()}>source</a>,
      enableSorting: false
    }),
    columnHelper.accessor('langs', {
      header: 'Languages',
      cell: info => <>{info.getValue().join(', ')}</>,
      enableSorting: false
    }),
  ], [columnHelper]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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