import moment from 'moment';
import React, { useState } from 'react'
import { useMemo } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useObserver } from '../../hooks/useObserver';
import { links } from '../../links';
import { HistoryCategoryItem } from '../HistoryCategoryItem';
import { HistoryItem } from '../HistoryItem';
import { MainLoading } from '../MainLoading';



let dateHistory = ''
moment().locale('ru');


export const History = ({ data, full = false, title = '', isLazyLoading, isLoading, totalPages, page, setPage, withDate = false }) => {
  const observerRef = useRef();
  // const [dateHistory, setDate] = useState('');


  useObserver(observerRef, page < totalPages, isLazyLoading, () => {
    setPage(prev => prev + 1)
  }, full, isLoading)

  const funcData = useMemo(() => {
    const dataWithDate =
      data.length
        ? data.map((el, idx) => {
          if (dateHistory !== el.date) {
            dateHistory = el.date
            const dateMoment = el.date === moment().format('YYYY-MM-DD')
              ? 'Сегодня'
              : el.date === moment().add(-1, 'd').format('YYYY-MM-DD')
                ? 'Вчера'
                : moment(el.date).format('DD MMMM, dd')
            return (
              <div key={el._id}>
                <p className='text-base font-bold mb-3 px-1'>{dateMoment}</p>
                <HistoryItem
                  id={el._id}
                  title={el.title}
                  date={el.date}
                  amount={el.amount}
                  type={el.type}
                  idx={idx}
                  paymentMethod={el.paymentMethod}
                  paymentMethodImage={el.paymentMethodImage}
                  category={el.category}
                />
              </div>
            )
          } else {
            return (
              <HistoryItem
                key={el._id}
                id={el._id}
                title={el.title}
                date={el.date}
                amount={el.amount}
                type={el.type}
                idx={idx}
                paymentMethod={el.paymentMethod}
                paymentMethodImage={el.paymentMethodImage}
                category={el.category}
              />
            )
          }
        })
        : ''
    dateHistory = ''
    return dataWithDate
  }, [data])

  const funcDataWithoutDate = useMemo(() => {
    const dataWhithoutDate =
      data.length
        ? data.map((el, idx) => {
          return (
            <HistoryCategoryItem
              key={el._id}
              id={el._id}
              title={el.title}
              date={el.date}
              amount={el.amount}
              type={el.type}
              idx={idx}
              paymentMethod={el.paymentMethod}
              paymentMethodImage={el.paymentMethodImage}
              category={el.category}
            />
          )
        })
        : ''
    return dataWhithoutDate
  }, [data])





  // max-h-[520px] overflow-y-auto
  if (isLoading && !data.length) {
    return <div className='absolute top-1/2 left-1/2 -translate-x-1/2'><MainLoading size={32} /></div>
  }
  return (
    <div className='flex flex-col justify-between h-full'>

      <div>
        {title &&
          <h3 className='text-lg font-bold mb-4'>{title}</h3>
        }
        {/* {data.length ? data.map((el, idx) =>

                <HistoryItem
                    key={idx}
                    id={el._id}
                    title={el.title}
                    date={el.date}
                    amount={el.amount}
                    type={el.type}
                    idx={idx}
                    paymentMethod={el.paymentMethod}
                    paymentMethodImage={el.paymentMethodImage}
                    category={el.category}
                />)
                : <div className='flex justify-center items-center h-[540px] w-full'>
                    {isLazyLoading
                        ? <MainLoading size={32} />
                        : <p>Операций не найдено</p>
                    }
                </div>
            } */}

        {
          withDate
            ? funcData
              ? funcData
              : <div className="flex justify-center items-center h-[480px] w-full">{isLazyLoading
                ? <MainLoading size={32} />
                : <p>Операций не найдено</p>
              }</div>

            : funcDataWithoutDate
              ? funcDataWithoutDate
              : <div className="flex justify-center items-center h-[480px] w-full">{isLazyLoading
                ? <MainLoading size={32} />
                : <p>Операций не найдено</p>
              }</div>


        }

        {full
          ? <div className="h-1 w-full flex justify-center" ref={observerRef} >
            {isLazyLoading ?
              <MainLoading size={32} />
              : ''
            }
          </div>
          : ''
        }
      </div>
      {data.length ? !full ?
        <div className='text-right py-1'>
          <Link to={links.history} className='text-mainGreen font-light text-sm hover:text-green-500 transition-colors'>Показать больше</Link>
        </div>
        : ''
        : ''
      }
    </div>
  )
}
