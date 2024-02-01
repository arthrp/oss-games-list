'use client';
import format from "date-fns/format";
import { Column, CellProps, UseSortByColumnOptions, Row } from "react-table";

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

const dateSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const dateA = new Date(rowA.values[columnId]);
  const dateB = new Date(rowB.values[columnId]);

  return dateA.getTime() - dateB.getTime();
}

const arraySorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const arrA = rowA.values[columnId] as string[];
  const arrB = rowB.values[columnId] as string[];

  return arrA[0].localeCompare(arrB[0]);
}

const caseInsensitiveAlphabeticalSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const valA = rowA.values[columnId].txt.toLowerCase();
  const valB = rowB.values[columnId].txt.toLowerCase();

  if (valA > valB) return 1;
  if (valB > valA) return -1;
  return 0;
};

export const columns: ExtendedColumn[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Game',
      accessor: 'game',
      Cell: ({value}) => <a href={value.link}>{value.txt}</a>,
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
  ];