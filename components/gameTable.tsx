'use client';
import { IGameData } from '@/data/columns';
import React from 'react';
import { Column, TableSortByToggleProps, useSortBy, useTable, ColumnInstance } from 'react-table';


type IGameTableProps = {
  data: IGameData[];
  columns: Column<IGameData>[];
};

const GameTable = ({ data, columns } : { columns: any, data: IGameData[] }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data }, useSortBy);
  
    return (
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || i} >
              {headerGroup.headers.map((column: ColumnInstance<IGameData>) => (
                 <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>
                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
    );
  };

export default GameTable;