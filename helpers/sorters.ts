import { IGameData } from "@/data/columns";
import { Row } from "react-table";

export const dateSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
    const dateA = new Date(rowA.values[columnId]);
    const dateB = new Date(rowB.values[columnId]);

    return dateA.getTime() - dateB.getTime();
}

export const arraySorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
    const arrA = rowA.values[columnId] as string[];
    const arrB = rowB.values[columnId] as string[];

    return arrA[0].localeCompare(arrB[0], 'en');
}

export const caseInsensitiveAlphabeticalSorter = (rowA: Row<IGameData>, rowB: Row<IGameData>, columnId: string) => {
    const valA = rowA.values[columnId].txt.toLowerCase() as string;
    const valB = rowB.values[columnId].txt.toLowerCase() as string;

    return valA.localeCompare(valB, 'en');
};