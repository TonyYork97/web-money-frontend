import React from 'react'
import axios from '../../axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { History } from '../../components/History'
import { NavHistory } from '../../components/NavHisory'
import { ShadowBlock } from '../../components/ShadowBlock'
import { HistoryFilter } from '../../components/HistoryFilter'
import { useNavigate } from 'react-router-dom'
import { userIsAuth } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

export const HistoryPage = () => {
    const { typeOfPayment, type, minDateValue, maxDateValue, minAmountValue, maxAmountValue } = useSelector(state => state.filter)
    const [limit] = useState(15);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [operations, setOperations] = useState([])
    const [error, setError] = useState(null)

    const [fullDateValue, setFullDateValue] = useState('')


    // при попытки получить данные с теми же параметрами, запрос выполнится
    const [flag, setFlag] = useState(false)

    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();

    const getOperations = async (clear) => {
        try {
            setIsLoading(true)
            await axios.get('/app/operation', {
                params: {
                    limit,
                    page,
                    type: type?.value,
                    dateFrom: minDateValue,
                    dateTo: maxDateValue,
                    amountFrom: minAmountValue,
                    amountTo: maxAmountValue
                }
            }).then(({ data }) => {
                if (data?.message) {
                    setError('error')
                    setOperations([])
                    setTotalPages(0)
                } else {
                    if (clear) {
                        setOperations([...data.operations])
                    } else {
                        setOperations([...operations, ...data.operations])
                    }
                    setError(null)
                    let totalCount = Math.ceil(data.totalCount / limit)
                    setTotalPages(totalCount)
                }
            })
        } catch (err) {
            console.warn(err);
            setError('error')
            setOperations([])
            setTotalPages(0)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [flag, type, typeOfPayment, minDateValue, maxDateValue, minAmountValue, maxAmountValue])

    useEffect(() => {
        if (!localStorage.getItem('token') && !isAuth) {
            navigate('/', { replace: true })
        }
        if (isAuth && !flag) {
            getOperations()
        }
    }, [page])

    return (
        <NavHistory >
            <div className='max-w-[720px] mx-auto'>
                <div className='grid  md:grid-cols-1 gap-2 items-start'>
                    <div className=' md:col-span-1' >
                        <ShadowBlock height='min-h-[calc(100vh-80px)]'>
                            <HistoryFilter
                                setIsLoading={setIsLoading}
                                setPage={setPage}
                                setTotalPages={setTotalPages}
                                setFullDateValue={setFullDateValue}
                                fullDateValue={fullDateValue}
                                setFlag={setFlag}
                                setError={setError}
                                setOperations={setOperations}
                            />
                            <div className='mt-10 lg:mt-12'>
                                <History
                                    withDate
                                    data={operations}
                                    full
                                    isLazyLoading={isLoading}
                                    page={page}
                                    totalPages={totalPages}
                                    setPage={setPage}
                                    error={error}
                                    reload={getOperations}
                                    setOperations={setOperations}
                                    reloadAll={getOperations}
                                />
                            </div>
                        </ShadowBlock>
                    </div>
                </div>
            </div>
        </NavHistory>
    )
}
