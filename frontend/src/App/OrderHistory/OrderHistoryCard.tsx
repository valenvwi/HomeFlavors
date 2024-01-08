import { Box, Card, IconButton, Typography } from "@mui/material";
import { OrderType } from "../types/order";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { BASEURL } from "../../config";
import { useTheme, useMediaQuery } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  BoldTypography,
  ContainedButton,
  GreyTypography,
  SpaceBetweenFlexBox,
} from "../../components";
import { smImgStyle, mdImgStyle } from "../../components/imgStyle";

const smallScreenConfig = {
  cardStyle: {
    my: 2,
    p: 1,
    borderRadius: "15px",
    backgroundColor: "#fff6f2",
  },
  fontTitleVariant: "subtitle1",
  fontContentVariant: "body2",
  imageStyle: smImgStyle,
} as const;

const largeScreenConfig = {
  cardStyle: {
    my: 2,
    py: 4,
    px: 5,
    borderRadius: "15px",
    backgroundColor: "#fff6f2",
  },
  fontTitleVariant: "h6",
  fontContentVariant: "subtitle1",
  imageStyle: mdImgStyle,
} as const;

const spaceBetweenFlex = {
  display: "flex",
  justifyContent: "space-between",
};

const flexBoxColumnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  mx: 2,
};

const flexGrowColumnStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  ml: 1,
  minWidth: "0",
};

const smallScreenDescriptionStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "90%",
};

const flexendStyle = {
  display: "flex",
  justifyContent: "flex-end",
  my: 1,
};

type Props = {
  order: OrderType;
  openCancelOrderDialog: (orderId: number) => void;
};

export default function OrderHistoryCard(props: Props) {
  const formattedCreatedAtDate = dayjs(props.order.createdAt).format(
    "YYYY-MM-DD HH:mm"
  );
  const formattedPickUpDateTime = dayjs(
    props.order.pickUpDate + " " + props.order.pickUpTime
  ).format("YYYY-MM-DD HH:mm");

  const [expanded, setExpanded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const openCancelOrderDialog = () => {
    props.openCancelOrderDialog(props.order.id);
  };
  return (
    <Card elevation={6} sx={style.cardStyle}>
      <Box sx={spaceBetweenFlex}>
        <BoldTypography variant={style.fontTitleVariant}>
          {!isSmallScreen && "Order created at"} {formattedCreatedAtDate}
        </BoldTypography>

        {expanded ? (
          <IconButton onClick={() => setExpanded(false)}>
            <ExpandLessIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setExpanded(true)}>
            <ExpandMoreIcon />
          </IconButton>
        )}
      </Box>
      {!expanded && (
        <Box sx={spaceBetweenFlex}>
          <Box sx={{ display: "flex" }}>
            <img
              src={BASEURL + "/" + props.order.orderItems[0].menuItem.image}
              alt={props.order.orderItems[0].menuItem.name}
              style={style.imageStyle}
            />
            <Box sx={flexBoxColumnStyle}>
              <Typography variant={style.fontContentVariant}>
                Pick up time: {formattedPickUpDateTime}
              </Typography>
              <Typography variant={style.fontContentVariant}>
                Total Quantity: {props.order.totalQuantity}
              </Typography>
              <Typography variant={style.fontContentVariant}>
                Price: CHF {props.order.totalPrice}
              </Typography>
            </Box>
          </Box>
          {!props.order.isAccepted && !isSmallScreen && (
            <ContainedButton
              sx={{ m: " auto 10px", height: "100%" }}
              onClick={openCancelOrderDialog}
            >
              Cancel
              <CancelOutlinedIcon sx={{ ml: 1 }} />
            </ContainedButton>
          )}
        </Box>
      )}
      {expanded && (
        <Box>
          {props.order.orderItems?.map((orderItem) => (
            <SpaceBetweenFlexBox key={orderItem.id}>
              <img
                src={BASEURL + "/" + orderItem.menuItem.image}
                alt={orderItem.menuItem.name}
                style={style.imageStyle}
              />
              {isSmallScreen ? (
                <>
                  <Box sx={flexGrowColumnStyle}>
                    <Typography
                      variant={style.fontContentVariant}
                      sx={smallScreenDescriptionStyle}
                    >
                      {orderItem.menuItem.name}
                    </Typography>
                    <GreyTypography variant={style.fontContentVariant}>
                      x {orderItem.quantity}
                    </GreyTypography>
                  </Box>
                </>
              ) : (
                <Typography variant={style.fontContentVariant}>
                  {orderItem.menuItem.name} x {orderItem.quantity}
                </Typography>
              )}
              <Typography variant={style.fontContentVariant}>
                {(orderItem.menuItem.price * orderItem.quantity).toFixed(2)}
              </Typography>
            </SpaceBetweenFlexBox>
          ))}
          {props.order.remark && (
            <Typography variant={style.fontContentVariant} sx={{ pt: 1 }}>
              Remarks: {props.order.remark}
            </Typography>
          )}
          <BoldTypography variant={style.fontContentVariant} textAlign="right">
            Total Quantity: {props.order.totalQuantity}
            <br />
            Total price: CHF {parseFloat(props.order.totalPrice).toFixed(
              2
            )}{" "}
          </BoldTypography>
          {!props.order.isAccepted && isSmallScreen && (
            <Box sx={flexendStyle}>
              <ContainedButton
                sx={{ fontSize: "12px" }}
                onClick={openCancelOrderDialog}
              >
                Cancel
                <CancelOutlinedIcon sx={{ ml: 1, fontSize: "18px" }} />
              </ContainedButton>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
}
