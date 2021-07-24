import React from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// IMPORT COMPONENTS
import { Grid, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
  })
);

export default function CardGeneral(props: any) {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      width="100%"
      height="100%"
      bgcolor="white"
      className={classes.card}
      borderRadius="10px"
      padding="1.5rem"
    >
      {children}
    </Box>
  );
}
