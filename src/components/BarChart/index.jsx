import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Расходы за год',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
    labels,
    datasets: [
        {
            label: '',
            data: [12632, 19868, 30554, 53114, 29685, 35778, 41144, 25525, 63111, 13678, 53947, 24156],
            backgroundColor: 'rgb(198, 255, 0)',
        },
    ],
};

export const BarChart = () => {
    return (
        <div className='flex-1'>
            <Bar options={options} data={data} />
        </div>
    )
}
