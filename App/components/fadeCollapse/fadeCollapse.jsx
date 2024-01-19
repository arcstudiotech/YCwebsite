import React from 'react'
import SmoothCollapse from 'react-smooth-collapse'

import './fadeCollapse.sass'

const FadeCollapse = ({ open, children }) => {
    return (
        <div className={`fade-collapse ${ open ? 'visible' : ''}`}>
            <SmoothCollapse allowOverflowWhenOpen expanded={open}>
                { children }
            </SmoothCollapse>
        </div>
    )
}

export default FadeCollapse