import React from 'react'
import styles from './styles.module.scss'

export const ButtonGreen = ({ title, type, func = () => null, cn = "", disabled = true }) => {
    return (
        <button disabled={!disabled} type={type} onClick={func} className={`${styles.button} ${cn} ${!disabled ? styles.disabled : `${styles.active} from-mainGreen to-bggGreen hover:from-mainGreen hover:to-mainGreen`}`}>{title}</button>
    )
}
