import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { List, ListItem, IconButton, Typography, useTheme, Theme, createStyles } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/Menu';

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
        fontWeight: 700,
        color: "white",
        fontSize: "1.5rem",
        padding: `8px 18px`,
        margin: "0 10px",
    },
    btnIcon: {
        [theme.breakpoints.down('xs')]: {
            padding: '5px 0',
        }
    },
    menuBackground: {
        background: theme.palette.primary.main,
    },
    drawerContainer: {
        "& > .MuiPaper-root": {
            background: "#0b1847",
        }
    },
    menuItemText: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 3.5,
    }
}));

type Anchor = 'left' | 'top' | 'right' | 'bottom';

export default function LeftDrawer(props: any) {
    const classes = useStyles();
    const theme = useTheme();
    const pathname = document.location.pathname;

    const [state, setState] = React.useState({
        left: false,
        bottom: false,
        top: false,
        right: false,
    });

    const { menu } = props;

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
        <div>
            {(['left'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            className={classes.btnIcon}
                        >
                            <MenuRoundedIcon
                                fontSize="large"
                            />
                        </IconButton>
                    </Button>
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
        </div >
    );
}
