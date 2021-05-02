import React from 'react'
import Navbar from '../Templates/Navbar/Navbar'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeScreen: {

        }
    })
);


const HomeScreen = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Grid className={classes.homeScreen}>

            <Navbar />
        </Grid>
    )
}

export default HomeScreen
