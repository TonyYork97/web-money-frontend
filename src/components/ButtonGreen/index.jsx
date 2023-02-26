import React from 'react'
import styles from './styles.module.scss'

export const ButtonGreen = ({
  title,
  type,
  func = () => null,
  cn = '',
  disabled = true,
}) => {
  return (
    <button
      disabled={!disabled}
      type={type}
      onClick={func}
      className={`bg-gradient-to-r ${styles.button} ${cn} ${
        !disabled
          ? 'from-gray-400 to-gray-500'
          : `${styles.active}  from-mainGreen to-bggGreen hover:from-mainGreen hover:to-mainGreen`
      }`}
    >
      {title}
    </button>
  )
}
