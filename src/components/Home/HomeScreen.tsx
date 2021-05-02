import React from 'react'
import Navbar from '../Templates/Navbar/Navbar'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import sections from "./HomeSectionsData.js";
import HomeSection from "../Templates/Sections/HomeSection";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeScreen: {
            maxWidth: 1500,
            margin: "auto",
        }
    })
);


const HomeScreen = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Fade in timeout={500}>
            <Grid container className={classes.homeScreen}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12}>
                    {
                        sections.map((item, index) => {
                            return (
                                <HomeSection {...item} />
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Fade>
    )
}

export default HomeScreen
