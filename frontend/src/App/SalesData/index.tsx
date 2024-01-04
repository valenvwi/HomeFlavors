import { Box, Container, Grid, Typography } from "@mui/material";
import SalesItemTable from "./SalesItemTable";
import { useSalesDataList } from "../../../api";
import SalesCard from "./SalesCard";
import { useState } from "react";
import SalesDateSelect from "./SalesDateSelect";
import TopSalesCard from "./TopSalesCard";

export default function SalesData() {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);

  const { data: salesDataResponse } = useSalesDataList({
    start_date: startDate,
    end_date: endDate,
  });
  const salesByItem = salesDataResponse?.data?.itemsSalesSummary;
  const salesByPeriod = salesDataResponse?.data?.salesByPeriod;
  const salesByHour = salesDataResponse?.data?.salesByHour;

  console.log(salesByItem);

  const onSetDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Container sx={{ my: 5, py: 5 }} maxWidth="xl">
      <Typography variant="h3" fontWeight={900}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {startDate === endDate ? startDate : startDate + " - " + endDate}
        </Typography>
        <SalesDateSelect onSetDate={onSetDate} />
      </Box>

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

      {salesByItem && (
        <Grid container sx={{ my: 3, mx: 1, justifyContent: "center" }}>
          <TopSalesCard
            name={salesByItem[0].name}
            image={salesByItem[0].image}
            quantity={salesByItem[0].quantity}
          />
          <TopSalesCard
            name={salesByItem[1].name}
            image={salesByItem[1].image}
            quantity={salesByItem[1].quantity}
          />
          <TopSalesCard
            name={salesByItem[2].name}
            image={salesByItem[2].image}
            quantity={salesByItem[2].quantity}
          />
        </Grid>
      )}

      {salesByItem && <SalesItemTable sales={salesByItem} />}
    </Container>
  );
}
