import React from 'react'

export const Textarea = ({ onChange, value = undefined, maxLength = '50' }) => {
  return (

    <textarea
      onChange={onChange}
      className='py-3 px-3 rounded-xl border mb-4 bg-secondBackground dark:bg-bggTop dark:border dark:border-darkBlack  w-full active:outline-none focus:outline-none  placeholder:opacity-25'
      cols="30"
      maxLength={maxLength}
      value={value}
      rows="5"></textarea>
  )
}
