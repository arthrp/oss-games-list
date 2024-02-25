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

export type ExtendedColumn = Column<IGameData> & UseSortByColumnOptions<IGameData>;

const dateSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const dateA = new Date(rowA.values[columnId]);
  const dateB = new Date(rowB.values[columnId]);

  return dateA.getTime() - dateB.getTime();
}

const arraySorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const arrA = rowA.values[columnId] as string[];
  const arrB = rowB.values[columnId] as string[];

  return arrA[0].localeCompare(arrB[0], 'en');
}

const caseInsensitiveAlphabeticalSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
  const valA = rowA.values[columnId].txt.toLowerCase() as string;
  const valB = rowB.values[columnId].txt.toLowerCase() as string;

  return valA.localeCompare(valB, 'en');
};

