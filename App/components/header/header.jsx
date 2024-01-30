import React, { useContext } from 'react'
import { MainContext } from 'lib/context'

import Logo from 'public/images/logo'
import Button from 'components/button'

import './header.sass'

export default function Header () {
    const {
        appearance,
        setAppearance,
    } = useContext(MainContext)

    const changeAppearance = () => {
        if ( appearance === 'light' ) {
            setAppearance('dark')
            localStorage.setItem('theme', 'dark')
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            setAppearance('light')
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }

    return (
        <header className={`header appearance-${appearance}`}>
            <div className="header-logo" >
                { Logo }
            </div>
            <div>

            <div className="header-controls">
                <div className="button" onClick={ children } />
                </div>
                <div className="header-appearance" onClick={ changeAppearance } />
            </div>
            </div>
        </header>
    )
}
