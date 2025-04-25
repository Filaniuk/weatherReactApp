import React from 'react'
import './myselect.module.css'
export default function MySelect({options, defaultValue, value, onChange, ...props}) {
  return (
    <div>
      <select value ={value} onChange={onChange} className='select' {...props}>
        <option disabled value="">{defaultValue}</option>
        {options.map(option =>
          <option key={option.value} value={option.value}>{option.name}</option>
        )}
      </select>
    </div>
  )
}
