import React from 'react'
import { TableRow } from '../TableRow'

export const TableHeader = () => {
    return (
        <div className='font-bold'>
            <TableRow name='Название' date='Дата' type='Тип' amount='Сумма' />
        </div>
    )
}
