import React from 'react'
import Link from 'components/link/link'

import Linkedin from '../../public/images/linkedin'
import Seek from '../../public/images/seek'

import './button.sass'

{/* 

BUTTON VARIATIONS    

<Button title="Find out more" />
<Button title="Find out more" inverted />
<Button title="Find out more" colour="purple" />
<Button title="Find out more" colour="purple" inverted />
<Button title="Find out more" noArrow />
<Button title="Find out more" colour="purple" noArrow />
<Button title="Find out more" colour="purple" noArrow inverted />
<Button title="Find out more" compact />
<Button title="Find out more" compact noArrow />
<Button title="Find out more" colour="purple" compact noArrow />
<Button title="Find out more" colour="purple" compact noArrow inverted />
<Button title="Find out more" border />
<Button title="Find out more" inverted border />
<Button title="Find out more" colour="purple" border />
<Button title="Find out more" colour="purple" inverted border />
<Button title="Find out more" noArrow border />
<Button title="Find out more" colour="purple" noArrow border />
<Button title="Find out more" colour="purple" noArrow inverted border />
<Button title="Find out more" compact border />
<Button title="Find out more" compact noArrow border />
<Button title="Find out more" colour="purple" compact noArrow border />
<Button title="Find out more" colour="purple" compact noArrow inverted border />

Any of those options with the 'blue' colour option

*/}

export default function Button ({
    link,
    title,
    colour,
    compact,
    inverted,
    handleClick,
    noArrow,
    border,
    linkedin,
    seek,
    children
}) {
    const handleDummyClick = () => {
        return
    }
    
    const _handleClick = handleClick || handleDummyClick

    const className = `button${ colour ? ' button-' + colour : '' }${ inverted ? ' button-inverted' : '' }${ compact ? ' button-compact' : '' }${ border ? ' button-border' : '' }${ linkedin ? ' button-linkedin' : '' }${ seek ? ' button-seek' : '' }`

    const arrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="34.806" height="35.22" viewBox="0 0 34.806 35.22"><g id="Icon_arrow" data-name="Icon arrow" transform="translate(1 33.806) rotate(-90)"><path id="Path_7" data-name="Path 7" d="M0,0V32.392" transform="translate(16.196 0)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path id="Path_8" data-name="Path 8" d="M32.392,0,16.2,16.2,0,0" transform="translate(0 16.196)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/></g></svg>
    )

    if(!link){
        return (
            <button className={className} onClick={_handleClick}>
                { title }
                { !noArrow && arrow }
            </button>
        )
    }

    return (
        <Link 
            className={className}
            href={link}
        >
            { title ? title : children }
            { !noArrow &&
                arrow
            }
            { linkedin && 
                Linkedin
            }
            { seek && 
                Seek
            }
        </Link>
    )
}
