import React from 'react'
import './button-large.css'

const Button = ({ text = "click me!!", ...otherProps }) => {
    return (
        <button {...otherProps}>
            {text}
        </button>
    )
}

export default Button
