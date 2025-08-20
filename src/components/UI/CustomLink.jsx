import React from 'react'
import { Link } from 'react-router-dom'


function CustomLink(props) {
    const linkStyle = {
        color: props.color ? props.color : '#1976d2',
    }

    return (
        <Link {...props} style={linkStyle} className={classes.hoverLink}>
            {props.children}
        </Link>
    )
}

export default CustomLink
