export function getColors(count: number, opacity: number){
    const colors = ColorArr.slice(0,count).map(c => `rgb(${c},${opacity})`);
    return colors;
}

const ColorArr = [
    "255, 99, 132",
    "255, 159, 64",
    "255, 205, 86",
    "75, 192, 192",
    "54, 162, 235",
    "153, 102, 255",
    "0, 76, 109",
    "201, 203, 207"
];