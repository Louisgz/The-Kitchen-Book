import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// COMPONENTS
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      margin: "1rem 0",
      "&>div": {
        padding: ".5rem 1.5rem .5rem .5rem",
        color: "#adaeb1",
        backgroundColor: "transparent !important",
      },
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const filtersNames = [
  "Entrées",
  "Plats",
  "Desserts",
  "Boissons",
  "Sauces",
  "Vegan",
  "Veggie",
  "Autre",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * filtersNames.length + ITEM_PADDING_TOP,
      width: "100%",
      maxWidth: 500,
    },
  },
};

export default function FiltersInput(props: any) {
  const { filters, setFilters } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const randomID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters(event.target.value as string[]);
  };

  return (
    <Select
      id="fitlers"
      displayEmpty
      multiple
      value={filters}
      onChange={handleChange}
      input={<Input id="select-multiple-filters" />}
      renderValue={(selected) => {
        if ((selected as string[]).length === 0) {
          return <em>ex : entrées, boissons ...</em>;
        }
        return (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        );
      }}
      className={classes.select}
      MenuProps={MenuProps}
    >
      {filtersNames.map((filtersName) => (
        <MenuItem
          key={filtersName}
          value={filtersName}
          style={getStyles(filtersName, filters, theme)}
        >
          {filtersName}
        </MenuItem>
      ))}
    </Select>
  );
}
