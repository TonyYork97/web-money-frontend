import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useRef } from 'react'
import { useEffect } from 'react'
import { TodayMoney } from '../TodayMoney'
import { MainLoading } from '../MainLoading'
import styles from './styles.module.scss'
import { ButtonError } from '../ButtonError'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  // responsive: true,
  scales: {
    yAxes: {
      ticks: {
        display: false,
      },
    },
  },
  tooltips: {
    enabled: false,
  },
  maintainAspectRatio: false,
  elements: {
    bar: {},
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: '',
    },
  },
}

export const BarChart = ({ yearExpense, isLoading, reload, error }) => {
  const barRef = useRef()

  useEffect(() => {
    if (isLoading) return
    if (error) return
    barRef.current.scrollLeft = barRef.current.scrollWidth
  }, [isLoading])

  const data = {
    labels: yearExpense.length
      ? yearExpense.map((el) => el.title.substring(0, 3))
      : [],
    datasets: [
      {
        data: yearExpense.length ? yearExpense.map((el) => el.amount) : [],
        backgroundColor:
          localStorage.getItem('theme') === 'light'
            ? '#292929'
            : 'rgb(198, 255, 0)',
      },
    ],
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <MainLoading size={32} />
      </div>
    )
  }

  return (
    <>
      {error ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <ButtonError update={reload} />
        </div>
      ) : (
        <>
          {yearExpense.length ? (
            <TodayMoney
              min={yearExpense[0] || ''}
              max={yearExpense[yearExpense.length - 1] || ''}
            />
          ) : (
            ''
          )}
          <div className='pt-5 pb-3'>
            <div className='w-full text-center'>
              <h4 className='text-xs text-textOpacity dark:text-textOpacitySecond'>
                Расходы за год
              </h4>
            </div>
            <div
              className={`${styles.bar} w-full overflow-x-auto py-2`}
              ref={barRef}
            >
              <div className='w-[640px] sm:w-full  md:flex-1 h-[320px]'>
                <Bar options={options} data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
