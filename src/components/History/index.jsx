import moment from 'moment';
import React from 'react'
import { useMemo } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useObserver } from '../../hooks/useObserver';
import { links } from '../../links';
import { setDeleteError, setDeleteSuccess } from '../../store/slices/operationsSlice';
import { ButtonError } from '../ButtonError';
import { HistoryCategoryItem } from '../HistoryCategoryItem';
import { HistoryItem } from '../HistoryItem';
import { MainLoading } from '../MainLoading';
import { PopupWindow } from '../PopupWindow';
import { ShowMoreButton } from '../ShowMoreButton';

let dateHistory = ''
moment().locale('ru');

export const History = ({
  data,
  full = false,
  title = '',
  isLazyLoading,
  isLoading,
  totalPages,
  page,
  setPage,
  withDate = false,
  reload,
  reloadAll,
  error
}) => {
  const observerRef = useRef();

  const { deleteError, deleteSuccess } = useSelector(state => state.operations)
  const dispatch = useDispatch()


  useObserver(observerRef, page < totalPages, isLazyLoading, () => {
    setPage(prev => prev + 1)
  }, full, isLoading, error)

  const funcData = useMemo(() => {
    if (!withDate) {
      return null
    }
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
                  reload={reloadAll}
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
                reload={reloadAll}
              />
            )
          }
        })
        : ''
    dateHistory = ''
    return dataWithDate
  }, [data])

  const funcDataWithoutDate = useMemo(() => {
    if (withDate) {
      return null
    }
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
              reload={reloadAll}
            />
          )
        })
        : ''
    return dataWhithoutDate
  }, [data])


  // max-h-[520px] overflow-y-auto
  if ((isLoading || isLazyLoading) && !data.length) {
    return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><MainLoading size={32} /></div>
  }

  return (
    <>
      {deleteSuccess && <PopupWindow onClose={() => dispatch(setDeleteSuccess(false))} text="Операция успешно удалена" />}
      {deleteError && <PopupWindow onClose={() => dispatch(setDeleteError(null))} error text={deleteError} />}

      <div className='flex flex-col h-full justify-between'>
        {error
          ? <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <ButtonError update={reload} />
          </div>
          : <div>
            {title &&
              <h3 className='text-lg font-bold mb-4'>{title}</h3>
            }

            {withDate
              ? funcData
                ? funcData
                : <div className="flex justify-center items-center h-[470px] w-full">{isLazyLoading
                  ? <MainLoading size={32} />
                  : <p>Операций не найдено</p>
                }</div>

              : funcDataWithoutDate
                ? funcDataWithoutDate
                : <div className="flex justify-center items-center h-[470px] w-full">{isLazyLoading
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
        }

        {data.length ? !full ?
          <div className='text-right py-1'>
            <ShowMoreButton
              to={links.history}
              title="Показать больше"
            />
          </div>
          : ''
          : ''
        }
      </div>
    </>

  )
}
