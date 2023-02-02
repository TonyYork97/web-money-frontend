import React, { useState, useEffect } from 'react'
import Close from '../../assets/images/close.svg'
import CloseLight from '../../assets/images/close-light.svg'
import { Input } from '../Input'
import { ButtonGreen } from '../ButtonGreen'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { links } from '../../links'
import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth } from '../../store/slices/authSlice'
import { fetchGetcategories, fetchGetPaymentMethods } from '../../store/slices/categoriesSlice'
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import axios from '../../axios'
import styles from './styles.scss'
import { PopupWindow } from '../PopupWindow'
import { MainLoading } from '../MainLoading'

export const AddOperation = () => {
  const [typeOpeation, setTypeOperation] = useState('Добавить')
  const [typeCategory, setTypeCategory] = useState('расход')
  const [isLoadingSubmit, setisLoadingSubmit] = useState(false)
  const [isPopup, setIsPopup] = useState(false)
  const [errorPopup, setErrorPopup] = useState(false)
  const [categoriesArr, setCategoriesArr] = useState([])
  const [paymentMethodsArr, setPaymentMethodsArr] = useState([])
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector(userIsAuth);
  const isLoading = useSelector(state => state.auth.isLoading)
  const {
    data: categories,
    isLoading: isLoadingCategories,
    dataPaymentMethods,
    categoriesError,
    paymentMethodsError
  } = useSelector(state => state.categories)
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, reset, setError, control, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      paymentMethod: '',
      type: location.pathname.includes('expense') ? 'expense' : 'revenue',
      date: moment().format('YYYY-MM-DD')
    },
    mode: 'all'
  });

  const title = register('title', { required: 'Название должно иметь не менее 2 и не более 24 символов', minLength: 2, maxLength: 24, })
  const type = register('type')
  const amount = register('amount', { required: 'Сумма не должна превышать 99 999 999 рублей 99 копеек', min: 1.00, max: 999999999.99, })
  const date = register('date', { required: 'Укажите дату' })

  const getCategories = async () => {
    if (location.pathname.includes('expense')) {
      dispatch(fetchGetcategories({ category: 'expense' }));
      dispatch(fetchGetPaymentMethods());
    } else {
      dispatch(fetchGetcategories({ category: 'revenue' }));
    }
  }

  const onSubmit = async (values) => {

    if (!values.title.trim()) {
      setError('title', { type: 'empty', message: 'Введите название операции' }, { shouldFocus: true })
      return
    };
    values.title = values.title.trim()
    try {
      setisLoadingSubmit(true)
      let { data } = id
        ? await axios.patch(`app/operation/${id}`, values)
        : await axios.post(`app/operation`, values)
      if (data?.message) {
        setErrorPopup(true)
      } else {
        setIsPopup(true)
        if (id) {
          navigate(-1, { replace: true })
        }
      }
    } catch (err) {
      console.warn(err);
      setErrorPopup(true)
    } finally {
      if (!id) {
        reset()
      }
      setisLoadingSubmit(false)
    }
  }
  const togglePopup = () => {
    setIsPopup(false);
  }
  const toggleErrorPopup = () => {
    setErrorPopup(false);
  }

  const getOperation = async () => {
    if (id) {
      await axios.get(`app/operation/${id}`).then(({ data }) => {
        setValue('title', data.title)
        setValue('amount', data.amount)
        setValue('category', data.category)
        setValue('date', data.date)
        setValue('paymentMethod', data.paymentMethod)
      }).catch(err => {
        console.warn(err);
      });
    }
  }

  const getValue = (value) => {
    return value ? categoriesArr.find(val => val.value === value) : ''
  }
  const getPaymentMethodValue = (value) => {
    return value ? paymentMethodsArr.find(val => val.value === value) : ''
  }

  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) {
      navigate('/', { replace: true })
    } else {
      getCategories();
      getOperation()
    }
  }, []);


  useEffect(() => {
    setCategoriesArr(categories ? categories.map(el => ({ value: el.title, label: el.title })) : [])
    setPaymentMethodsArr(dataPaymentMethods ? dataPaymentMethods.map(el => ({ value: el.title, label: <div className='flex gap-3 items-center'><img className='w-12' src={`https://web-money-backend.onrender.com${el.imageUrl}`} alt={el.title} /><h3>{el.title}</h3></div> })) : [])
  }, [categories, dataPaymentMethods])

  useEffect(() => {
    if (location.pathname.includes('expense')) {
      if (id) {
        setTypeOperation('Изменить')
        setTypeCategory('расход')
      } else {
        setTypeOperation('Добавить')
        setTypeCategory('расход')
      }
    } else {
      if (id) {
        setTypeOperation('Изменить')
        setTypeCategory('доход')
      } else {
        setTypeOperation('Добавить')
        setTypeCategory('доход')
      }
    }
  }, [])
  // Минимальные и максимальные даты операций
  const minDate = moment().add(-11, 'M').startOf('M').format('YYYY-MM-DD');
  const maxDate = moment().format('YYYY-MM-DD')

  if ((isLoading && !isAuth) || isLoadingCategories) {
    return <div className='w-full h-screen flex justify-center items-center'><MainLoading /></div>
  }

  return (
    <>
      {isPopup && <PopupWindow onClose={togglePopup} text={id ? 'Операция изменена' : 'Операция добавлена'} />}
      {errorPopup && <PopupWindow onClose={toggleErrorPopup} error text={id ? 'Не удалось изменить операцию' : 'Не удалось добавить операцию'} />}
      <div className='w-full pt-0 md:pt-14 md:max-w-[864px] mx-auto py-2 px-3 fixed md:static overflow-auto bg-background dark:bg-white md:bg-transparent h-screen z-[888] '>
        <div className='flex py-2 justify-between md:justify-center  items-center mb-3'>
          <h3 className='font-bold text-lg'>{typeOpeation} {typeCategory}</h3>
          <Link to={links.home} className='w-8 h-8 cursor-pointer md:hidden'>
            {localStorage.getItem('theme') === 'dark'
              ? <img src={Close} alt="close" className='w-8 h-8 cursor-pointer md:hidden' />
              : <img src={CloseLight} alt="close" className='w-8 h-8 cursor-pointer md:hidden' />
            }
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className='flex-1'>
            <Input
              type="hidden"
              onChange={type.onChange}
              name={type.name}
              ref={type.ref}
              error={Boolean(errors.type)}
              helperText={errors.type?.message}

            />

            <Input
              id='nameOperation'
              maxLength={24}
              placeholder='Название операции...'
              onChange={title.onChange}
              name={title.name}
              ref={title.ref}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
            <Input
              id='nameOperation'
              type='number'
              placeholder='Сумма'
              onChange={amount.onChange}
              name={amount.name}
              ref={amount.ref}
              error={Boolean(errors.amount)}
              helperText={errors.amount?.message}

            />
            {paymentMethodsError
              ? <div className='mb-3'><span>Способы оплаты не загрузились! попробуйте </span><button className=''
                onClick={getCategories}
              >Обновить</button></div>
              : location.pathname.includes('expense') && <div className='mb-4'> <Controller
                control={control}
                name='paymentMethod'

                render={({ field: { onChange, value }, fieldState: { error } }) => <Select
                  scrollToFocusedOptionOnUpdate={true}
                  options={
                    [{ value: '', label: <div className='flex gap-3 items-center'><h3>Не выбирать</h3></div> }, ...paymentMethodsArr]
                  }
                  placeholder="Выберете способ оплаты"
                  classNamePrefix={localStorage.getItem('theme') === 'dark' ? 'custom-select-dark' : 'custom-select'}


                  value={getPaymentMethodValue(value)}
                  onChange={(newValue) => onChange(newValue.value)}
                />}
              />
              </div>
            }

            {categoriesError
              ? <div className='mb-3'><span>Категории не загрузились! попробуйте </span><button className='mb-3'
                onClick={getCategories}
              >Обновить</button></div>
              : <div className='mb-4'> <Controller
                control={control}
                rules={{
                  required: 'Укажите категорию'
                }}
                name='category'
                render={({ field: { onChange, value }, fieldState: { error } }) => <Select
                  options={categoriesArr}

                  placeholder="Выберете категорию"
                  classNamePrefix={localStorage.getItem('theme') === 'dark' ? 'custom-select-dark' : 'custom-select'}
                  value={getValue(value)}
                  onChange={(newValue) => onChange(newValue.value)}
                />}
              />
                {errors.category && <div className='text-xs text-errorRed'>
                  {errors.category?.message || 'Укажите категорию'}
                </div>}
              </div>
            }


            <Input
              id='nameOperation'
              type='date'
              min={minDate}
              max={maxDate}
              onChange={date.onChange}
              name={date.name}
              ref={date.ref}
              error={Boolean(errors.date)}
              helperText={errors.date?.message}
            />
          </div>

          <div className='flex flex-col gap-3 '>
            <ButtonGreen
              disabled={!isLoadingSubmit}
              type="submit"
              title={`${typeOpeation} ${typeCategory}`}
              cn='w-full '
            />

            <Link
              to={links.home}
              className='py-3 px-3 border bg-gradient-to-r from-darkBlack to-darkBlack dark:text-textPrime text-center hover:from-darkBlack hover:to-bggBottom transition-all border-white rounded-xl'
            >
              Отмена
            </Link>
          </div>
        </form>


      </div >

    </>
  )
}
