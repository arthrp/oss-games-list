import { IGameData } from "@/data/columns";

//Add more date columns as required
type DateColumns = "firstReleaseDate";

export const dateSorter = (rowA: IGameData, rowB: IGameData, columnId: DateColumns) => {
    const dateA = new Date(getDateValue(rowA, columnId) as Date);
    const dateB = new Date(getDateValue(rowB, columnId) as Date);

    return dateA.getTime() - dateB.getTime();
}

export const arraySorter = (rowA: IGameData, rowB: IGameData) => {
    const arrA = rowA.genres;
    const arrB = rowB.genres;

    return arrA[0].localeCompare(arrB[0], 'en');
}

export const caseInsensitiveAlphabeticalSorter = (rowA: IGameData, rowB: IGameData) => {
    const valA = rowA.game.txt.toLowerCase();
    const valB = rowB.game.txt.toLowerCase();

    return valA.localeCompare(valB, 'en');
};


const getDateValue = <T extends DateColumns>(obj: IGameData, key: T): Date => obj[key];