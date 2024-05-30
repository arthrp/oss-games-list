'use client';
import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { parseISO } from "date-fns";
import { IGameData } from "@/data/columns";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Count',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
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
            setChartData(getChartData(parsedData));
          };

        fetchData();
    }, []);

    return (
    <div className="container"  style={{ height: '100%' }}>
        <h1 className="mb-5 mt-5">Statistics</h1>
        <Pie data={chartData} options={options} />
    </div>
    )
}

function getChartData(gameData: IGameData[]){
    interface Acc {
        [key: string]: number;
    }

    const top = gameData.map(e => e.codeLicense).reduce<Acc>((acc,val) => { 
        if (!acc[val]) {
            acc[val] = 0;
          }
          acc[val]++;
          return acc;
    }, {});

    const data = {
        labels: Object.keys(top),
        datasets: [
            {
                label: 'Count',
                data: Object.values(top),
                backgroundColor: [
                    'rgb(255, 99, 132, 0.5)',
                    'rgb(255, 159, 64, 0.5)',
                    'rgb(255, 205, 86, 0.5)',
                    'rgb(75, 192, 192, 0.5)',
                    'rgb(54, 162, 235, 0.5)',
                    'rgb(153, 102, 255, 0.5)',
                    'rgb(201, 203, 207, 0.5)'
                ],
                borderColor: [
                    'rgb(255, 99, 132, 1)',
                    'rgb(255, 159, 64, 1)',
                    'rgb(255, 205, 86, 1)',
                    'rgb(75, 192, 192, 1)',
                    'rgb(54, 162, 235, 1)',
                    'rgb(153, 102, 255, 1)',
                    'rgb(201, 203, 207, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return data;
}