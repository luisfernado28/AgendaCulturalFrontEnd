/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Grid,jsx } from 'theme-ui'


const Header = (): JSX.Element => {

    return (
        <Box sx={{
            backgroundImage: theme => `linear-gradient(to right, #00923D, #3BB2B5 )`,
            height:'100px'
          }}>
            <Grid columns={[4]}>
                <Box >Logo Alcaldia</Box>
                <Box >Search</Box>
                <Box >Bienvenido Agenda Cultural La Paz</Box>
                <Box >User Logo</Box>
            </Grid>
        </Box>
    )
}

export default Header
