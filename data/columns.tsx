'use client';
import { Column, CellProps, UseSortByColumnOptions, Row } from "react-table";

export interface IHref {
    txt: string,
    link: string,
    screens: string[]
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
