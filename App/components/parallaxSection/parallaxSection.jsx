import React, { useEffect, useRef} from 'react'
// import { isMobile } from 'utils'

const { jarallax } = typeof window !== "undefined" ? require("jarallax") : () => null

const ParallaxSection = ({ children, className, backgroundUrl = null }) => {
    let hasInitialisedJarallax = false

    const ref = useRef(null)

    useEffect(() => {
        if(backgroundUrl && ref && ref.current && !hasInitialisedJarallax){
            hasInitialisedJarallax = true

            //if(!isMobile) {
                 jarallax(ref.current, {
                     speed: 0.6
                 })
            //}
        }
    }, [backgroundUrl])

    return (
        <section className={`jarallax ${ className || '' }`}
            style={{
                backgroundImage: backgroundUrl ? `url(${ backgroundUrl })` : null
            }}
            ref={ref}
        >
            { children }
        </section>
    )
}

export default ParallaxSection
