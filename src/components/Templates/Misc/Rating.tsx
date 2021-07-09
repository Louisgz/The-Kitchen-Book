import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Box from "@material-ui/core/Box";

const StyledRating = withStyles({
  iconFilled: {
    color: "#3c8112",
  },
  iconHover: {
    color: "#3c8112",
  },
  iconEmpty: {
    color: "transparent",
  },
})(Rating);

interface Props {
  difficulty: number;
}

export default function RatingPreview(props: Props) {
  const { difficulty } = props;
  return (
    <div>
      <Box component="fieldset" borderColor="transparent">
        <StyledRating
          name="read-only"
          readOnly
          defaultValue={difficulty}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          precision={1}
          icon={<WhatshotIcon fontSize="small" />}
        />
      </Box>
    </div>
  );
}
