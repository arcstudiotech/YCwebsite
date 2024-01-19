import React, { useState, useEffect, useRef } from 'react'
import { OPTIONS_QUERY, GET_CONTACT_FORM } from 'lib/queries'
import { doQuery } from 'lib/fetching'
import { useIsMobile, useIsTablet } from 'lib/utils'

export const MainContext = React.createContext()

const LocomotiveScroll = typeof window !== 'undefined' ? require('locomotive-scroll') : () => null

export const ContextProvider = ({
    children,
    initialContext
}) => {
    const { data } = doQuery(false, OPTIONS_QUERY, undefined, initialContext)
    const { data : contactFormData } = doQuery(false, GET_CONTACT_FORM)

    const [modalData, setModalData] = useState(false)
    const [pageVisible, setPageVisible] = useState(false)
    const [appearance, setAppearance] = useState('light')

    const isMobile = useIsMobile()
    const isTablet = useIsTablet()

    const initNewPage = () => {
		if (window.scrollerInstance) {
            window.scrollerInstance.destroy()

            const timeout = window.location.pathname.includes('why-firmus') ? 2000 : 10

			setTimeout(() => {
				setupLocomotive()
			}, timeout)
		}
	}

    const openModal = props => {
        setModalData({
            ...props,
            isVisible: true
        })
    }

    const closeModal = () => {
        setModalData({
            ...modalData,
            isVisible: false
        })
    }

    const [showSingleCat, setShowSingleCat] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [blogGridLoading, setBlogGridLoading] = useState(false)

    const {
        options,
        menus,
    } = data || {}

    const headerMenu = menus ? menus.nodes.find(menu => menu.menuId === 3).menuItems.nodes : null
    const footerMenu = menus ? menus.nodes.find(menu => menu.menuId === 2).menuItems.nodes : null

    const _window = typeof window !== 'undefined' ? window : null

	useEffect(() => {
		setTimeout(() => {
			setupLocomotive()
		}, 700)
	}, [_window])

	useEffect(() => {
		if(isMobile && _window){
			const viewport = document.getElementsByName('viewport')

			const ratio = _window.screen.width / 500

			viewport[0].content = `width=500, initial-scale=${ ratio }, maximum-scale=${ ratio }`
        }
	}, [isMobile, _window])

    const setupLocomotive = () => {
		if (_window && LocomotiveScroll) {
			setTimeout(() => {
				window.scrollerInstance = new LocomotiveScroll.default({
					el: document.querySelector('[data-scroll-container]'),
					smooth: isTablet ? false : true,
					repeat: false,
					multiplier: 1.5
				})

                const { href } = _window.location

                let shouldUpdate = !['why-firmus', 'news-insights'].find(slug => href.includes(slug))

				setTimeout(() => {
					window.scrollerInstance.update()
				}, 200)

				setTimeout(() => {
                    shouldUpdate = !['why-firmus', 'news-insights'].find(slug => href.includes(slug))

                    if(shouldUpdate){
                        window.scrollerInstance.update()
                    }
				}, 500)
			}, 100)
		}
	}

    return (
        <MainContext.Provider
            value={{
                options: options ? options.options : {},
                isMobile,
                headerMenu,
                footerMenu,
                openModal,
                closeModal,
                modalData,
                pageVisible,
                setPageVisible,
                selectedCategory,
                setSelectedCategory,
                blogGridLoading,
                setBlogGridLoading,
                initNewPage,
                showSingleCat,
                setShowSingleCat,
                contactForm: contactFormData ? contactFormData.form : null,
                appearance,
                setAppearance,
            }}
        >
            {children}
        </MainContext.Provider>
    )
}