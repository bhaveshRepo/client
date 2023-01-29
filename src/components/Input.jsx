import React from 'react'

const Input = ({ value, label, type }) => {
    return (
        <div>
            <label>{label}</label>
            <br></br>
            <input type={type} ref={value}/>
        </div>
    )
}

export default Input