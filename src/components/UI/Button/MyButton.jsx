import React from 'react'
import cl from './button.module.css'

export default function MyButton({children, onClick, ...props}) {

    return (
        <button 
            onClick={onClick}
            className={cl.myButton}
            {...props}>
            {children}
        </button>
    )
}
