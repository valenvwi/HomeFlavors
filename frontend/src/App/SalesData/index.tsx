import {
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SalesItemTable from "./SalesItemTable";
import { useSalesDataList } from "../../../api";
import SalesCard from "./SalesCard";
import { ComponentPropsWithoutRef, useState } from "react";
import SalesDateSelect from "./SalesDateSelect";
import TopSalesCard from "./TopSalesCard";
import gold from "../../assets/medals/gold.png";
import silver from "../../assets/medals/silver.png";
import bronze from "../../assets/medals/bronze.png";
import noSalesDataPic from "../../assets/no_sales_data.png";
import {
  BoldTypography,
  CenterFlexBox,
  SpaceBetweenFlexBox,
} from "../../components";

const flexColumnGrowStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
  mt: 4,
  py: 5,
};

const TitleTypography = (
  props: ComponentPropsWithoutRef<typeof Typography>
) => <Typography fontWeight={700} variant="h6" {...props} />;

export default function SalesData() {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Below lines are for testing purposes
  // const tomorrow= new Date(today.setDate(today.getDate() + 1))
  // const tomorrowString = tomorrow.toISOString().split("T")[0];
  // const [startDate, setStartDate] = useState(tomorrowString);
  // const [endDate, setEndDate] = useState(tomorrowString);

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

  if (salesByItem != undefined && salesByItem.length === 0) {
    return (
      <Container sx={flexColumnGrowStyle} maxWidth="xl">
        <SpaceBetweenFlexBox
          sx={{
            mt: 2,
          }}
        >
          <BoldTypography variant="h6">Overview</BoldTypography>
          <BoldTypography variant="h5">
            {startDate === endDate ? startDate : startDate + " - " + endDate}
          </BoldTypography>
          <SalesDateSelect onSetDate={onSetDate} />
        </SpaceBetweenFlexBox>

        <CenterFlexBox sx={flexColumnGrowStyle}>
          <img src={noSalesDataPic} alt="No sales data" width="250" />
          <BoldTypography variant="h5">
            No sales data available yet
          </BoldTypography>
        </CenterFlexBox>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, py: 5, flexGrow: 1 }} maxWidth="xl">
      <SpaceBetweenFlexBox
        sx={{
          mt: isSmallScreen ? 1 : 2,
        }}
      >
        {!isSmallScreen && <TitleTypography>Overview</TitleTypography>}
        <BoldTypography variant={isSmallScreen ? "subtitle1" : "h5"}>
          {startDate === endDate ? startDate : startDate + " - " + endDate}
        </BoldTypography>
        <SalesDateSelect onSetDate={onSetDate} />
      </SpaceBetweenFlexBox>

      {isSmallScreen && <TitleTypography>Overview</TitleTypography>}

      <Grid container sx={{ my: 3, justifyContent: "center" }}>
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
                  : "0"
              }
              orderStatus={orderStatus}
            />
          </>
        )}
      </Grid>

      <TitleTypography>Top 3 Sales</TitleTypography>

      {salesByItem != undefined && salesByItem.length > 0 && (
        <Grid container sx={{ my: 3 }}>
          <TopSalesCard
            name={salesByItem[0].name}
            image={salesByItem[0].image}
            quantity={salesByItem[0].quantity}
            medal={gold}
          />
          {salesByItem.length > 1 && (
            <TopSalesCard
              name={salesByItem[1].name}
              image={salesByItem[1].image}
              quantity={salesByItem[1].quantity}
              medal={silver}
            />
          )}
          {salesByItem.length > 2 && (
            <TopSalesCard
              name={salesByItem[2].name}
              image={salesByItem[2].image}
              quantity={salesByItem[2].quantity}
              medal={bronze}
            />
          )}
        </Grid>
      )}

      <TitleTypography>Sales by Item</TitleTypography>

      {salesByItem && <SalesItemTable sales={salesByItem} />}
    </Container>
  );
}
