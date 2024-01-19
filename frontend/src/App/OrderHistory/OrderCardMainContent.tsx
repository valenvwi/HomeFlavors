import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import { BoldTypography } from "../../components";
import { OrderType } from "../types/order";
import dayjs from "dayjs";

const GreyContent = ({
  sx,
  variant = "subtitle1",
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) => (
  <Typography
    fontWeight={700}
    variant={variant}
    sx={{
      color: "#8b8989",
      mr: 1,
      ...sx,
    }}
    {...rest}
  />
);
const smallScreenConfig = {
  fontContentVariant: "subtitle2",
} as const;

const largeScreenConfig = {
  fontContentVariant: "subtitle1",
} as const;

type Props = {
  order: OrderType;
};

export default function OrderCardMainContent(props: Props) {
  const formattedPickUpDateTime = dayjs(
    props.order.pickUpDate + " " + props.order.pickUpTime
  ).format("YYYY-MM-DD HH:mm");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <GreyContent variant={style.fontContentVariant}>
          Pick up time:
        </GreyContent>
        <BoldTypography variant={style.fontContentVariant}>
          {formattedPickUpDateTime}
        </BoldTypography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <GreyContent variant={style.fontContentVariant}>
          Total Quantity:
        </GreyContent>
        <BoldTypography variant={style.fontContentVariant}>
          {props.order.totalQuantity}
        </BoldTypography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <GreyContent variant={style.fontContentVariant}>Price:</GreyContent>
        <BoldTypography variant={style.fontContentVariant}>
          CHF {props.order.totalPrice}
        </BoldTypography>
      </Box>
    </>
  );
}
