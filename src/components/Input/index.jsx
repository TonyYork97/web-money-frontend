import React, { useState } from 'react'
import Eye from '../../assets/images/eye.svg'
import styles from './styles.module.scss'

export const Input = React.forwardRef((
    {
        id = "",
        accept,
        hidden = false,
        multiple = false,
        type = "text",
        placeholder = "",
        label = "",
        min = 1.00,
        max = 999999999.99,

        error,
        helperText,
        onChange,
        name,
        defaultValue,
        showPassword = false,
        cn,
        maxLength,
        value = undefined,
        readonly = false,
        step = 0.01
    },
    ref
) => {
    const [typeInput, setTypeInput] = useState(type);

    const toggleType = () => {
        if (typeInput === 'password') {
            setTypeInput('text')
        } else {
            setTypeInput(type)
        }
    }


    return (
        <div className='mb-3 '>
            {label ? <label htmlFor={id} className='mb-1 inline-block text-xs font-light'>{label}</label> : ''}
            <div className='relative'>
                <input
                    step={step}
                    hidden={hidden}
                    multiple={multiple}
                    accept={accept}
                    readOnly={readonly}
                    value={value}
                    maxLength={maxLength}
                    name={name}
                    id={id}
                    type={typeInput}
                    className={`${styles.input} ${styles.inp}  ${error ? styles.error : styles.valid} ${cn}`}
                    min={min}
                    max={max}
                    ref={ref}
                    onChange={onChange}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
                {showPassword && <div className='w-8 h-8 absolute right-3 top-2'>
                    <img onClick={toggleType} className='w-full cursor-pointer' src={Eye} alt="Show password" />
                </div>
                }
            </div>

            {helperText &&
                <div className='text-xs text-errorRed'>
                    {helperText}
                </div>
            }

        </div>
    )
})
