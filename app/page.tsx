'use client';

import 'bootstrap/dist/css/bootstrap.css'; 
import GameTable from '../components/gameTable';
import { IGameData, columns } from '../data/columns';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { parseISO } from 'date-fns';

export default function Home() {
  const [gameData, setGameData] = useState<IGameData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/games.json');
      const jsonData = await response.json();

      const parsedData = jsonData.map(
        (item: any) => ({
          ...item,
          firstReleaseDate: parseISO(item.firstReleaseDate),
        }));
      setGameData(parsedData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-5 mt-5">List of open-source games</h1>
      <GameTable columns={columns} data={gameData} />
    </div>
    );
}
