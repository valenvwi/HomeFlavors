import { Container, Grid, Typography } from "@mui/material";
import SalesItemTable from "./SalesItemTable";
import { useSalesDataList } from "../../../api";
import SalesCard from "./SalesCard";

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
        {salesByHour && (
          <>
            <SalesCard
              title="Total Sales"
              subtitle={"CHF " + (salesByPeriod?.revenue ?? "0.00")}
              sales={salesByHour}
              data="revenue"
            />
            <SalesCard
              title="Total Orders"
              subtitle={salesByPeriod.orders}
              sales={salesByHour}
              data="ordersCount"
            />
            <SalesCard
              title="Total Items Sold"
              subtitle={salesByPeriod.quantity}
              sales={salesByHour}
              data="quantity"
            />
          </>
        )}
      </Grid>

      <Typography variant="h5" fontWeight={700}>
        Sales by Item
      </Typography>
      {salesByItem && <SalesItemTable sales={salesByItem} />}
    </Container>
  );
}
