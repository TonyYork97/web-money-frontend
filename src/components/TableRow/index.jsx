import React from 'react'
import { TableCell } from '../TableCell'

export const TableRow = ({ name, date, type, amount }) => {
    const typeItem = type === 'Входящий' ? 'text-green-500' : ''
    const isPlus = type === 'Входящий' ? '+' : ''

    return (
        <div className='grid grid-cols-3  mb-3 rounded-lg border-b px-2 py-1 gap-2 border-black break-words'>
            <TableCell item={name} />
            <div className='text-right sm:text-left'>
                <TableCell item={date} />
            </div>
            {/* <TableCell item={type} /> */}
            <div className='text-right sm:text-left '>
                <TableCell item={amount} typeItem={typeItem} isPlus={isPlus} />
            </div>
        </div>
    )
}
