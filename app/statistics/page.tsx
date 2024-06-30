'use client';
import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { parseISO } from "date-fns";
import { IGameData } from "@/data/columns";
import { getColors } from "@/helpers/colors";
import 'bootstrap/dist/css/bootstrap.css'; 
import css from './page.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface CountableUnit {
    label: string;
    count: number;
}

export default function Statistics() {
    const emptyData = {
        labels: [],
        datasets: [
            {
                label: 'Count',
                data: [],
                backgroundColor: [],
                borderColor: [],
            },
        ],
    };
    const [licenseData, setLicenseData] = useState<any>(emptyData);
    const [languageData, setLanguageData] = useState<any>(emptyData);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/games_min.json');
            const jsonData = await response.json();
      
            const parsedData = jsonData.map(
              (item: any) => ({
                ...item,
                firstReleaseDate: parseISO(item.firstReleaseDate),
              }));
            const c = getLicenseChartData(parsedData);
            const l = getLanguagesChartData(parsedData);
            setLicenseData(c);
            setLanguageData(l);
          };

        fetchData();
    }, []);

    return (
    <div className="container">
        <h1 className="mb-5 mt-5">Statistics</h1>
        
        <div className={css.chartContainer}>
            <h2 className={css.subheader}>Licenses</h2>
            <Pie data={licenseData} options={options} />
        </div>

        <div className={`${css.chartContainer} ${css.notFirstContainer}`} >
            <h2 className={css.subheader}>Primary language</h2>
            <Pie data={languageData} options={options} />
        </div>
    </div>
    )
}

function getLanguagesChartData(gameData: IGameData[]){
    const topLangs = gameData.map(e => e.langs[0]).reduce<CountableUnit[]>((acc: CountableUnit[], val: string) => {
        return getLabelCounts(acc, val);
    }, []);

    if(topLangs.length > 7) return getDataWithOther(topLangs);

    return getData(topLangs);
}

function getLicenseChartData(gameData: IGameData[]){
    const topLicenses = gameData.map(e => e.codeLicense).reduce<CountableUnit[]>((acc: CountableUnit[], val: string) => { 
        return getLabelCounts(acc, val);
    }, []);

    if(topLicenses.length > 7) return getDataWithOther(topLicenses);

    return getData(topLicenses);
}

function getDataWithOther(data: CountableUnit[]){
    const sorted = data.sort((a,b) => b.count - a.count);
    let totalOther = 0;
    for (let i = 7; i < sorted.length; i++){
        totalOther += sorted[i].count;
    }
    const res = sorted.slice(0,7);
    res[7] = { label: "Other", count: totalOther };

    return getData(res);
}

function getLabelCounts(acc: CountableUnit[], val: string){
    const existing = acc.filter(x => x.label === val);
    if(existing.length === 0) acc.push({ label: val, count: 1 })
    else existing[0].count++;
    
    return acc;    
}

function getData(data: CountableUnit[]){
    const bgColors = getColors(data.length, 0.7);
    const borderColors = getColors(data.length, 1);
    const resultData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: 'Count',
                data: data.map(d => d.count),
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return resultData;
}