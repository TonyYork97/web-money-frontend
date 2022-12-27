import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../../links'
import { Container } from '../Container'

import styles from './styles.module.scss'

const linkHistoryPage = [
    {
        title: 'Вся история',
        link: links.history,
    },
    {
        title: 'Все расходы',
        link: links.expenses,
    },
    {
        title: 'Вся доходы',
        link: links.income,
    },
]
export const NavHistory = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <Container>
            <div ref={ref} className=' flex justify-center mb-2' onClick={onClick}>
                <div className='flex gap-2 sm:gap-4 '>
                    {linkHistoryPage.map(el => <NavLink key={el.title} to={el.link} className={({ isActive }) => isActive ? styles.activeLink : styles.link} >{el.title}</NavLink>)}
                </div>
            </div>

            {children}
        </Container >
    )
}
)