import { Card, Grid, Typography } from "@mui/material";
import SalesChart from "./SalesChart";

const cardStyle = {
  m: 2,
  p: 3,
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
};

const fontTitleStyle = {
  fontWeight: 700,
  color: "#8b8989",
};

const fontContentStyle = {
  fontWeight: 700,
};

type Props = {
  title: string;
  subtitle: string;
  sales: {
    time: string;
    ordersCount: number;
    quantity: number;
    revenue: string;
  }[];
  data: string;
};

export default function SalesCard(props: Props) {

  return (
    <Grid xs={4}>
      <Card sx={cardStyle}>
        <Typography variant="h6" style={fontTitleStyle}>
          {props.title}
        </Typography>
        <Typography variant="h5" style={fontContentStyle}>
          {props.subtitle}
        </Typography>
        {props.sales && <SalesChart sales={props.sales} data={props.data} />}
      </Card>
    </Grid>
  );
}
