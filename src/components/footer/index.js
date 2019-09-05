import React from 'react'
import './footer.css'

import footer from '../../images/general-footer-image.jpg'

const Footer = () => {
    return (
        <div className='footer__hero' style={
            {
                backgroundImage: `url(${footer})`
            }
        }>

        </div>
    )
}

export default Footer