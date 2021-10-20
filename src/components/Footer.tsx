/** @jsxRuntime classic */
/** @jsx jsx */

import { Box,jsx } from 'theme-ui'


const Footer = (): JSX.Element => {

    return (
        <Box sx={{
            backgroundImage: theme => `linear-gradient(to right, #00923D, #3BB2B5 )`,
            height: '100px'
        }}>
            <Box> Copyright 2021</Box>
        </Box>
    )
}

export default Footer
