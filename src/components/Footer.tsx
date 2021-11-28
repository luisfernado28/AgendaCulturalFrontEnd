/** @jsxImportSource theme-ui */
import { Box, jsx } from 'theme-ui'


const Footer = (): JSX.Element => {

    return (
        <div sx={{
            backgroundImage: theme => `linear-gradient(to right, #00923D, #3BB2B5 )`,
            height: '100px'
        }}>
            <div >
                Copyright 2021
            </div>
        </div>
    )
}

export default Footer
