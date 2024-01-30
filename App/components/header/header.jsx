import React, { useContext } from 'react'
import { MainContext } from 'lib/context'

import Logo from 'public/images/logo'

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
            <div className="header-logo">
                { Logo }
                <a href="https://arc-studio.com.au"></a>
            </div>
            <div className="header-controls">
                <div className="header-appearance" onClick={ changeAppearance } />
            </div>
        </header>
    )
}
