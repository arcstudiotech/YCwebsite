import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MainContext } from 'lib/context'

const PageWrapperInner = ({
    content
}) => {
    const {
        pageVisible,
        setPageVisible,
        initNewPage,
        appearance,
    } = useContext(MainContext)

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setPageVisible(true)
        },5)
        
        initNewPage()
    }, [router.asPath])

    return (
        <div className={`body${pageVisible ? ' visible' : ''} appearance-${appearance}`} data-scroll-container>
            <main>
                {content}
            </main>
        </div>
    )
}

export default PageWrapperInner