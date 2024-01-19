import React from 'react'

import Cta from 'components/flexibleContent/cta/cta'

import './singlePostCopy.sass'

export default function SinglePostCopy ({
    post,
}) {
    const {
        content,
    } = post

    return (
        <article className="single-post-copy">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <section className="Cta">
                <Cta title="Step into the future with Firmus" colour="purple" linkType="contactModal" />
            </section>
        </article>
    )
}
