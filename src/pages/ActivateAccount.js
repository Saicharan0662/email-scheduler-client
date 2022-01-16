import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/button-large/LargeButton'

const ActivateAccount = () => {
    const { token } = useParams()
    console.log(token);

    return (
        <div className='flex justify-center items-center space-x-2' style={{ height: '100vh' }}>
            <Button text="Activate account"
            // onClick={() => {

            // })}
            />
        </div>
    )
}

export default ActivateAccount
