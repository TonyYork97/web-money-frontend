import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StickerSignup from '../../assets/images/sticker2.png'
import { AuthContainer } from '../../components/AuthContainer'
import { Input } from '../../components/Input'
import { ButtonGreen } from '../../components/ButtonGreen'
import { links } from '../../links'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp, userIsAuth } from '../../store/slices/authSlice'
import { MainLoading } from '../../components/MainLoading'
import styles from './styles.module.scss'

export const SignupPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(userIsAuth);
    const { isLoading, error } = useSelector(state => state.auth.isLoading)
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            name: '',
            lastName: '',
            password: ''
        },
        mode: 'onChange'

    });
    const email = register('email', { required: 'Укажите почту' })
    const name = register('name', { required: 'Имя должен иметь не менее 3 и не более 20 символов', minLength: 3, maxLength: 20 })
    const lastName = register('lastName', { required: 'Фамилия должен иметь не менее 3 и не более 20 символов', minLength: 3, maxLength: 20 })
    const password = register('password', { required: 'Пароль должен иметь не менее 6 и не более 32 символов', minLength: 6, maxLength: 32 })

    const onSubmit = async (value) => {
        const data = await dispatch(fetchSignUp(value));
        if (!data.payload?.message) {
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
            <div className={`w-full md:w-auto  mt-6 sm:mt-0 md:min-w-[448px] flex flex-col justify-center px-1 sm:px-7`}>
                <h2 className='text-2xl sm:text-3xl mb-4 font-bold'>Зарегистрироваться</h2>
                {error && <div className='text-red-700'>{error.message}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mb-8'>
                    <Input
                        id="signupEmail"
                        type="email"
                        label="Почта"
                        placeholder="email"
                        onChange={email.onChange}
                        name={email.name}
                        ref={email.ref}
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />


                    <Input
                        id="signupName"
                        label="Имя"
                        placeholder="Введите Имя"
                        onChange={name.onChange}
                        name={name.name}
                        ref={name.ref}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />

                    <Input
                        id="signupLastName"
                        label="Фамилия"
                        placeholder="Введите Фамилию"
                        onChange={lastName.onChange}
                        name={lastName.name}
                        ref={lastName.ref}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName?.message}
                    />

                    <Input
                        id="signupPassword"
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
                        title="Зарегестрироваться"
                        cn='mt-5'
                    />
                </form>
                <p className='text-xs text-center'>Уже есть аккаунт? Тогда <Link to={links.login} className='underline underline-offset-2 hover:text-mainGreen transition-colors'>войдите</Link></p>
            </div>
            <div className='hidden md:flex md:justify-center md:items-center'>
                <div className='w-[180px] md:w-[220px] lg:w-[280px]'>
                    <img src={StickerSignup} alt="sticker" className='w-full' />
                </div>
            </div>
        </AuthContainer>
    )
}
