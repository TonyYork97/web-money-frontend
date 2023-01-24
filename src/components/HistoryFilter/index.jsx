import React, { useState } from 'react'
import { Input } from '../Input'
import moment from 'moment'
import Close from '../../assets/images/close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setMaxAmountValue, setMaxDateValue, setMinAmountValue, setMinDateValue, setTypeOperation } from '../../store/slices/filterSlice'
import { useEffect } from 'react'
import axios from '../../axios'
import { useResize } from '../../hooks/Rezise'
import styles from './styles.module.scss'
import { ModalWindow } from '../ModalWindow'

const minDate = moment().add(-11, 'M').startOf('M').format('YYYY-MM-DD');
const maxDate = moment().format('YYYY-MM-DD')
const minAmount = '0'
const maxAmount = '999999999.99'
const typeOperations = [
  {
    label: 'Расходы',
    value: 'expense'
  },
  {
    label: 'Доходы',
    value: 'revenue'
  }
]

export const HistoryFilter = ({
  limit,
  setIsLoading,
  setPage,
  setFlag,
  setOperations,
  fullDateValue,
  setFullDateValue,
  setTotalPages,
  setError
}) => {

  const [isPeriodActive, setIsPeriodActive] = useState(false)
  const [isAmountActive, setIsAmountActive] = useState(false)
  const [isTypeActive, setIsTypeActive] = useState(false)
  // const [fullDateValue, setFullDateValue] = useState('')
  const [fullAmountValue, setFullAmountValue] = useState('')
  const [minDateInput, setMinDateInput] = useState(minDate)
  const [maxDateInput, setMaxDateInput] = useState(maxDate)
  const [minAmountInput, setMinAmountInput] = useState(0)
  const [maxAmountInput, setMaxAmountInput] = useState(999999999.99)
  const [amountError, setAmountError] = useState('')
  const { width } = useResize()
  const { type, minDateValue, maxDateValue, minAmountValue, maxAmountValue, } = useSelector(state => state.filter)
  const dispatch = useDispatch()

  // const getFilterOperations = async (minDate, maxDate, minAmount, maxAmount, typeOperations) => {
  //   try {
  //     setFlag(true)
  //     setIsLoading(true)
  //     setPage(1)
  //     setOperations([])
  //     setTotalPages(0)
  //     await axios.get('/app/operation', {
  //       params: {
  //         limit: 15,
  //         page: 1,
  //         type: typeOperations === undefined ? type.value : typeOperations,
  //         dateFrom: minDate ? minDate : minDateInput,
  //         dateTo: maxDate ? maxDate : maxDateInput,
  //         amountFrom: minAmount ? minAmount : minAmountInput,
  //         amountTo: maxAmount ? maxAmount : maxAmountInput
  //       }
  //     }).then(({ data }) => {
  //       if (data?.message) {
  //         setOperations([])
  //         setTotalPages(0)
  //         setError('error')
  //       }
  //       setError(null)
  //       setOperations([...data.operations])
  //       let totalCount = Math.ceil(data.totalCount / 15)
  //       setTotalPages(totalCount)

  //     })

  //   } catch (err) {
  //     console.warn(err);
  //     setOperations([])
  //     setTotalPages(0)
  //     setError('error')
  //   } finally {
  //     setIsLoading(false)
  //     setFlag(false)
  //   }
  // }

  const getFilterOperations = async ({ minDate, maxDate, minAmount, maxAmount, typeOperations }) => {
    try {
      setFlag(true)
      setIsLoading(true)
      setPage(1)
      setOperations([])
      setTotalPages(0)
      await axios.get('/app/operation', {
        params: {
          limit,
          page: 1,
          type: typeOperations === undefined ? type.value : typeOperations,
          dateFrom: minDate ? minDate : minDateValue,
          dateTo: maxDate ? maxDate : maxDateValue,
          amountFrom: minAmount ? minAmount : minAmountValue,
          amountTo: maxAmount ? maxAmount : maxAmountValue
        }
      }).then(({ data }) => {
        if (data?.message) {
          setOperations([])
          setTotalPages(0)
          setError('error')
        }
        setError(null)
        setOperations([...data.operations])
        let totalCount = Math.ceil(data.totalCount / limit)
        setTotalPages(totalCount)

      })

    } catch (err) {
      console.warn(err);
      setOperations([])
      setTotalPages(0)
      setError('error')
    } finally {
      setIsLoading(false)
      setFlag(false)
    }
  }

  const handleDate = () => {
    if (!minDateValue && !maxDateValue) {
      dispatch(setMinDateValue(''))
      dispatch(setMaxDateValue(''))
      setFullDateValue('')
      setIsPeriodActive(false)
      return
    }
    if (!minDateValue) {
      dispatch(setMinDateValue(minDate))
      getFilterOperations({ minDate })
      setFullDateValue(`${moment(minDate).format('DD.MM.YY')} - ${moment(maxDateValue).format('DD.MM.YY')}`)
      setIsPeriodActive(false)
      return
    }
    if (!maxDateValue) {
      dispatch(setMaxDateValue(maxDate))
      getFilterOperations({ maxDate })
      setFullDateValue(`${moment(minDateValue).format('DD.MM.YY')} - ${moment(maxDate).format('DD.MM.YY')}`)
      setIsPeriodActive(false)
      return
    }
    getFilterOperations({})
    setFullDateValue(`${moment(minDateValue).format('DD.MM.YY')} - ${moment(maxDateValue).format('DD.MM.YY')}`)
    setIsPeriodActive(false)
  }

  const handleAmount = async () => {
    if (!maxAmountValue && !minAmountValue) {
      dispatch(setMinAmountValue(''))
      dispatch(setMaxAmountValue(''))
      setIsAmountActive(false)
      setFullAmountValue('')
      return
    }
    if (!minAmountValue) {
      dispatch(setMinAmountValue(minAmount))
      setFullAmountValue(`${minAmount} ₽ - ${maxAmountValue} ₽`)
      setIsAmountActive(false)
      getFilterOperations({ minAmount })
      return
    }
    if (!maxAmountValue) {
      dispatch(setMaxAmountValue(maxAmount))
      getFilterOperations({ maxAmount })
      setIsAmountActive(false)
      setFullAmountValue(`${minAmountValue} ₽ - ${maxAmount} ₽`)
      return
    }
    if (+minAmountValue > +maxAmountValue) {
      dispatch(setMaxAmountValue(minAmountValue))
      getFilterOperations({ minAmount: minAmountValue, maxAmount: minAmountValue })
      setIsAmountActive(false)
      setFullAmountValue(`${minAmountValue} ₽ - ${minAmountValue} ₽`)
      return
    }
    setFullAmountValue(`${minAmountValue} ₽ - ${maxAmountValue} ₽`)
    getFilterOperations({})
    setIsAmountActive(false)
  }

  const removeDate = (e) => {
    e.stopPropagation()
    dispatch(setMinDateValue(''))
    dispatch(setMaxDateValue(''))
    setFullDateValue('')
    getFilterOperations({ minDate, maxDate })
  }

  const removeAmount = (e) => {
    e.stopPropagation()
    dispatch(setMinAmountValue(''))
    dispatch(setMaxAmountValue(''))
    setFullAmountValue('')
    getFilterOperations({ minAmount, maxAmount })
  }

  const removeType = (e) => {
    e.stopPropagation()
    dispatch(setTypeOperation(''))
    getFilterOperations({ typeOperations: '' })
  }

  useEffect(() => {
    return () => {
      dispatch(setMinAmountValue(''))
      dispatch(setMaxAmountValue(''))
      setFullAmountValue('')
      dispatch(setTypeOperation(''))

      setPage(1)
      setOperations([])
      dispatch(setMinDateValue(''))
      dispatch(setMaxDateValue(''))
      setFullDateValue('')
    }
  }, [])

  const handleType = (value) => {
    dispatch(setTypeOperation(value))
    setIsTypeActive(false)
    getFilterOperations({ typeOperations: value.value })
  }

  const closeActive = () => {
    setIsAmountActive(false)
    setIsPeriodActive(false)
    setIsTypeActive(false)
  }

  const closePeriod = (e) => {
    e.stopPropagation()
    setIsPeriodActive(false)
    setIsAmountActive(false)
    setIsTypeActive(false)
  }

  const changeMinDateInput = e => {
    // setMinDateInput(e.target.value)
    dispatch(setMinDateValue(e.target.value))
    if (e.target.value > maxDateValue) {
      dispatch(setMaxDateValue(maxDate))
    }
  }
  const changeMaxDateInput = e => {
    dispatch(setMaxDateValue(e.target.value))
    if (e.target.value < minDateValue) {
      dispatch(setMinDateValue(e.target.value))
    }
  }

  const onChangeAmountMin = e => {
    dispatch(setMinAmountValue(e.target.value))
  }
  const onChangeAmountMax = e => {
    dispatch(setMaxAmountValue(e.target.value))
  }

  return (
    <>
      <div className={`${width > 1132 ? 'overflow-visible' : 'overflow-x-auto'} pb-1 mb-3 w-[calc(100%-14px)] absolute ${styles.filterHistory}`}>
        <div className='flex items-center gap-3 w-[556px]'>
          <div className='w-[170px] relative '>
            <div onClick={() => setIsTypeActive(!isTypeActive)} className=' cursor-pointer rounded-xl border border-bggBottom dark:bg-white py-1 lg:py-2 px-2 flex justify-between items-center'>
              <p className='text-textOpacity dark:text-darkBlack dark:text-opacity-75 select-none'>
                {type ? type.label : 'Тип операции'}
              </p>
              {type
                ? <img onClick={removeType} className='w-5 h-5 cursor-pointer dark:bg-darkBlack dark:rounded-full rounded-xl hover:bg-textOpacity transition-colors' src={Close} alt="remove" />
                : ''
              }
            </div>

            {isTypeActive && width > 1132 &&
              <>
                <div onClick={closePeriod} className='fixed z-[990] top-0 right-0 left-0 bottom-0'></div>
                <div className='absolute w-full bg-blackMenu dark:border dark:border-bggBottom dark:bg-white py-3 px-3 rounded-lg z-[997]'>
                  {typeOperations.map(el => <p key={el.label} className='cursor-pointer select-none hover:bg-background dark:hover:bg-bggBottom  transition-colors rounded-lg mb-2 last:mb-0 p-2' onClick={() => handleType(el)}>{el.label}</p>)}
                </div>
              </>
            }
          </div>
          <div className='w-[180px] relative'>
            <div onClick={() => setIsPeriodActive(!isPeriodActive)} className='cursor-pointer rounded-xl border border-bggBottom dark:bg-white py-1 lg:py-2 px-2 flex justify-between items-center'>
              <p className='text-textOpacity dark:text-darkBlack dark:text-opacity-75 select-none'>
                {fullDateValue ? fullDateValue : 'Период'}
              </p>
              {fullDateValue
                ? <img onClick={removeDate} className='w-5 h-5 cursor-pointer dark:bg-darkBlack dark:rounded-full rounded-xl hover:bg-textOpacity transition-colors' src={Close} alt="remove" />
                : ''
              }
            </div>

            {isPeriodActive && width > 1132 &&
              <>
                <div onClick={closePeriod} className='fixed z-[990] top-0 right-0 left-0 bottom-0'></div>
                <div className='absolute w-full dark:border dark:border-bggBottom bg-blackMenu dark:bg-white py-3 px-3 z-[997] rounded-lg'>
                  <Input label="От" type="date" min={minDate} max={maxDate} value={minDateValue} onChange={changeMinDateInput} />
                  <Input label="До" type="date" min={minDate} max={maxDate} value={maxDateValue} onChange={changeMaxDateInput} />
                  <button onClick={handleDate} className='text-mainGreen hover:text-secondGreen dark:text-darkBlack transition-colors'>Продолжить</button>
                </div></>}
          </div>

          <div className='w-[180px] relative'>
            <div onClick={() => setIsAmountActive(!isAmountActive)} className='cursor-pointer rounded-xl border border-bggBottom dark:bg-white py-1 lg:py-2 px-2 flex justify-between items-center'>
              <p className='text-textOpacity dark:text-darkBlack dark:text-opacity-75 select-none w-[140px] overflow-hidden whitespace-nowrap  '>
                {fullAmountValue ? fullAmountValue : 'Сумма'}
              </p>

              {fullAmountValue
                ? <img onClick={removeAmount} className='w-5 h-5 cursor-pointer dark:bg-darkBlack dark:rounded-full rounded-xl hover:bg-textOpacity transition-colors' src={Close} alt="remove" />
                : ''
              }
            </div>
            {isAmountActive && width > 1132 &&
              <>
                <div onClick={closePeriod} className='fixed z-[990] top-0 right-0 left-0 bottom-0'></div>
                <div className='absolute w-full z-[990] dark:border dark:border-bggBottom bg-blackMenu dark:bg-white py-3 px-3 rounded-lg'>
                  {amountError &&
                    <p className="text-red-700">{amountError}</p>
                  }
                  <Input label="От" type="number" value={minAmountValue} min={0} max={999999999.99} onChange={onChangeAmountMin} placeholder="0" />
                  <Input label="До" type="number" value={maxAmountValue} min={0} max={999999999.99} onChange={onChangeAmountMax} placeholder="0" />

                  <button onClick={handleAmount} className='text-mainGreen hover:text-secondGreen dark:text-darkBlack transition-colors'>Продолжить</button>
                </div></>}
          </div>
        </div>
      </div>
      <div>
        {isAmountActive && width <= 1132
          ? <ModalWindow title="Выберете сумму" onClose={closeActive}>
            <Input label="От" type="number" min={0} max={999999999.99} value={minAmountValue} onChange={onChangeAmountMin} placeholder="0" />
            <Input label="До" type="number" min={0} max={999999999.99} value={maxAmountValue} onChange={onChangeAmountMax} placeholder="0" />
            <button onClick={handleAmount} className='text-mainGreen hover:text-bggGreen dark:text-darkBlack dark:hover:text-textPrime transition-colors'>Продолжить</button>
          </ModalWindow>
          : ''
        }
        {isPeriodActive && width <= 1132
          ? <ModalWindow title="Выберете дату" onClose={closeActive}>
            <Input label="От" type="date" min={minDate} max={maxDate} value={minDateValue} onChange={changeMinDateInput} />
            <Input label="До" type="date" min={minDate} max={maxDate} value={maxDateValue} onChange={changeMaxDateInput} />
            <button onClick={handleDate} className='text-mainGreen hover:text-bggGreen dark:text-darkBlack dark:hover:text-textPrime transition-colors'>Продолжить</button>
          </ModalWindow>
          : ''
        }
        {isTypeActive && width <= 1132
          ? <ModalWindow title="Тип операции" onClose={closeActive}>
            {typeOperations.map(el => <p key={el.label} className='cursor-pointer select-none hover:bg-background dark:hover:bg-bggBottom  transition-colors rounded-lg mb-2 last:mb-0 p-2' onClick={() => handleType(el)}>{el.label}</p>)}

          </ModalWindow>
          : ''
        }

      </div>
    </>
  )
}


