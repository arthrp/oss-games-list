'use client';
import { ColumnDef } from "@tanstack/react-table";

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

export type ExtendedColumn = ColumnDef<IGameData>;
