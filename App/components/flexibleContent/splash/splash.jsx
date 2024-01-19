import React from 'react'

import Slider from 'components/slider/slider'

import LogoSimple from 'public/images/logo-simple'

import './splash.sass'

export default function Splash ({
    title,
    copy,
    images,
    details,
}) {
    return (
        <>
            <div className="Splash-images">
                { LogoSimple }
                { images &&
                    <Slider
                        options={{
                            prevNextButtons: false,
                            pageDots: false,
                            fade: true,
                            wrapAround: true,
                            autoPlay: 4000,
                        }}
                    >
                        { images.map((item, index) => {
                            return (
                                <div
                                    style={{
                                        backgroundImage: item.image ? `url(${ item.image.mediaItemUrl })` : null
                                    }}
                                    className="Splash-images-item"
                                    key={ index }
                                />
                            )
                        })}
                    </Slider>
                }
            </div>
            <div className="Splash-content">
                <div className="Splash-title" dangerouslySetInnerHTML={{ __html: title }} />
                <div className="Splash-details">
                    <div className="Splash-copy" dangerouslySetInnerHTML={{ __html: copy }} />
                    { details && 
                        <div className="Splash-contact">
                            { details.map((detail, index) => {
                                return (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: detail.block }}
                                        key={ index }
                                    />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
