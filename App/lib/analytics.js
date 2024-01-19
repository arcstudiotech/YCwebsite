import GA4React from 'ga-4-react'

let ga4React = null

export const initGA = () => {
    ga4React = new GA4React('G-PVVTGJDPXP')

    ga4React.initialize().then(() => {
        window.GA_INITIALIZED = true
        logPageView()
    })
}

export const logPageView = () => {
    if (ga4React && typeof window !== 'undefined' && window.gtag) {
        ga4React.pageview(window.location.href)
    }
}