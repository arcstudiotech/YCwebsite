import React from 'react'
import ReactDOM from 'react-dom'
import 'flickity/dist/flickity.min.css'

const Flickity = typeof window !== "undefined" ? require("flickity") : () => null
//eslint-disable-next-line
const ImagesLoaded = typeof window !== 'undefined' ? require('flickity-imagesloaded') : () => null
//eslint-disable-next-line
const fade = typeof window !== "undefined" ? require("flickity-fade") : () => null
//eslint-disable-next-line
const asNavFor = typeof window !== 'undefined' ? require('flickity-as-nav-for') : () => null



const Slider = props => {
    if (typeof window === 'undefined') {
        return null
    } else {
        return (
            <SubSlider {...props} />
        )
    }
}

export default Slider

class SubSlider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flickityReady: false,
            hasMounted: false
        }

        this.refreshFlickity = this.refreshFlickity.bind(this)
    }

    setupFlickity() {
        if (!this.flickity) {
            this.flickity = new Flickity(this.flickityNode, this.props.options || {})

            if (this.props.flickityRef) {
                this.props.flickityRef(this.flickity)
            }

            this.setState({
                flickityReady: true,
            })
        }
    }

    componentDidMount() {
        this.setState({
            hasMounted: true
        })

        setTimeout(() => {
            this.setupFlickity()

            setTimeout(() => {
                this.flickity.resize()
            }, 1000)
        }, 10)
    }

    refreshFlickity() {
        this.flickity.reloadCells()
        this.flickity.resize()
        this.flickity.updateDraggable()
    }

    componentWillUnmount() {
        //this.flickity.destroy()
    }

    componentDidUpdate(prevProps, prevState) {
        this.setupFlickity()
        const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady
        const childrenDidChange = prevProps.children.length !== this.props.children.length

        if (flickityDidBecomeActive || childrenDidChange) {
            this.refreshFlickity()
        }
    }

    renderPortal() {
        if (!this.flickityNode) {
            return null
        }

        const mountNode = this.flickityNode.querySelector('.flickity-slider')

        if (mountNode) {
            return ReactDOM.createPortal(this.props.children, mountNode)
        }
    }

    render() {
        const {
            className,
        } = this.props

        const {
            hasMounted
        } = this.state

        if(!hasMounted){
            return null
        }

        return [
            <div
                className={className}
                key="flickityBase"
                ref={node => {
                    this.flickityNode = node
                }}
            />,
            this.renderPortal(),
        ].filter(Boolean)
    }
}