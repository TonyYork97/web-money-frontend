import React from 'react'
import styles from './styles.module.scss'

export const Loading = () => {
    return (

        <div className={styles.loading}>
            <div className={styles.curcleOne}></div>
            <div className={styles.curcleTwo}></div>
            <div className={styles.curcleThree}></div>
        </div>

    )
}
