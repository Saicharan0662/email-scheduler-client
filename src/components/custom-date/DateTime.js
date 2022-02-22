import React from 'react'

const DateTime = ({ label = "DateTime", value, onChange, style }) => {

    return (
        <div style={style}>
            <label htmlFor="date-time" className='text-light-gray' >
                {label}</label> <br />
            <input
                type={"datetime-local"}
                name="date-time"
                value={value}
                onChange={onChange}
            />
            <br />
        </div>
    )
}

export default DateTime 