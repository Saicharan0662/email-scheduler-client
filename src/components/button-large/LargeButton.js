import React from 'react'
import './button-large.css'

const Button = ({ text = "click me!!", style, ...otherProps }) => {
    return (
        <button {...otherProps} style={style}>
            {text}
        </button>
    )
}

export default Button
