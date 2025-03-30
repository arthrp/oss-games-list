import { IGameData } from "@/data/columns";

//Add more date columns as required
type DateColumns = "firstReleaseDate";
type StringArrColumns = "genres" | "langs";

export const dateSorter = (rowA: IGameData, rowB: IGameData, columnId: DateColumns) => {
    const dateA = new Date(getDateValue(rowA, columnId) as Date);
    const dateB = new Date(getDateValue(rowB, columnId) as Date);

    return dateA.getTime() - dateB.getTime();
}

export const arraySorter = (rowA: IGameData, rowB: IGameData, columnId: StringArrColumns) => {
    const arrA = getStringArrayValue(rowA, columnId);
    const arrB = getStringArrayValue(rowB, columnId);

    return arrA[0].localeCompare(arrB[0], 'en');
}

export const caseInsensitiveAlphabeticalSorter = (rowA: IGameData, rowB: IGameData) => {
    const valA = rowA.game.txt.toLowerCase();
    const valB = rowB.game.txt.toLowerCase();

    return valA.localeCompare(valB, 'en');
};


const getDateValue = (obj: IGameData, key: DateColumns): Date => obj[key];

const getStringArrayValue = (obj: IGameData, key: StringArrColumns): string[] => obj[key];