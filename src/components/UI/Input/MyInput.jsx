import React from 'react'
import cl from './myinput.module.css'

export default function MyInput({ type, placeholder, onChange, value, ...props }) {
    return (
        <div>
            <input
                className={cl.myInput}
                type={type}
                placeholder={placeholder} 
                onChange={onChange}
                value={value} 
                {...props}
                />
        </div>
    )
}
