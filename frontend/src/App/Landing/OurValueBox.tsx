import { Typography } from "@mui/material";
import { CenterFlexBox } from "../../components";

type Props = {
  img: string;
  title: string;
  description: string;
};

export default function OurValueBox(props: Props) {
  return (
    <CenterFlexBox flexDirection="column" sx={{ p: 2 }}>
      <img
        src={props.img}
        alt="fresh"
        style={{ width: "80px", color: "orange" }}
      />
      <Typography variant="subtitle1" sx={{ my: 1 }} fontWeight={700}>
        {props.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "grey", textAlign: "center" }}>
        {props.description}
      </Typography>
    </CenterFlexBox>
  );
}
