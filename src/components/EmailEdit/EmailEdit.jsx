import React, { useEffect } from 'react'
import { ButtonGreen } from '../ButtonGreen'
import { Input } from '../Input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchChangeEmail,
  setChangeEmailError,
  setIsSuccessChangeEmail,
} from '../../store/slices/authSlice'
import { PopupWindow } from '../PopupWindow'
import { MainLoading } from '../MainLoading'

export const EmailEdit = () => {
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmEmailHelperText, setConfirmEmailHelperText] = useState('')
  const [confirmEmailError, setConfirmEmailError] = useState(false)
  const [confirmNewEmailHelperText, setNewEmailHelperText] = useState('')
  const [newEmailError, setNewEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const { changeEmailError, isLoadingChangeEmail, isSuccessChangeEmail, data } =
    useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const changeEmail = async () => {
    let trimEmail = email.trim()
    let trimConfirmEmail = confirmEmail.trim()
    if (!trimEmail) {
      setNewEmailError(true)
      setNewEmailHelperText('Введите новый E-mail')
      return
    }
    if (!trimConfirmEmail) {
      setConfirmEmailError(true)
      setConfirmEmailHelperText('Подтвердите E-mail')
      return
    }
    if (trimEmail !== trimConfirmEmail) {
      setConfirmEmailError(true)
      setConfirmEmailHelperText('E-mail не совпадают')
      return
    }
    if (
      data.user?.email === trimEmail ||
      data.user?.email === trimConfirmEmail
    ) {
      setNewEmailError(true)
      setNewEmailHelperText('Новый и текущий E-mail совпадают')
      return
    }
    setConfirmEmailError(false)
    setConfirmEmailHelperText('')
    setNewEmailError(false)
    setNewEmailHelperText('')
    const response = await dispatch(
      fetchChangeEmail({
        email: trimEmail,
        confirmEmail: trimConfirmEmail,
        password,
      })
    )
    if (!response.payload?.message) {
      setEmail('')
      setConfirmEmail('')
      setPassword('')
    }
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    setNewEmailError(false)
    setNewEmailHelperText('')
  }

  const onChangeConfirmEmail = (e) => {
    setConfirmEmail(e.target.value)
    setConfirmEmailError(false)
    setConfirmEmailHelperText('')
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const closePopupError = () => {
    dispatch(setChangeEmailError(null))
  }
  const closePopupSuccess = () => {
    dispatch(setIsSuccessChangeEmail(false))
  }

  return (
    <div>
      {changeEmailError && (
        <PopupWindow
          text={
            changeEmailError?.message ||
            'Не удалось обновить Email! Попробуйте еще раз'
          }
          error
          onClose={closePopupError}
        />
      )}
      {isSuccessChangeEmail && (
        <PopupWindow
          text='Email успешно обновлен!'
          onClose={closePopupSuccess}
        />
      )}
      <h3 className='text-lg font-bold mb-3'>
        Изменить Email который привязан к акаунту{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-mainGreen to-mainYellow dark:from-darkBlack dark:to-bggBottom'>
          WebMoney
        </span>
      </h3>
      <div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Новый Email</h4>
          <Input
            id='email'
            type='email'
            placeholder='Введите Email'
            onChange={onChangeEmail}
            error={newEmailError}
            helperText={confirmNewEmailHelperText}
            value={email}
          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Подтвердите Email</h4>
          <Input
            id='confirmEmail'
            error={confirmEmailError}
            helperText={confirmEmailHelperText}
            type='email'
            placeholder='Подтвердите Email'
            onChange={onChangeConfirmEmail}
            value={confirmEmail}
          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Введите пароль</h4>
          <Input
            id='password'
            type='password'
            onChange={onChangePassword}
            placeholder='Введите пароль'
            value={password}
            showPassword
          />
        </div>
        <div className='flex gap-3 items-center'>
          <ButtonGreen
            disabled={!isLoadingChangeEmail}
            func={changeEmail}
            title='Изменить Email'
          />
          {isLoadingChangeEmail && <MainLoading size={20} />}
        </div>
      </div>
    </div>
  )
}
