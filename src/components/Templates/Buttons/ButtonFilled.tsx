import React from "react";
import { Button, Typography } from "@material-ui/core";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "white",
      borderRadius: "100px",
      padding: ".3rem 2rem",
      textTransform: "none",
      fontSize: ".9rem",
      boxShadow: "0px 25px 31px rgba(101, 188, 48, 0.24)",

      "&:hover": {
        boxShadow: "0px 10px 21px rgba(101, 188, 48, 0.3)",
        background: "#549D27",
      },
    },
  })
);

export default function ButtonFilled(props: any) {
  const { path, title, shadow } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={() => path && history.push(path)}
    >
      <Typography variant="h6">{title}</Typography>
    </Button>
  );
}
