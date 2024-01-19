import React, { useContext } from 'react'
import { MainContext } from 'lib/context'

import SinglePostSidebar from './singlePostSidebar'
import SinglePostCopy from './singlePostCopy'
import SinglePostRelated from './singlePostRelated'
import SinglePostShare from './singlePostShare'

import './singlePostMain.sass'

export default function SinglePost ({
    post,
}) {

    const { isMobile } = useContext( MainContext )

    return (
        <div className="single-post-main">
            <div className="container">
                <SinglePostSidebar post={ post } />
                <SinglePostCopy post={ post } />
                {isMobile &&
                    <aside className="single-post-sidebar share-only">
                        <ul>
                            <li>
                                <h5 dangerouslySetInnerHTML={{ __html: 'Share' }} />
                                <SinglePostShare />   
                            </li>
                        </ul>
                    </aside>
                }
                <SinglePostRelated post={ post } />
            </div>
        </div>
    )
}
