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
    imageContainer: {},
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

// interface Props {
//   objectID: string;
//   cookingTime: number;
//   image: string;
//   date: number;
//   dateString?: string;
//   difficulty: number;
//   filters: string[];
//   ingredients: [];
//   introduction: string;
//   portions: [];
//   preparationTime: number;
//   recipe: string[];
//   title: string;
// }

interface Props {
  objectID: string;
  image: string;
  difficulty: number;
  title: string;
}

export default function RecipePreview(props: Props) {
  const { objectID, image, difficulty, title } = props;
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
        history.push(`/recipes/${objectID}/`);
      }}
    >
      <Box width="100%">
        <Box
          className={classes.imageContainer}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          borderRadius="10px"
          width="100%"
          paddingTop="100%"
        ></Box>
        <Typography variant="h6" component={"span"}>
          <Box color={theme.palette.text.primary} margin=".5rem 0">
            {title}
          </Box>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <RatingPreview difficulty={difficulty} transparent />
      </Box>
    </Box>
  );
}
