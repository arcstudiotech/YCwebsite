import React from 'react'

import './inputField.sass'

export default function InputField({
    onEnter,
    type,
}) {

    let inputType = ''

    switch (type) {
        case 'search...':
            inputType = 'text'
            break;

        default:
            break;
    }
    return (
        <div className='search-field'>
            <button onClick={e => {e.preventDefault()}}type='submit'><i className="fa fa-search"></i></button>
            <input type={ inputType } placeholder={ type }></input>
        </div>
    )
}
