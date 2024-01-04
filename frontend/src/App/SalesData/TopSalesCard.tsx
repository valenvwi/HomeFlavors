import { Card, Typography } from "@mui/material";
import { BASEURL } from "../../config";

const cardStyle = {
  m: 2,
  p: 3,
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
};

type Props = {
  name: string;
  image: string;
  quantity: number;
};

export default function TopSalesCard(props: Props) {
  return (
    <Card sx={cardStyle}>
      <img
        src={`${BASEURL}/${props.image}`}
        alt={props.name}
        width="300px"
        height="300px"
        style={{ borderRadius: "50%" }}
      />
      <Typography variant="h6" fontWeight={700} sx={{ textAlign: "center" }}>
        {props.name} x {props.quantity}
      </Typography>
    </Card>
  );
}
