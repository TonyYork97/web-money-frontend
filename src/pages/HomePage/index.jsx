import React from 'react'
import { BarChart } from '../../components/BarChart'
import { ChartBlock } from '../../components/ChartBlock'
import { ChartBlockBig } from '../../components/ChartBlockBig'
import { Container } from '../../components/Container'
import { ShadowBlock } from '../../components/ShadowBlock'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableRow } from '../../components/TableRow'
import { TodayMoney } from '../../components/TodayMoney'



const fakeArr = [
    {
        name: 'Пятерочка',
        date: '29.09.2022',
        type: 'Исходящий',
        amount: '994 р.',
    },
    {
        name: 'Ригла',
        date: '29.09.2022',
        type: 'Исходящий',
        amount: '431 р.',
    },
    {
        name: 'Макдональдс',
        date: '28.09.2022',
        type: 'Исходящий',
        amount: '1412 р.',
    },
    {
        name: 'Шаверма по питерски',
        date: '28.09.2022',
        type: 'Исходящий',
        amount: '360 р.',
    },
    {
        name: 'Зарплата',
        date: '28.09.2022',
        type: 'Входящий',
        amount: '10000 р.',
    },
    {
        name: 'Пятерочка',
        date: '29.09.2022',
        type: 'Исходящий',
        amount: '994 р.',
    },
    {
        name: 'Шаверма по питерски',
        date: '28.09.2022',
        type: 'Исходящий',
        amount: '360 р.',
    },
    {
        name: 'Зарплата',
        date: '28.09.2022',
        type: 'Входящий',
        amount: '10000 р.',
    },
    {
        name: 'Пятерочка',
        date: '29.09.2022',
        type: 'Исходящий',
        amount: '994 р.',
    },

]


export const HomePage = () => {
    return (
        <Container>
            <div className='pt-16 pb-2'>
                <div className='flex flex-col-reverse gap-3 md:flex-row mb-6 justify-between'>
                    <div className='flex flex-wrap gap-4'>
                        <button className='w-full md:w-auto rounded-3xl bg-mainGreen text-background py-2 px-4 font-bold  hover:bg-secondGreen transition-colors'>Добавить доход</button>
                        <button className='w-full md:w-auto rounded-3xl border border-mainGreen py-2 px-4 font-bold  hover:bg-secondBackground transition-colors'>Добавить расход</button>
                    </div>
                    <div className='flex gap-3 items-center flex-col-reverse lg:flex-row'>
                        <div className='w-full lg:w-auto px-3 py-3 rounded-xl border-textPrime border'>

                            <div className='text-lg  text-right flex gap-3 justify-end'>
                                <p>Потрачено сегодня:</p>
                                <p className='font-bold'>26915 р.</p>
                            </div>
                        </div>
                        <div className='w-full lg:w-auto px-3 py-3 rounded-xl border-textPrime border'>

                            <div className='text-lg  text-right flex gap-3 justify-end'>
                                <p>Всего средств:</p>
                                <p className='font-bold'>26915 р.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='flex gap-3 flex-wrap md:flex-nowrap'> */}
                <div className=' flex flex-wrap md:grid md:grid-cols-2 md:grid-rows-2  xl:grid-rows-1 xl:grid xl:grid-cols-4 gap-3 mb-3'>
                    <ShadowBlock>
                        <ChartBlock />
                    </ShadowBlock>
                    <ShadowBlock>
                        <ChartBlock />
                    </ShadowBlock>
                    <div className='flex w-full md:col-span-2'>
                        <ShadowBlock>
                            <TodayMoney />
                            <BarChart />
                        </ShadowBlock>
                    </div>
                </div>
                <div className='grid grid-cols-4'>
                    <div className='col-span-4  xl:col-span-2'>
                        <ShadowBlock>
                            <h3 className='font-bold mb-4'>История операций</h3>
                            {/* {table } */}
                            <Table >
                                <TableHeader />
                                {fakeArr.map((item, i) => <TableRow key={item.amount + item.name + i} name={item.name} date={item.date} type={item.type} amount={item.amount} />)}
                            </Table>
                        </ShadowBlock>
                    </div>
                </div>
            </div>
        </Container >
    )
}
