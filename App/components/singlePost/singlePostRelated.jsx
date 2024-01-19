import React, { useMemo, useContext } from 'react'
import { doQuery } from 'lib/fetching'
import { GET_POSTS } from 'lib/queries'
import { MainContext } from 'lib/context'
import Slider from 'components/slider/slider'

import './singlePostRelated.sass'

import BlogTile from 'components/blogTile/blogTile'

export default function SinglePostRelated ({
    post,
}) {
    const {
        id,
        categories,
    } = post

    const { isMobile } = useContext( MainContext )

    const category = categories ? categories.nodes[0].slug : null
    
    const queryFilter = useMemo(() => {
        if(!category){
            return null
        }else{
            return {
                where: {
                    taxQuery: {
                        taxArray: [{
                            terms: [category],
                            taxonomy: 'CATEGORY',
                            operator: 'IN',
                            field: 'SLUG'
                        }]
                    }
                }
            }
        }
    }, [category])

    const { data } = doQuery(false, GET_POSTS, queryFilter)
    const _data = data ? data.posts.nodes : ''

    const dataFiltered = _data ? _data.filter(post => post.id !== id).slice(0, 3) : ''
    
    return (
        dataFiltered.length ?
            <div className="single-post-related">
                <h2 dangerouslySetInnerHTML={{ __html: 'Related articles' }} />
                <ul>
                    {!isMobile ?
                    <>
                        {dataFiltered && dataFiltered.map((post, index) => {
                            return (
                                <li key={index}>
                                    <BlogTile post={ post } />
                                </li>
                            )
                        })}
                    </>
                    :
                    <Slider
                        options={{
                            draggable: true,
                            prevNextButtons: false,
                            pageDots: isMobile,
                            fade: false,
                            wrapAround: true,
                            adaptiveHeight: true,
                            autoPlay: 4000,
                            pauseAutoPlayOnHover: false,
                            cellAlign: 'left'
                        }}
                    >
                        {dataFiltered && dataFiltered.map((post, index) => {
                            return (
                                <li key={index}>
                                    <BlogTile post={ post } />
                                </li>
                            )
                        })}
                    </Slider>
                    }
                </ul>
            </div>
        : null
    )
}
