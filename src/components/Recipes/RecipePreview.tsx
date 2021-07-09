// IMPORT GENERAL
import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";

//IMPORT COMPONENTS
import { Box, Grid, Typography } from "@material-ui/core";
import RatingPreview from "../Templates/Misc/Rating";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "100%",
      borderRadius: "10px",
    },
    item: {
      cursor: "pointer",
      transition: "all .2s ease-in-out",
      backgroundColor: "white",
      "&:hover": {
        boxShadow: "6px 8px 13px rgb(0 0 0 / 5%)",
      },
    },
  })
);

interface Props {
  id: string;
  cookingTime: number;
  image: string;
  date: number;
  dateString?: string;
  difficulty: number;
  filters: string[];
  ingredients: [];
  introduction: string;
  portions: [];
  preparationTime: number;
  recipe: string[];
  title: string;
}

export default function RecipePreview(props: Props) {
  const {
    id,
    cookingTime,
    image,
    date,
    dateString,
    difficulty,
    filters,
    ingredients,
    introduction,
    portions,
    preparationTime,
    recipe,
    title,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      padding=".75rem"
      borderRadius="10px"
      className={classes.item}
      height="100%"
      onClick={() => {
        console.log("test");
        history.push(`/recipes/${id}/`);
      }}
    >
      <Box width="100%">
        <img src={image} alt={title} className={classes.image} />
        <Typography variant="h6" component={"span"}>
          <Box color={theme.palette.text.primary} margin=".5rem 0">
            {title}
          </Box>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <RatingPreview difficulty={difficulty} />
      </Box>
    </Box>
  );
}
