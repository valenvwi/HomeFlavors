import { Card, Container, Grid, Typography } from "@mui/material";
import SalesItemTable from "./SalesItemTable";
import { useSalesDataList } from "../../../api";
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

export default function SalesData() {
  const { data: salesDataResponse } = useSalesDataList({
    start_date: "2024-01-04",
    end_date: "2024-01-04",
  });
  const salesByItem = salesDataResponse?.data?.itemsSalesSummary;
  const salesByPeriod = salesDataResponse?.data?.salesByPeriod;
  const salesByHour = salesDataResponse?.data?.salesByHour;

  return (
    <Container sx={{ my: 5, py: 5 }} maxWidth="xl">
      <Typography variant="h4" fontWeight={900}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1">
        A tab to filter by days, weeks, months, years etc. Default by today
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        Daily Report
      </Typography>

      <Grid container spacing={2} sx={{ my: 3, mx: 1 }}>
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <Typography variant="h6" style={fontTitleStyle}>
              Total Sales
            </Typography>
            <Typography variant="h5" style={fontContentStyle}>
              CHF {salesByPeriod?.revenue}
            </Typography>
            {salesByHour && <SalesChart sales={salesByHour} />}
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <Typography variant="h6" style={fontTitleStyle}>
              Total Orders
            </Typography>
            <Typography variant="h5" style={fontContentStyle}>
              {salesByPeriod?.orders}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <Typography variant="h6" style={fontTitleStyle}>
              Total items sold
            </Typography>
            <Typography variant="h5" style={fontContentStyle}>
              {salesByPeriod?.quantity}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight={700}>
        Sales by Item
      </Typography>
      {salesByItem && <SalesItemTable sales={salesByItem} />}
    </Container>
  );
}
