import React from 'react'

import './scrollingTitle.sass'

const ScrollingTitle = ({ 
    colour, 
    title 
}) => {
    return (
        <div 
            style={{ color: colour }}
            className={`ScrollingTitle ${colour === '#255e25' ? 'green' : colour === '#4D3D7F' ? 'purple' : ''}`} dangerouslySetInnerHTML={{ __html: `<div><span>${ title }</span><span>${ title }</span><span>${ title }</span></div>` }} 
            data-scroll 
            data-scroll-direction="horizontal" 
            data-scroll-speed="-4" 
            data-scroll-class="appear" 
            data-scroll-repeat="true" 
        />
    );
}
 
export default ScrollingTitle;