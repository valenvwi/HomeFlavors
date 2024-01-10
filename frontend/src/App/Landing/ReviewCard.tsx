import { Rating, Typography } from "@mui/material";
import { BoldTypography, GreyTypography, OrangePaper } from "../../components";

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
    <OrangePaper
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 2,
      }}
    >
      <BoldTypography variant="subtitle1" sx={{ mb: 2 }}>
        {props.review.title}
      </BoldTypography>
      <GreyTypography variant="body2" sx={{ mb: 2 }}>
        {props.review.description}
      </GreyTypography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        -- {props.review.reviewer}
      </Typography>
      <Rating name="disabled" value={props.review.rating} disabled />
    </OrangePaper>
  );
}
