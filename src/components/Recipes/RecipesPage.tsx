// IMPORT GENERAL
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fire } from "services";

//ALGOLIA
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

// IMPORT COMPONENTS
import Navbar from "../Templates/Navbar/Navbar";
import { Grid, Box, Typography } from "@material-ui/core";
import RecipePreview from "./RecipePreview";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme: Theme) =>
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

export default function RecipesPage() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [recipes, setRecipes] = useState<any[]>([]);
  const query = getQueryParams("q");

  const searchClient = algoliasearch(
    "AZX5076CN4",
    "2bb1a6c5feac1bf7757e4837240c320e"
  );

  const index = searchClient.initIndex("recipes");

  const search = async () => {
    const result = await index.search(query);
    setRecipes(result.hits);
  };
  useEffect(() => {
    search();
  }, [query]);

  return (
    <Fade in timeout={500}>
      <Box width="100vw" height="auto" bgcolor="#fafafa">
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid container className={classes.homeScreen}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{ maxWidth: "1050px", margin: "2rem auto 0" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h4">{query}</Typography>
                <Typography variant="h6" component={"span"}>
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
                <FilterListIcon />
                <Typography
                  variant="h6"
                  component={"span"}
                  style={{ color: theme.palette.text.secondary }}
                >
                  <Box color={theme.palette.text.secondary} marginLeft=".75rem">
                    Filtrer les résultats
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{ maxWidth: "1100px", margin: "3rem auto" }}
          >
            {recipes?.map((recipe: any) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={`container-${recipe.objectID}`}
                >
                  <RecipePreview {...recipe} key={`item-${recipe.objectID}`} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
