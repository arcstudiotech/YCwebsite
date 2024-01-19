import React, { useRef, useEffect, } from 'react'

import './teamMember.sass'

const TeamMember = ({
    data,
    close,
    isVisible
}) => {

    const {
        featuredImage,
        title,
        peopleFields,
        content
    } = data

    return (
        <div className='team-modal'>
            <button 
                className="close"
                onClick={close}
            >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
            <div className={'member-grid'}>
                {featuredImage &&
                <img src={featuredImage.node.mediaItemUrl} />
                }
                <section>
                    {title &&
                    <div className={'copy big'} dangerouslySetInnerHTML={{ __html: title }} />
                    }
                    {peopleFields.role &&
                    <div className={'copy small role'} dangerouslySetInnerHTML={{ __html: peopleFields.role }} />
                    }
                    {content &&
                    <div className={'copy small content'} dangerouslySetInnerHTML={{ __html: content }} />
                    }
                </section>
            </div>
        </div>
    )
}

export default TeamMember
