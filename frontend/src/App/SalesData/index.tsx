import { Box, Container, Grid, Typography } from "@mui/material";
import SalesItemTable from "./SalesItemTable";
import { useSalesDataList } from "../../../api";
import SalesCard from "./SalesCard";
import { useState } from "react";
import SalesDateSelect from "./SalesDateSelect";
import TopSalesCard from "./TopSalesCard";
import gold from "../../assets/medals/gold.png";
import silver from "../../assets/medals/silver.png";
import bronze from "../../assets/medals/bronze.png";
import noSalesDataPic from "../../assets/no_sales_data.png";

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
  const orderStatus = salesDataResponse?.data?.orderStatus;

  const onSetDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  if (!salesDataResponse) {
    return (
      <Container
        sx={{
          mt: 4,
          py: 5,
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Overview
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {startDate === endDate ? startDate : startDate + " - " + endDate}
          </Typography>
          <SalesDateSelect onSetDate={onSetDate} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <img src={noSalesDataPic} alt="No sales data" width="250" />
          <Typography variant="h5" fontWeight={700}>
            No sales data available yet
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, py: 5 }} maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Overview
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {startDate === endDate ? startDate : startDate + " - " + endDate}
        </Typography>
        <SalesDateSelect onSetDate={onSetDate} />
      </Box>

      <Grid container sx={{ my: 3 }}>
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
            <SalesCard
              title="Cancellation Rate"
              subtitle={
                orderStatus.cancelledOrders
                  ? orderStatus?.cancelPercentage + "%"
                  : 0
              }
              orderStatus={orderStatus}
            />
          </>
        )}
      </Grid>

      <Typography variant="h6" fontWeight={700}>
        Top 3 Sales
      </Typography>

      {salesByItem && (
        <Grid container sx={{ my: 3 }}>
          <TopSalesCard
            name={salesByItem[0].name}
            image={salesByItem[0].image}
            quantity={salesByItem[0].quantity}
            medal={gold}
          />
          <TopSalesCard
            name={salesByItem[1].name}
            image={salesByItem[1].image}
            quantity={salesByItem[1].quantity}
            medal={silver}
          />
          <TopSalesCard
            name={salesByItem[2].name}
            image={salesByItem[2].image}
            quantity={salesByItem[2].quantity}
            medal={bronze}
          />
        </Grid>
      )}

      <Typography variant="h6" fontWeight={700}>
        Sales by Item
      </Typography>

      {salesByItem && <SalesItemTable sales={salesByItem} />}
    </Container>
  );
}
