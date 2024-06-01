'use client';
import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { parseISO } from "date-fns";
import { IGameData } from "@/data/columns";
import { getColors } from "@/helpers/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
    const data = {
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
    const [chartData, setChartData] = useState<any>(data);

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
            const c = getChartData(parsedData)
            setChartData(c);
          };

        fetchData();
        getColors(7,0.5);
    }, []);

    return (
    <div className="container"  style={{ height: '100%', maxHeight: 600 }}>
        <h1 className="mb-5 mt-5">Statistics</h1>
        <Pie data={chartData} options={options} />
    </div>
    )
}

function getChartData(gameData: IGameData[]){
    
    const top = gameData.map(e => e.codeLicense).reduce<{ [key: string]: number }>((acc,val) => { 
        if (!acc[val]) {
            acc[val] = 0;
          }
          acc[val]++;
          return acc;
    }, {});

    const bgColors = getColors(Object.keys(top).length, 0.6);
    const borderColors = getColors(Object.keys(top).length, 1);
    const data = {
        labels: Object.keys(top),
        datasets: [
            {
                label: 'Count',
                data: Object.values(top),
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return data;
}