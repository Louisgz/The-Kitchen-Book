import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() =>
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

interface Props {
  path: string;
  title: string;
  shadow?: boolean;
}

export default function ButtonFilled(props: Props): JSX.Element {
  const { path, title } = props;
  const classes = useStyles();
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
