import React from 'react'

import Splash from './splash/splash'

const components = {
    Splash,
}

const FlexibleContent = ({ 
    rows
}) => {
    if(!rows){
        return null
    } 

    return (
        <>
            { rows.map((row, index) => {
                if(!row || !row.__typename){
                    return null
                }
                
                const Component = row.__typename.replace('Page_Components_Rows_','')
                const Tag = components[Component]

                let className = `${Component}`

                return (
                    <section 
                        className={className}
                        key={index}
                        id={Component}
                        data-scroll-offset={`${className === 'footer-outer' ? '0%, 10%' : '5%, 5%'}`}
                        data-scroll
                        data-scroll-section
                    >
                        <Tag {...row}/>
                    </section>
                )
            }) }
        </>
    )
}

export default FlexibleContent
