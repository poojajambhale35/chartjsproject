// src/App.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';

const socket = io('http://localhost:5000');

const App = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Live Data',
        data: [],
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    socket.on('data', newData => {
      setData(prevData => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newData],
          },
        ],
      }));
    });
  }, []);

  return (
    <div className="App">
      <h1>Live Data Chart</h1>
      <Line data={data} />
    </div>
  );
};

export default App;
