import React, { useContext} from 'react'
import { MainContext } from "lib/context"

import Video from 'components/modalTypes/video'
import TeamMember from 'components/modalTypes/teamMember'
import ContactModal from 'components/modalTypes/contactModal'

import './modal.sass'

export default function Modal () {
	const {
        modalData,
        closeModal
    } = useContext(MainContext)

    const {
        type,
        data,
        isVisible
    } = modalData

    let component = null

    const commonProps = {
        data,
        isVisible,
        close: closeModal
    }

    switch(type){
        case 'VIDEO':
            component = (
                <Video
                    { ...commonProps }
                />
            )
            break
        case 'CONTACT':
            component = (
                <ContactModal
                    { ...commonProps }
                />
            )
            break
        case 'TEAM':
            component = (
                <TeamMember
                    { ...commonProps }
                />
            )
            break
        default:
            component = (
                <ContactModal
                    { ...commonProps }
                />
            )
            break
    }

    return (
        <div 
            className={`modal ${ isVisible ? 'visible' : '' } ${type}`}
            onClick={closeModal}
            onKeyDown={closeModal}
            role="button"
            tabIndex={0}
        >
            <div 
                className={type}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                role="button"
                tabIndex={0}
            >
                { component }
            </div>
        </div>
    )
}
