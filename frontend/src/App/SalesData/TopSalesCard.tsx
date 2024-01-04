import { Card, Typography } from "@mui/material";
import { BASEURL } from "../../config";

const cardStyle = {
  my: 2,
  mx: 4,
  p: 3,
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
  position: "relative",
  overflow: "visible",
};

const medalStyle = {
  width: "100px",
  height: "100px",
  position: "absolute",
  top: 0,
  right: 0,
  transform: "translate(30%, -30%)",
};

type Props = {
  name: string;
  image: string;
  quantity: number;
  medal: string;
};

export default function TopSalesCard(props: Props) {
  return (
    <Card sx={cardStyle}>
      <img
        src={`${BASEURL}/${props.image}`}
        alt={props.name}
        width="280px"
        height="280px"
        style={{ borderRadius: "50%" }}
      />
      <img src={props.medal} alt="gold" style={medalStyle} />
      <Typography variant="h6" fontWeight={700} sx={{ textAlign: "center" }}>
        {props.name} x {props.quantity}
      </Typography>
    </Card>
  );
}
