import React from 'react';
import './styles.css';

const BasicInput = ({name, setValue, value}) => {
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    return(
        <div className='input-container'>
            <input className='basic-input' value={value} placeholder={name} onChange={handleChange} />
        </div>
    )
}

export default BasicInput;