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
import { useRef } from 'react';
import { useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    // responsive: true,
    scales: {
        yAxes: {
            ticks: {
                display: false
            }
        }
    },
    tooltips: {
        enabled: false
    },
    maintainAspectRatio: false,
    elements: {
        bar: {

        }
    },
    plugins: {
        legend: {
            display: false

        },
        title: {
            display: true,
            text: 'Расходы за год',
        },

    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    const barRef = useRef();

    useEffect(() => {
        barRef.current.scrollLeft = barRef.current.scrollWidth
        console.log(barRef);
    }, [])

    return (
        <div className='w-full overflow-x-auto py-2' ref={barRef}>
            <div className='w-[640px] sm:w-full  md:flex-1 h-[320px]'>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}
