'use client';
import { ExtendedColumn, IGameData } from '@/data/columns';
import React, { useState } from 'react';
import { Column, useSortBy, useTable, ColumnInstance } from 'react-table';
import GameDetailsModal from './gameDetailsModal';
import format from "date-fns/format";
import { arraySorter, caseInsensitiveAlphabeticalSorter, dateSorter } from '@/helpers/sorters';

const GameTable = ({ data } : {  data: IGameData[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [homepage, setHomepage] = useState("");

  const columns: ExtendedColumn[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Game',
      accessor: 'game',
      Cell: ({value}) => <a href="#" onClick={(e) => { 
        e.preventDefault();
        setIsModalOpen(true);
        setTitle(value.txt);
        setHomepage(value.link);
       }}>{value.txt}</a>,
      sortType: caseInsensitiveAlphabeticalSorter
    },
    {
      Header: 'First release date',
      accessor: 'firstReleaseDate',
      Cell: ({ value }: { value: Date }) => <>{format(value, "MMMM dd, yyyy")}</>,
      sortType: dateSorter
    },
    {
        Header: 'Genre(s)',
        accessor: 'genres',
        Cell: ({ value }) => <>{value.join(', ')}</>,
        sortType: arraySorter
    },
    {
        Header: 'Code license',
        accessor: 'codeLicense'
    },
    {
        Header: 'Repository',
        accessor: 'sourceLink',
        Cell: ({ value }) => <a href={value}>source</a>,
        disableSortBy: true
    },
    {
      Header: 'Languages',
      accessor: 'langs',
      Cell: ({ value }) => <>{value.join(', ')}</>,
      disableSortBy: true
    },    
  ], []
  );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
      <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || i} >
              {headerGroup.headers.map((column: ColumnInstance<IGameData>) => (
                 <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>
                {column.disableSortBy ? ' ' : (column.isSorted ? (column.isSortedDesc ? ' ⇊' : ' ⇈') : ' ⇅')}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id || i}>
                {row.cells.map(cell => {
                  // Cell
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
       <GameDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} homepage={homepage}>
            <p>Status: playable</p>
      </GameDetailsModal>
      </>
    );
  };

export default GameTable;