import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Box from "@material-ui/core/Box";

interface Props {
  difficulty: number;
  transparent?: boolean;
  size?: "inherit" | "default" | "large" | "small" | undefined;
}

export default function RatingPreview(props: Props) {
  const { difficulty, transparent, size } = props;
  console.log(props);

  const StyledRating = withStyles({
    iconFilled: {
      color: "#65BC30",
    },
    iconEmpty: {
      color: transparent ? "transparent" : "#a1a1a1",
    },
  })(Rating);

  return (
    <div>
      <Box component="fieldset" borderColor={"transparent"}>
        <StyledRating
          name="read-only"
          readOnly
          defaultValue={difficulty}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          precision={1}
          icon={<WhatshotIcon fontSize={size || "small"} />}
        />
      </Box>
    </div>
  );
}
