import React, { useRef, useEffect, } from 'react'

const Video = ({
    data: source,
    close,
    isVisible
}) => {
    const videoPlayerRef = useRef(null)

    useEffect(() => {
        if(!isVisible && videoPlayerRef.current){
            videoPlayerRef.current.pause()
        }
    }, [isVisible])

    return (
        <div>
            <button 
                className="close"
                onClick={close}
            >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
            {/* eslint-disable-next-line */}
            <video 
                ref={ref => videoPlayerRef.current = ref} 
                controls
                key={source}
                autoPlay
            >
                <source src={source} type='video/mp4;' />
            </video>
        </div>
    )
}

export default Video
