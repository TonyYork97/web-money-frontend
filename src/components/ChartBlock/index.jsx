import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend);
const colorArr = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
]
const data = {
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: colorArr,
            borderColor: colorArr,
            borderWidth: 1,
        },
    ],
    labels: ['qwe', 'wet', 'tqq', 'zxc', 'gsd', 'gaa'],


};
const options = {
    plugins: {
        legend: {
            display: false
        }
    }
}

export const ChartBlock = () => {
    return (
        <>
            <div className='mb-4 flex justify-between text-lg font-bold flex-wrap gap-1'>
                <h3 className=''>Расход в августе</h3>
                <p>34994 р.</p>
            </div>
            <div className='max-w-[240px] sm:max-w-[320px] md:max-w-[360px] mx-auto mb-4'>
                <Doughnut options={options} data={data} />
            </div>
            <ul className='flex flex-col mb-4'>
                <li className='flex items-center justify-between gap-2 flex-wrap border-b border-black px-1 py-[2px] rounded-md mb-1'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <div className='w-4 h-2 rounded-lg bg-rose-600 '></div>
                        <p>Супермаркеты</p>
                    </div>
                    <div>
                        <p>1335 р.</p>
                    </div>
                </li>
                <li className='flex items-center justify-between gap-2 flex-wrap border-b border-black px-1 py-[2px] rounded-md mb-1'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <div className='w-4 h-2 rounded-lg bg-blue-600 '></div>
                        <p>Аптеки</p>
                    </div>
                    <div>
                        <p>2712 р.</p>
                    </div>
                </li>
                <li className='flex items-center justify-between gap-2 flex-wrap border-b border-black px-1 py-[2px] rounded-md mb-1'>
                    <div className='flex items-center gap-2 flex-wrap '>
                        <div className='w-4 h-2 rounded-lg bg-green-600 '></div>
                        <p>Кафе и рестораны</p>
                    </div>
                    <div>
                        <p>10712 р.</p>
                    </div>
                </li>


            </ul>
            <div className='text-right py-1 s'>
                <button className='text-mainGreen font-light text-sm hover:text-green-500 transition-colors'>Показать больше</button>
            </div>
        </>
    )
}
