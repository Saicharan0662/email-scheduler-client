import moment from 'moment'
import React from 'react'

const DateTime = ({ label = "DateTime", disablePast = false, value, onChange, style }) => {

    return (
        <div style={style}>
            <label htmlFor="date-time" className='text-light-gray' >
                {label}</label> <br />
            <input
                type={"datetime-local"}
                name="date-time"
                min={disablePast && moment(new Date()).format('YYYY-MM-DDTHH:mm')}
                value={value}
                onChange={onChange}
            />
            <br />
        </div>
    )
}

export default DateTime 