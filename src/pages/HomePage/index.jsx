import React from 'react'
import { BarChart } from '../../components/BarChart'
import { ChartBlock } from '../../components/ChartBlock'
import { Container } from '../../components/Container'




export const HomePage = () => {
    return (
        <Container>
            <div className='pt-16 pb-2'>
                <div className='flex flex-col-reverse gap-3 md:flex-row mb-3 justify-between'>
                    <div className='flex flex-wrap gap-4'>
                        <button className='w-full md:w-auto rounded-xl bg-mainGreen text-background py-2 px-4 font-bold  hover:bg-secondGreen transition-colors'>Добавить доход</button>
                        <button className='w-full md:w-auto rounded-xl bg-textPrime text-background py-2 px-4 font-bold  hover:bg-secondPrime transition-colors'>Добавить расход</button>
                    </div>
                    <div className='w-full md:w-auto px-3 py-3 rounded-xl border-textPrime border'>
                        <div className='text-lg  text-right flex gap-3 justify-end'>
                            <p>Всего средств:</p>
                            <p className='font-bold'>26915 р.</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <ChartBlock />
                    <ChartBlock />
                    <BarChart />
                </div>
            </div>
        </Container>
    )
}
