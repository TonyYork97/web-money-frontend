import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { ButtonGreen } from '../../components/ButtonGreen'
import { Input } from '../../components/Input'
import { links } from '../../links'

import { fetchChangeLastName, fetchChangeName } from '../../store/slices/authSlice'

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

  const changeName = (e) => {
    if (nameState.length < 2 || nameState.length > 20) {
      setErrorName(true);
      setHelperTextName('Имя должно содержать не менее 2 и не более 20 символов')
    } else {
      dispatch(fetchChangeName({ name: nameState }))
      setErrorName(false);
      setHelperTextName('')
    }
  }

  const changeLastName = (e) => {
    if (lastNameState.length < 2 || lastNameState.length > 20) {
      setErrorLastName(true);
      setHelperTextLastName('Фамилия должна содержать не менее 2 и не более 20 символов')
    } else {
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
  const removeChangeName = () => {
    setName(data?.user?.name);
    setErrorName(false);
    setHelperTextName('')
  }
  const removeChangeLastName = () => {
    setLastName(data?.user?.lastName);
    setErrorLastName(false);
    setHelperTextLastName('')
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
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Имя</h4>
        <Input
          onChange={onChangeName}
          value={nameState}
          helperText={helperTextName}
          error={errorName}
          maxLength={20}
        />
        {nameState !== data?.user?.name
          ? <div className='flex gap-4'>
            <ButtonGreen func={changeName} title="Сохранить изменения" />
            <ButtonGreen func={removeChangeName} title="Отменить" />
          </div>
          : ''
        }
      </div>
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Фамилия</h4>
        <Input
          onChange={onChangeLastName}
          value={lastNameState}
          helperText={helperTextLastName}
          error={errorLastName}
          maxLength={20}
        />
        {lastNameState !== data?.user?.lastName
          ? <div className='flex gap-4'>
            <ButtonGreen func={changeLastName} title="Сохранить изменения" />
            <ButtonGreen func={removeChangeLastName} title="Отменить" />
          </div>
          : ''
        }
      </div>
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Почта</h4>
        <input ref={emailRef} className='bg-transparent inline mb-2 cursor-default focus:outline-none' value={emailState} readOnly />
        <div className='flex gap-4'>
          {/* <button onClick={copyEmail}>copy</button> */}
          <Link to={links.email} className=" py-3 px-3 text-background rounded-xl  transition-colors font-bold bg-mainGreen hover:bg-secondGreen">Изменить почту</Link>
        </div>
      </div>
      <div className='mb-8'>
        <h4 className='text-lg font-bold mb-3'>Пароль</h4>

        <div className='flex gap-4'>
          <Link to={links.password} className=" py-3 px-3 text-background rounded-xl  transition-colors font-bold bg-mainGreen hover:bg-secondGreen">Изменить пароль</Link>
        </div>
      </div>
    </div>
  )
}
