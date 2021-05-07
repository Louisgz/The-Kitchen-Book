import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bigImg: {
            width: "100%",
        },
        smallImg: {
            maxWidth: "360px",
        },
        reverse: {
            flexDirection: "row-reverse",
        },
        card: {
            background: "#F6F6F6",
            boxShadow: "6px 8px 13px rgba(0, 0, 0, 0.12)",
            borderRadius: ".25rem",
            padding: "1rem 2rem",
        },
        link: {
            fontSize: ".9rem",
            transition: "all .2s ease-in-out",
            "&:hover": {
                color: theme.palette.primary.light,
                textDecoration: "none",
            }
        }
    })
);

const HomeSection = (props: any) => {
    const { image, imageAlt, descriptions, colors } = props
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Grid item container xs={12}>
            <Box width="100%" style={{ backgroundImage: `radial-gradient(${colors[0]}, ${colors[1]})` }}>
                <img src={image} alt={imageAlt} className={classes.bigImg} />
            </Box>
            <Box width="100%" padding="2rem 0">
                {
                    descriptions.map((item: any, index: any) => {
                        return (
                            <Box key={index} width="100%" display="flex" flexDirection="column" margin="2rem 0">
                                <Grid container xs={12} className={index % 2 != 0 ? classes.reverse : ""}>
                                    <Grid item xs={4}>
                                        <img src={item.image} alt={item.alt} className={classes.smallImg} />
                                    </Grid>
                                    <Grid item xs={8} className={classes.card}>
                                        <Box width="100%" color={theme.palette.primary.main} height="100%" lineHeight="1.5rem !important" display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography variant="h6">
                                                {item.text}
                                            </Typography>
                                            <Box width="100%" display="flex" alignItems="flex-end">
                                                <Typography variant="h6">
                                                    Lire l'article en entier : &nbsp;
                                                    <Link href={item.link} className={classes.link}>
                                                        {item.link}
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    })
                }
            </Box>
        </Grid>
    )
}

export default HomeSection
