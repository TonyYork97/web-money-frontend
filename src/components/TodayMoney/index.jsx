import React from 'react'

export const TodayMoney = () => {
    return (
        <div className='mb-10'>
            <div className='mb-3 flex text-lg font-bold'>
                <h3>Статистика за год</h3>
            </div>

            <div className='grid grid-cols-2'>
                <div className='text-center'>
                    <h4 className='mb-14'>Больше всего потрачено</h4>
                    <div className='relative font-bold'>
                        <div className='absolute rounded-full shadow-redShadow border-white inline-block p-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-whiteOpacity'>
                        </div>
                        <p>Ноябрь</p>
                        <p>71388 р.</p>
                    </div>
                </div>
                <div className='text-center'>
                    <h4 className='mb-14'>Меньше всего потрачено</h4>
                    <div className='relative font-bold'>
                        <div className='absolute rounded-full shadow-greenShadow border-white inline-block p-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-whiteOpacity'>
                        </div>
                        <p>Апрель</p>
                        <p>26982 р.</p>
                    </div>
                </div>
            </div>

        </div >
    )
}
