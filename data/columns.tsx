'use client';
import { Column, CellProps } from "react-table";

export interface IHref {
    text: string,
    link: string
}

export interface IGameData {
    id: number,
    gameName: string,
    firstReleaseYear: number,
    genre: string,
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
        Header: 'Genre',
        accessor: 'genre',
    },
    {
        Header: 'Repository',
        accessor: 'sourceLink',
        Cell: ({ value }) => <a href={value} key={Math.random()}>source</a>
    },    
  ];