import React, { useContext } from 'react'
import { MainContext } from 'lib/context'
import Head from 'next/head'

const HeadSection = ({
    title,
}) => {
    const {
        appearance,
    } = useContext(MainContext)

    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.png" />
            <link href="/fonts.css" rel="stylesheet" type="text/css" />
            <meta name="theme-color" content={ appearance === 'dark' ? '#000000' : '#D8D7D5' } media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content={ appearance === 'dark' ? '#000000' : '#D8D7D5' } media="(prefers-color-scheme: dark)" />
            <script noModule src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.6.0/polyfill.min.js" crossOrigin="anonymous"></script>
            <script noModule src="https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CElement.prototype.append%2CNodeList.prototype.forEach%2CCustomEvent%2Csmoothscroll" crossOrigin="anonymous"></script>
            <script src={'/empty.js'} />
        </Head>
    )
}

export default HeadSection
