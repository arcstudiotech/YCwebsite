import React, { useEffect } from 'react'

// import SinglePostHero from './singlePostHero'
// import SinglePostMain from './singlePostMain'

import './singlePost.sass'

export default function SinglePost ({
    post,
}) {
    useEffect(() => {
        setTimeout(() => {
            window.scrollerInstance.update()
        },1000)
    }, [])
    
    return (
        <div className="single-post" data-scroll data-scroll-section>
            SINGLE POST
        </div>
    )
}
