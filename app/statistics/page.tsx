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
        getColors(7,0.5);
    }, []);

    return (
    <div className="container">
        <h1 className="mb-5 mt-5">Statistics</h1>
        
        <div className={css.chartContainer}>
            <h2 className={css.subheader}>Licenses</h2>
            <Pie data={licenseData} options={options} />
        </div>

        <div className={css.chartContainer} style={{ marginTop: 70 }}>
            <h2 className={css.subheader}>Primary language</h2>
            <Pie data={languageData} options={options} />
        </div>
    </div>
    )
}

function getLanguagesChartData(gameData: IGameData[]){
    const topLangs = gameData.map(e => e.langs[0]).reduce<{ [key: string]: number }>((acc,val) => { 
        if (!acc[val]) {
            acc[val] = 0;
          }
          acc[val]++;
          return acc;
    }, {});

    return getData(topLangs);
}

function getLicenseChartData(gameData: IGameData[]){
    const topLicenses = gameData.map(e => e.codeLicense).reduce<{ [key: string]: number }>((acc,val) => { 
        if (!acc[val]) {
            acc[val] = 0;
          }
          acc[val]++;
          return acc;
    }, {});

    return getData(topLicenses);
}

function getData(data: {[key: string]: number}){
    const bgColors = getColors(Object.keys(data).length, 0.7);
    const borderColors = getColors(Object.keys(data).length, 1);
    const resultData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Count',
                data: Object.values(data),
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return resultData;
}