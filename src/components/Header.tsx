/** @jsxImportSource theme-ui */
import { Box, Flex, Grid, jsx } from 'theme-ui'


const Header = (): JSX.Element => {

    return (
        <div sx={{
            backgroundImage: theme => `linear-gradient(to right, #00923D, #3BB2B5 )`,
            height:'100px'
          }}>
            <Grid columns={[4]}>
                <div >Logo Alcaldia</div>
                <div >Search</div>
                <div >Bienvenido Agenda Cultural La Paz</div>
                <div >User Logo</div>
            </Grid>
        </div>
    )
}

export default Header
