'use client';
import { IGameData } from '@/data/columns';
import React from 'react';
import { Column, useTable } from 'react-table';


type IGameTableProps = {
  data: IGameData[];
  columns: Column<IGameData>[];
};

const GameTable: React.FC<IGameTableProps> = ({ data, columns }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    return (
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || i} >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
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