import React from "react";
import clsx from "clsx";
import { Box, Typography } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: "20px",
      padding: ".75rem 2.5rem .75rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#65BC30",
      boxShadow: "7px 7px 16px rgba(101, 188, 48, 0.25)",
      backgroundColor: "#F3FAEE",
      transition: "all .15s ease-in-out",
      cursor: "pointer",
      maxHeight: "65px",

      "&:hover": {
        boxShadow: "10px 10px 26px rgba(101, 188, 48, 0.6)",
        backgroundColor: "#65BC30",
        color: "white",
      },
    },
  })
);

export default function SmallCard(props: any) {
  const { Icon, title, path, classe } = props;
  const classes = useStyles();

  return (
    <Box className={clsx(classes.card, classe)}>
      {Icon}
      <Typography variant="h5" component="span">
        <Box marginLeft="2rem" fontWeight={500}>
          {title}
        </Box>
      </Typography>
    </Box>
  );
}
