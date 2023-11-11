'use client';
import { Column, CellProps } from "react-table";

export interface IHref {
    txt: string,
    link: string
}

export interface IGameData {
    id: number,
    gameName: string,
    firstReleaseYear: number,
    genre: string,
    codeLicense: string,
    sourceLink: string
};

export const columns: Column<IGameData>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'gameName',
    },
    {
      Header: 'First release',
      accessor: 'firstReleaseYear',
    },
    {
        Header: 'Genre(s)',
        accessor: 'genre',
    },
    {
        Header: 'Code license',
        accessor: 'codeLicense'
    },
    {
        Header: 'Repository',
        accessor: 'sourceLink',
        Cell: ({ value }) => <a href={value}>source</a>
    },    
  ];