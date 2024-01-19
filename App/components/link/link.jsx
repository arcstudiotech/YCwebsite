import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { pathToRegexp } from 'path-to-regexp'
import { MainContext } from 'lib/context'

export default function NavLink({
    href,
    as,
    exact,
    children,
    innerHTML,
    className: _className = '',
    onClick,
    ...props
}) {
    const {
        setPageVisible
    } = useContext(MainContext)

    const activeClassName = 'active'
    const { asPath } = useRouter()

    let className = `${ _className }`

    if(onClick){
        return (
            <a className={className} onClick={onClick} dangerouslySetInnerHTML={innerHTML ? {__html: innerHTML } : undefined}>
                { children }
            </a>
        )
    }

    if(href && href.indexOf('http') !== -1){
        return (
            <a className={className} href={href} target="_blank" dangerouslySetInnerHTML={innerHTML ? {__html: innerHTML } : undefined}>
                { children }
            </a>
        )
    }


    const isActive = pathToRegexp(as || href || '/', [], { sensitive: true, end: false }).test(asPath)
    const isExact = pathToRegexp(as || href || '/', [], { sensitive: true, end: true }).test(asPath)

    const handleClick = () => {
        if(!isExact){
            setPageVisible(false)
        }
    }

    const _children = (
        <a 
            dangerouslySetInnerHTML={innerHTML}
            onClick={handleClick}
            className={className}
        >
            { children}
        </a>
    )

    const child = React.Children.only(_children)

    const childClassName = (child.props.className && child.props.className !== className) ? child.props.className : ''

    className = `${ className } ${ childClassName } ${ isActive ? activeClassName : '' }`

    return (
        <Link
            href={href}
            as={as}
            {...props}
        >
            {React.cloneElement(child, { className })}
        </Link>
    )
}
