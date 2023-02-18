import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonGreen } from '../../components/ButtonGreen'
import { Input } from '../../components/Input'
import { links } from '../../routes/links'

import { fetchChangeLastName, fetchChangeName } from '../../store/slices/authSlice'
import { ButtonLink } from '../ButtonLink'

export const Account = () => {
  const [emailState, setEmail] = useState('')
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [helperTextName, setHelperTextName] = useState('');
  const [helperTextLastName, setHelperTextLastName] = useState('');
  const [nameState, setName] = useState('')
  const [lastNameState, setLastName] = useState('')
  const { data } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const emailRef = useRef()

  const changefullName = (e) => {
    if (lastNameState.length < 2 || lastNameState.length > 20) {
      setErrorLastName(true);
      setHelperTextLastName('Фамилия должна содержать не менее 2 и не более 20 символов')
      return
    }
    if (nameState.length < 2 || nameState.length > 20) {
      setErrorName(true);
      setHelperTextName('Имя должно содержать не менее 2 и не более 20 символов')
      return
    }
    if (nameState !== data?.user?.name) {
      dispatch(fetchChangeName({ name: nameState }))
      setErrorName(false);
      setHelperTextName('')
    }
    if (lastNameState !== data?.user?.lastName) {
      dispatch(fetchChangeLastName({ lastName: lastNameState }))
      setErrorLastName(false);
      setHelperTextLastName('')
    }
  }

  useEffect(() => {
    setEmail(data?.user?.email)
    setName(data?.user?.name)
    setLastName(data?.user?.lastName)
  }, [data])

  const resetFullName = () => {
    setLastName(data?.user?.lastName);
    setErrorLastName(false);
    setHelperTextLastName('')
    setName(data?.user?.name);
    setErrorName(false);
    setHelperTextName('')
  }

  const copyEmail = (e) => {
    emailRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  }

  const onChangeName = (e) => {
    setName(e.target.value)
    setErrorName(false);
    setHelperTextName('')
  }

  const onChangeLastName = (e) => {
    setLastName(e.target.value)
    setErrorLastName(false);
    setHelperTextLastName('')
  }

  return (
    <div className=''>
      <h3 className='mb-8 font-bold text-lg '>Аккаунт</h3>
      {/* <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Фото</h4>
        <div className='flex gap-3 sm:items-end flex-col sm:flex-row'>
          <div className='w-28 h-28 bg-textPrime rounded-full'>
            <img src={Avatar} className="w-full" alt="avatar" />
          </div>
          <input type="file" className='file:rounded-full file:px-3 file:py-2 file:hover:bg-green-300 file:cursor-pointer file:transition-colors' />
        </div>
      </div> */}
      <div className='bg-newBlack dark:bg-bggBottom rounded-xl p-2 mb-3'>
        <div className=''>
          <h4 className='text-lg font-bold mb-3'>Имя</h4>
          <Input
            onChange={onChangeName}
            value={nameState}
            helperText={helperTextName}
            error={errorName}
            maxLength={20}
          />
        </div>
        <div className='mb-3'>
          <h4 className='text-lg font-bold mb-3'>Фамилия</h4>
          <Input
            onChange={onChangeLastName}
            value={lastNameState}
            helperText={helperTextLastName}
            error={errorLastName}
            maxLength={20}
          />
        </div>
        {lastNameState !== data?.user?.lastName || nameState !== data?.user?.name
          ? <div className='flex gap-4'>
            <ButtonGreen func={changefullName} title="Сохранить изменения" />
            <ButtonGreen func={resetFullName} title="Отменить" />
          </div>
          : ''
        }
      </div>
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Почта</h4>
        <input ref={emailRef} className='bg-transparent inline mb-2 cursor-default focus:outline-none' value={emailState} readOnly />
        <div className='flex gap-4'>
          {/* <button onClick={copyEmail}>copy</button> */}
          <ButtonLink link={links.email} title="Изменить почту" />
        </div>
      </div>
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Пароль</h4>
        <div className='flex gap-4'>
          <ButtonLink link={links.password} title="Изменить пароль" />
        </div>
      </div>
    </div>
  )
}
