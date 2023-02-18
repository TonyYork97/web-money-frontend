import React from 'react'
import { useState } from 'react';

import { Link } from 'react-router-dom';

export const NavItem = ({ title, link, submenu = [] }) => {
    const [submenuActive, setSubmenuActive] = useState(false);

    const handleClick = () => {
        if (submenu.length) {
            setSubmenuActive(true);
        }
    }

    return (
        <>
            <div className='relative' onMouseEnter={handleClick} onMouseLeave={() => setSubmenuActive(false)}>
                {submenu.length
                    ? <span
                        className='cursor-pointer p-1 border-b-2 border-transparent  box-border hover:border-b-2 dark:hover:border-darkBlack hover:border-textPrime  transition-all'
                        to={link}
                        key={title}
                    >{title}
                    </span>
                    : <Link
                        className='p-1 border-b-2  border-transparent box-border  hover:border-textPrime dark:hover:border-darkBlack transition-all'
                        to={link}
                        key={title}
                    >{title}</Link>
                }
                {submenuActive && (
                    <div className='bg-blackMenu rounded-lg dark:bg-white dark:border dark:border-bggBottom  shadow-block fixed  flex flex-col top-10 px-4 py-3'>
                        {submenu.map(el =>
                            <Link className='mb-3 last:mb-0 py-1 px-2 border-b-2 border-transparent hover:border-b-2 hover:border-textPrime dark:hover:border-darkBlack transition-all'
                                to={el.link}
                                key={el.title}
                            >{el.title}</Link>)
                        }
                    </div>
                )
                }
            </div>
        </>
    )
}
