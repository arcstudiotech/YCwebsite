import React, { useContext } from 'react'
import { MainContext } from 'lib/context'

import SinglePostShare from './singlePostShare'

import { returnDate } from 'lib/utils'

import './singlePostSidebar.sass'

export default function SinglePostSidebar ({
    post,
}) {
    const {
        date,
        author,
    } = post

    const { isMobile } = useContext( MainContext )

    return (
        <aside className="single-post-sidebar">
            <ul>
                <li>
                    <h5>
                        Author
                    </h5>
                    <span dangerouslySetInnerHTML={{ __html: author.node.name }} />
                </li>
                <li>
                    <h5>
                        Date Published
                    </h5>
                    <span dangerouslySetInnerHTML={{ __html: returnDate(date) }} />   
                </li>
                {!isMobile &&
                <li>
                    <h5>
                        Share
                    </h5>
                    <SinglePostShare />   
                </li>
                }
            </ul>
        </aside>
    )
}
