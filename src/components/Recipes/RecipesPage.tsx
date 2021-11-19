// IMPORT GENERAL
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//ALGOLIA
import algoliasearch from "algoliasearch/lite";

// IMPORT COMPONENTS
import Navbar from "../Templates/Navbar/Navbar";
import { Grid, Box, Typography } from "@material-ui/core";
import RecipePreview from "./RecipePreview";
import FilterListIcon from "@material-ui/icons/FilterList";

//Import Types
import { RecipeProps } from "../../Types/RecipeProps";

const useStyles = makeStyles(() =>
  createStyles({
    homeScreen: {
      maxWidth: 1300,
      margin: "auto",
    },
  })
);

const getQueryParams = (param: string) => {
  return unescape(
    decodeURIComponent(window.location.search).replace(
      new RegExp(
        "^(?:.*[&\\?]" +
          escape(param).replace(/[.+*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
};

export default function RecipesPage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const query = getQueryParams("q");
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const searchClient = algoliasearch(
    "AZX5076CN4",
    "2bb1a6c5feac1bf7757e4837240c320e"
  );

  const index = searchClient.initIndex("recipes");

  const search = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await index.search(query);
    setRecipes(result.hits);
  };
  useEffect(() => {
    search();
  }, [query]);

  return (
    <Fade in timeout={500}>
      <Box width="100%" height="auto" minHeight="100vh" bgcolor="#fafafa">
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid container className={classes.homeScreen}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{
              maxWidth: "1050px",
              margin: "auto",
              padding: mobile ? "1rem" : "2rem 0",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h4">{query}</Typography>
                <Typography
                  variant="h6"
                  component={"span"}
                  style={{ marginTop: ".5rem" }}
                >
                  <Box color={theme.palette.text.secondary}>
                    {recipes?.length} recettes
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                display="flex"
                alignItems="center"
              >
                {/* <FilterListIcon />
                <Typography
                  variant="h6"
                  component={"span"}
                  style={{ color: theme.palette.text.secondary }}
                >
                  <Box color={theme.palette.text.secondary} marginLeft=".75rem">
                    Filtrer les résultats
                  </Box>
                </Typography> */}
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{ maxWidth: "1100px", margin: "2rem auto" }}
          >
            {recipes?.map((recipe: RecipeProps) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={`container-${recipe.objectID}`}
                >
                  <RecipePreview
                    {...recipe}
                    key={`item-${recipe.objectID}`}
                    transparentRating
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
