import React from 'react'

import './singlePostHero.sass'

export default function SinglePostHero ({
    post,
}) {

    const {
        link,
        title,
        content,
        date,
        featuredImage,
        categories,
        newsFields,
    } = post

    const category = categories ? categories.nodes[0].name : null
    const excerpt = newsFields ? newsFields.excerpt : null

	const wordCount = str => {
		return str.split(' ')
			.filter(function (n) { return n !== '' })
			.length
	}

	const _wordcount = content ? wordCount(content) : ''
	const minutesToRead = Math.round(_wordcount / 200)

    return (
        <div data-scroll className="single-post-hero">
            <div className="container">
                <div className="single-post-hero-cont">
                     { featuredImage && 
                        <div 
                            data-scroll 
                            data-scroll-speed="0.5" 
                            className="single-post-hero-image" 
                            style={{ backgroundImage: `url(${ featuredImage && featuredImage.node.mediaItemUrl })` }} 
                        /> 
                    }
                    <div className={ featuredImage ? "single-post-hero-content" : "single-post-hero-content noImage" }>
                        <div className="single-post-hero-details small">
                            <div dangerouslySetInnerHTML={{ __html: category }} />
                            <div dangerouslySetInnerHTML={{ __html: ( minutesToRead > 0 ) ? minutesToRead + ' min read' : 'Quick read' }} />
                        </div>
                        <h2 dangerouslySetInnerHTML={{ __html: title }} />
                        <div className="single-post-hero-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
