import React from 'react'
import { ButtonGreen } from '../ButtonGreen'
import { Input } from '../Input'
import ArrowLeft from '../../assets/images/arrow-left.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchChangeEmail } from '../../store/slices/authSlice'


export const EmailEdit = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmEmailHelperText, setConfirmEmailHelperText] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState(false);
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()


  const navigate = useNavigate();
  const changeEmail = () => {
    if (email !== confirmEmail) {
      setConfirmEmailError(true);
      setConfirmEmailHelperText('Email не совпадают')
    } else {
      setConfirmEmailError(false);
      setConfirmEmailHelperText('')
      dispatch(fetchChangeEmail({ email, confirmEmail, password }))
    }
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeConfirmEmail = (e) => {
    setConfirmEmail(e.target.value);
    setConfirmEmailError(false)
    setConfirmEmailHelperText('')
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className=' absolute left-0 md:left-3 right-0 top-0'>
      <div className=''>
        <img onClick={() => navigate(-1)} src={ArrowLeft} alt="" className='w-8 h-8 cursor-pointer' />
        <h3>Изменить Email который привязан к акаунту WebMoney</h3>
      </div>
      <div >
        <div>
          <h4 className='text-lg font-bold mb-3'>Новый Email</h4>
          <Input
            id="email"
            type="email"
            placeholder="Введите Email"
            onChange={onChangeEmail}
            value={email}
          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Подтвердите Email</h4>
          <Input
            id="confirmEmail"
            error={confirmEmailError}
            helperText={confirmEmailHelperText}
            type="email"
            placeholder="Подтвердите Email"
            onChange={onChangeConfirmEmail}
            value={confirmEmail}

          />
        </div>
        <div>
          <h4 className='text-lg font-bold mb-3'>Введите пароль</h4>
          <Input
            id="password"

            type="password"
            onChange={onChangePassword}
            placeholder="Введите пароль"
            value={password}

            showPassword />
        </div>
        <ButtonGreen func={changeEmail} title="Изменить Email" />
      </div>
    </div>
  )
}
