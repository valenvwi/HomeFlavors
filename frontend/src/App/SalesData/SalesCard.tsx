import { Card, Grid, Typography } from "@mui/material";
import SalesChart from "./SalesChart";
import SalesPie from "./SalesPie";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  pt: 2,
  m: 2,
  borderRadius: "15px",
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
  sales?: {
    time: string;
    ordersCount: number;
    quantity: number;
    revenue: string;
  }[];
  orderStatus?: {
    acceptedOrders: number;
    cancelledOrders: number;
    cancelOrders: number;
  };
  data?: string | undefined;
};

export default function SalesCard(props: Props) {
  return (
    <Grid item md={3}>
      <Card sx={cardStyle}>
        <Typography variant="subtitle1" style={fontTitleStyle}>
          {props.title}
        </Typography>
        <Typography variant="h6" style={fontContentStyle}>
          {props.subtitle}
        </Typography>
        {props.sales && <SalesChart sales={props.sales} data={props.data} />}
        {props.orderStatus && <SalesPie orderStatus={props.orderStatus} />}
      </Card>
    </Grid>
  );
}
