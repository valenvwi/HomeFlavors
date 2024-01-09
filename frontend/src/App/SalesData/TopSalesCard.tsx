import { Box, Card, Grid, Typography } from "@mui/material";
import { BASEURL } from "../../config";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  pt: 2,
  m: 2,
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
  position: "relative",
  overflow: "visible",
};

const medalStyle = {
  width: "50px",
  height: "50px",
  position: "absolute",
  top: 0,
  right: 0,
  transform: "translate(30%, -30%)",
};

const imgStyle = {
  borderRadius: "50%",
  width: "120px",
  height: "120px",
  objectFit: "cover",
};

const fontStyle = {
  fontWeight: 700,
  textAlign: "center",
  py: 2,
  px: 2,
};

type Props = {
  name: string;
  image: string;
  quantity: number;
  medal: string;
};

export default function TopSalesCard(props: Props) {
  return (
    <Grid item md={3}>
      <Card sx={cardStyle}>
        <Box
          component="img"
          src={`${BASEURL}/${props.image}`}
          alt={props.name}
          sx={imgStyle}
        />
        <Box component="img" src={props.medal} alt="gold" sx={medalStyle} />
        <Typography variant="subtitle2" sx={fontStyle}>
          {props.name}
        </Typography>
      </Card>
    </Grid>
  );
}
