import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchChangePassword,
  setChangePasswordError,
  setIsSuccessChangePassword,
} from '../../store/slices/authSlice'
import { ButtonGreen } from '../ButtonGreen'
import { Input } from '../Input'
import { MainLoading } from '../MainLoading'
import { PopupWindow } from '../PopupWindow'

export const PasswordEdit = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [сonfirmPasswordError, setConfirmPasswordError] = useState(false)
  const [сonfirmPasswordHelperText, setConfirmPasswordHelperText] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState(false)
  const [currentPasswordHelperText, setCurrentPasswordHelperText] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [newPasswordHelperText, setNewPasswordHelperText] = useState('')

  const {
    changePasswordError,
    isLoadingChangePassword,
    isSuccessChangePassword,
  } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const changePassword = async () => {
    if (!currentPassword) {
      setCurrentPasswordError(true)
      setCurrentPasswordHelperText('Введите пароль!')
      return
    }
    if (!newPassword) {
      setNewPasswordError(true)
      setNewPasswordHelperText('Введите пароль!')
      return
    }
    if (!confirmPassword) {
      setConfirmPasswordError(true)
      setConfirmPasswordHelperText('Введите пароль!')
      return
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true)
      setConfirmPasswordHelperText('Пароли не совпадают')
      return
    }
    if (newPassword.length < 6 || newPassword.length > 32) {
      setNewPasswordError(true)
      setNewPasswordHelperText(
        'Пароль должен быть не менее 6 и не более 32 символов!'
      )
      return
    }
    if (
      newPassword === currentPassword ||
      confirmPassword === currentPassword
    ) {
      setNewPasswordError(true)
      setNewPasswordHelperText('Новый и текущий пароли совпадают!')
      return
    }
    setConfirmPasswordError(false)
    setConfirmPasswordHelperText('')
    setCurrentPasswordError(false)
    setCurrentPasswordHelperText('')
    setNewPasswordError(false)
    setNewPasswordHelperText('')
    const response = await dispatch(
      fetchChangePassword({ currentPassword, newPassword, confirmPassword })
    )
    if (!response.payload?.message) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value)
    setCurrentPasswordError(false)
    setCurrentPasswordHelperText('')
  }

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value)
    setNewPasswordError(false)
    setNewPasswordHelperText('')
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordError(false)
    setConfirmPasswordHelperText('')
  }

  const closePopupError = () => {
    dispatch(setChangePasswordError(null))
  }

  const closePopupSuccess = () => {
    dispatch(setIsSuccessChangePassword(false))
  }

  return (
    <div className=''>
      {/* {isPopup && <PopupWindow setPopup={setIsPopup} text={error ? error.message : 'Пароль успешно изменен'} />} */}
      {changePasswordError && (
        <PopupWindow
          text={
            changePasswordError?.message ||
            'Не удалось обновить пароль! Попробуйте еще раз'
          }
          error
          onClose={closePopupError}
        />
      )}
      {isSuccessChangePassword && (
        <PopupWindow
          text='Пароль успешно обновлен!'
          onClose={closePopupSuccess}
        />
      )}
      <h3 className='text-lg font-bold mb-3'>
        Изменить пароль который привязан к акаунту{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-mainGreen to-mainYellow dark:from-darkBlack dark:to-bggBottom'>
          WebMoney
        </span>
      </h3>
      <div>
        <div>
          <h4 className='text-base font-bold mb-2'>Текущий пароль</h4>
          <Input
            id='currentPassword'
            type='password'
            placeholder='Введите текущий пароль'
            onChange={onChangeCurrentPassword}
            value={currentPassword}
            error={currentPasswordError}
            helperText={currentPasswordHelperText}
            showPassword
          />
        </div>
        <div>
          <h4 className='text-base font-bold mb-1'>Новый пароль</h4>
          <p className='text-[11px] text-textOpacity dark:text-black dark:text-opacity-75 mb-1'>
            Пароль должен быть не менее 6 и не более 32 символов!
          </p>
          <Input
            id='newPassword'
            error={newPasswordError}
            helperText={newPasswordHelperText}
            type='password'
            placeholder='Новый пароль'
            onChange={onChangeNewPassword}
            value={newPassword}
            showPassword
          />
        </div>
        <div>
          <h4 className='text-base font-bold mb-2'>Подтвердите пароль</h4>
          <Input
            id='confirmPassword'
            type='password'
            onChange={onChangeConfirmPassword}
            placeholder='Подтвердите пароль'
            value={confirmPassword}
            error={сonfirmPasswordError}
            helperText={сonfirmPasswordHelperText}
            showPassword
          />
        </div>
        <div className='flex gap-3 items-center'>
          <ButtonGreen func={changePassword} title='Изменить Пароль' />
          {isLoadingChangePassword && <MainLoading size={20} />}
        </div>
      </div>
    </div>
  )
}
