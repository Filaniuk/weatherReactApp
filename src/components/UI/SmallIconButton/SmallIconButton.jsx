import React from 'react'
import cl from './smallButton.module.css'

export default function SmallIconButton({children, onClick, ...props}) {

    return (
        <button 
            onClick={onClick}
            className={cl.mySmallIconButton}
            {...props}>
            {children}
        </button>
    )
}
