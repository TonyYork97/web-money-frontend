import React from 'react'

export const TableCell = ({ item = '', typeItem = '', isPlus = '' }) => {
    return (
        <div className={`${typeItem} inline rounded-lg`}>{isPlus}{item}</div>
    )
}
