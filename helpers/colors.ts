export function getColors(count: number, opacity: number){
    const colors = ColorArr.slice(0,count).map(c => `rgb(${c},${opacity})`);
    return colors;
}

const ColorArr = [
    // "26, 188, 156",
    // "46, 204, 113",
    // "52, 152, 219",
    // "155, 89, 182",
    // "52, 73, 94",
    // "22, 160, 133",
    // "39, 174, 96",
    // "41, 128, 185",

    "255, 99, 132",
    "255, 159, 64",
    "255, 205, 86",
    "75, 192, 192",
    "54, 162, 235",
    "153, 102, 255",
    "0, 76, 109",
    "148, 0, 211",
    "201, 203, 207"
];