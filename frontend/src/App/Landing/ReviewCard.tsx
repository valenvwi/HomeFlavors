import { Box, Rating, Typography } from "@mui/material";
import { BoldTypography } from "../../components";

type Props = {
  review: {
    title: string;
    description: string;
    rating: number;
    reviewer: string;
  };
};
export default function ReviewCard(props: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 2,
      }}
    >
      <Rating
        name="disabled"
        value={props.review.rating}
        disabled
        sx={{ "&.Mui-disabled": { opacity: "1" } }}
      />
      <BoldTypography variant="subtitle1" sx={{ my: 2, color: "white" }}>
        {props.review.title}
      </BoldTypography>
      <Typography
        variant="body2"
        sx={{ mb: 2, color: "white", opacity: "0.80" }}
      >
        {props.review.description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "white" }}>
        -- {props.review.reviewer}
      </Typography>
    </Box>
  );
}
