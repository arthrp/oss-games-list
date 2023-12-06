'use client';
import format from "date-fns/format";
import { Column, CellProps, UseSortByColumnOptions } from "react-table";

export interface IHref {
    txt: string,
    link: string
}

export interface IGameData {
    id: number,
    game: IHref,
    firstReleaseDate: Date,
    genres: string[],
    codeLicense: string,
    sourceLink: string,
    langs: string[]
};

type ExtendedColumn = Column<IGameData> & UseSortByColumnOptions<IGameData>;

export const columns: ExtendedColumn[] = [
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
      Header: 'First release date',
      accessor: 'firstReleaseDate',
      Cell: ({ value }: { value: Date }) => <>{format(value, "MMMM dd, yyyy")}</>
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
        Cell: ({ value }) => <a href={value}>source</a>,
        disableSortBy: true
    },
    {
      Header: 'Languages',
      accessor: 'langs',
      Cell: ({ value }) => <>{value.join(', ')}</>,
      disableSortBy: true
    },    
  ];