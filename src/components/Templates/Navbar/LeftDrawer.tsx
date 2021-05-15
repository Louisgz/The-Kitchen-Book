import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { List, ListItem, IconButton, Typography, useTheme, Theme, createStyles } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/Menu';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerLinkText: {
        textDecoration: `none`,
        textTransform: `capitalize`,
        color: "white",
        fontSize: "1.5rem",
        padding: `8px 18px`,
    },
    btnIcon: {
        padding: 0,
        margin: "0 .5rem",
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: "transparent",
            color: theme.palette.primary.dark,
        },
        [theme.breakpoints.down('xs')]: {
            padding: '5px 0',
        }
    },
    menuBackground: {
        background: theme.palette.primary.main,
    },
    drawerContainer: {
        "& > .MuiPaper-root": {
            background: "#2C630B",
        }
    },
    menuItemText: {
        fontSize: "1.3rem",
        fontWeight: 300,
        lineHeight: 3.5,
    }
}));

type Anchor = 'left' | 'top' | 'right' | 'bottom';

const navLinks = [
    { title: `accueil`, path: `/` },
    { title: `Entrées`, path: `/entrees` },
    { title: `plats`, path: `/plats` },
    { title: `desserts`, path: `/desserts` },
    { title: `boissons`, path: `/boissons` },
    { title: `sauces`, path: `/sauces` },
]

const navLinksPhone = [
    { title: `accueil`, path: `/` },
    { title: `Ajouter une recette`, path: `/add-recipe` },
    { title: `Entrées`, path: `/entrees` },
    { title: `plats`, path: `/plats` },
    { title: `desserts`, path: `/desserts` },
    { title: `boissons`, path: `/boissons` },
    { title: `sauces`, path: `/sauces` },
    { title: `Mon compte`, path: `/account` },
]


export default function LeftDrawer(props: any) {
    const classes = useStyles();
    const theme = useTheme();
    const pathname = document.location.pathname;
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    const menu = mobile ? navLinksPhone : navLinks

    const [state, setState] = React.useState({
        left: false,
        bottom: false,
        top: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }


        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List >
                {menu.map((item: any, index: any) => (
                    <ListItem
                        component={Link}
                        to={item.path}
                        className={classes.drawerLinkText}
                        selected={item.path === pathname}
                        key={index}
                    >
                        <Typography variant="body1" className={classes.menuItemText}>
                            {item.title}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            {(['left'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        className={classes.btnIcon}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuRoundedIcon
                            fontSize="large"
                        />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        className={classes.drawerContainer}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))
            }
        </React.Fragment >
    );
}
