import React, { useEffect } from 'react'
import HeadSection from './headSection'

import { ContextProvider } from 'lib/context'
import { useRouter } from 'next/router'

import Header from 'components/header/header'
// import Modal from 'components/modal/modal'

import PageWrapperInner from './pageWrapperInner'

import { initGA, logPageView } from 'lib/analytics'

import './pageWrapper.sass'

const PageWrapper = ({
    children,
    title,
    slug,
    databaseId,
    contextData,
    single,
}) => {
    const router = useRouter()
    const { asPath } = router

    // useEffect(() => {
    //     if (!window.GA_INITIALIZED) {
    //         initGA()
    //     }

    //     logPageView()
    // }, [asPath])

    return (
        <div className={'page-wrapper'}>
            <ContextProvider initialContext={contextData}>
                <HeadSection title={ title } />
                <Header databaseId={databaseId} slug={ slug } single={ single } />
                <PageWrapperInner key={databaseId} content={children} />
                {/* <Modal /> */}
            </ContextProvider>
        </div>
    )
}

export default PageWrapper