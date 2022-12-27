import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StickerLogin from '../../assets/images/sticker3.png'
import { AuthContainer } from '../../components/AuthContainer'
import { Input } from '../../components/Input'
import { ButtonGreen } from '../../components/ButtonGreen'
import styles from './styles.module.scss'
import { links } from '../../links'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, userIsAuth } from '../../store/slices/authSlice'
import { useForm } from 'react-hook-form'
import { MainLoading } from '../../components/MainLoading'

export const LoginPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(userIsAuth);
    const { isLoading, error } = useSelector(state => state.auth)
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'

    });
    const email = register('email', { required: 'Укажите почту' })
    const password = register('password', { required: 'Пароль должен иметь не менее 6 и не более 32 символов', minLength: 6, maxLength: 32 })

    const onSubmit = async (value) => {
        const data = await dispatch(fetchLogin(value));

        if (!data.payload.message) {
            navigate('/app/home', { replace: true })

        }
    }


    useEffect(() => {
        if (isAuth) {
            navigate('/app/home', { replace: true })
        }

    }, [])


    if (isLoading && !isAuth) {
        return <div className='w-full h-screen flex justify-center items-center'><MainLoading /></div>
    }

    return (
        <AuthContainer>
            <div className={`w-full md:w-auto  mt-6  md:min-w-[448px] flex flex-col justify-center px-1 sm:px-7`}>
                <h2 className='text-2xl sm:text-3xl mb-4 font-bold'>Войти</h2>
                {error && <div className='text-red-700'>{error.message}</div>}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col mb-8'
                >
                    <Input
                        id="loginEmail"
                        type="email"
                        label="Почта"
                        placeholder="Введите email"
                        onChange={email.onChange}
                        name={email.name}
                        ref={email.ref}
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />

                    <Input
                        id="loginPassword"
                        type="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        onChange={password.onChange}
                        name={password.name}
                        ref={password.ref}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        showPassword
                    />

                    <ButtonGreen
                        disabled={isValid}
                        type="submit"
                        title="Войти"
                        cn='mt-5'
                    />
                </form>
                <p className='text-xs text-center'>Еще нет аккаунта? <Link to={links.signup} className='underline underline-offset-2 hover:text-mainGreen transition-colors'>Зарегистрироваться</Link></p>
            </div>
            <div className='hidden md:flex md:justify-center md:items-center'>
                <div className='w-[180px] md:w-[220px] lg:w-[280px]'>
                    <img src={StickerLogin} alt="sticker" className='w-full' />
                </div>
            </div>
        </AuthContainer>
    )
}
