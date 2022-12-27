import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../assets/images/arrow-left.png'
import { fetchChangePassword } from '../../store/slices/authSlice';
import { ButtonGreen } from '../ButtonGreen';
import { Input } from '../Input';
import { PopupWindow } from '../PopupWindow';


export const PasswordEdit = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [сonfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [сonfirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordHelperText, setCurrentPasswordHelperText] = useState('');
  const [isPopup, setIsPopup] = useState(false)
  const { error } = useSelector(state => state.auth)

  const dispatch = useDispatch()


  const navigate = useNavigate();

  const changePassword = async () => {
    if (newPassword.trim() === '' || currentPassword.trim() === '' || confirmPassword === '') {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText('Введите пароль')
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText('Пароли не совпадают')
    } else if (!currentPassword.trim()) {
      setCurrentPasswordError(true);
      setCurrentPasswordHelperText('Введите пароль')
    }
    else {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText('')
      setCurrentPasswordError(false);
      setCurrentPasswordHelperText('')
      await dispatch(fetchChangePassword({ currentPassword, newPassword, confirmPassword }))

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      togglePopup()
    }
  }

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
    setCurrentPasswordError(false);
    setCurrentPasswordHelperText('')
  }

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);

  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false)
    setConfirmPasswordHelperText('')
  }

  const togglePopup = () => {
    setIsPopup(true);
    setTimeout(() => {
      setIsPopup(false)
    }, 3000)

  }

  return (
    <div className=' absolute left-0 md:left-3 right-0 top-0'>
      {isPopup && <PopupWindow setPopup={setIsPopup} text={error ? error.message : 'Пароль успешно изменен'} />}
      <div className=''>
        <img onClick={() => navigate(-1)} src={ArrowLeft} alt="" className='w-8 h-8 cursor-pointer' />
        <h3>Изменить пароль который привязан к акаунту WebMoney</h3>
      </div>
      <div >
        <div>
          <h4 className='text-lg font-bold mb-3'>Текущий пароль</h4>
          <Input
            id="currentPassword"
            type="password"
            placeholder="Введите текущий пароль"
            onChange={onChangeCurrentPassword}
            value={currentPassword}
            error={currentPasswordError}
            helperText={currentPasswordHelperText}
            showPassword
          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Новый пароль</h4>
          <Input
            id="newPassword"
            // error={confirmEmailError}
            // helperText={confirmEmailHelperText}
            type="password"
            placeholder="Новый пароль"
            onChange={onChangeNewPassword}
            value={newPassword}
            showPassword
          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Подтвердите пароль</h4>
          <Input
            id="confirmPassword"
            type="password"
            onChange={onChangeConfirmPassword}
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            error={сonfirmPasswordError}
            helperText={сonfirmPasswordHelperText}
            showPassword
          />
        </div>
        <ButtonGreen func={changePassword} title="Изменить Пароль" />
      </div>
    </div>
  )
}
