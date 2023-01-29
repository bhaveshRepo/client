import './component.css'

export const Button = ({ label, func }) => {
    return (
        <div>
            <button className='element-button' onClick={() => func()} >{label}</button>
        </div>
    )
}