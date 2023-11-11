'use client';
import { Column, CellProps } from "react-table";

export interface IHref {
    txt: string,
    link: string
}

export interface IGameData {
    id: number,
    game: IHref,
    firstReleaseYear: number,
    genres: string[],
    codeLicense: string,
    sourceLink: string
};

export const columns: Column<IGameData>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Game',
      accessor: 'game',
      Cell: ({value}) => <a href={value.link}>{value.txt}</a>
    },
    {
      Header: 'First release',
      accessor: 'firstReleaseYear',
    },
    {
        Header: 'Genre(s)',
        accessor: 'genres',
        Cell: ({ value }) => <>{value.join(', ')}</>
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