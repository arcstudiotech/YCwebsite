import React from 'react';
import { useIsIE } from 'lib/utils'

const Video = ({
    video,
    fallBackImage: image
}) => {

    const isIE = useIsIE()

    return (
        <div 
            style={{ backgroundImage: `url(${isIE ? image ? image.mediaItemUrl : '' : ''})` 
            }}
            className="videoCont"
        >
            {(video && !isIE) &&
                <video autoPlay playsInline muted loop preload="true">
                    <source src={video.mediaItemUrl} />
                </video>
            }
        </div>
    )
}
 
export default Video

