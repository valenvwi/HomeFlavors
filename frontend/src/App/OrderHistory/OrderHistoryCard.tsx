import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { OrderType } from "../types/order";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { BASEURL } from "../../config";
import { useTheme, useMediaQuery } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const smallScreenConfig = {
  cardStyle: {
    my: 2,
    p: 1,
    borderRadius: "15px",
    backgroundColor: "#fff6f2",
  },
  fontTitleVariant: "subtitle1",
  fontContentVariant: "body2",
  imageStyle: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    margin: "10px 0px",
    objectFit: "cover",
    flexShrink: 0,
  },
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
  imageStyle: {
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    margin: "10px 0px",
    objectFit: "cover",
  },
} as const;

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant={style.fontTitleVariant} fontWeight={700}>
          {!isSmallScreen && "Order created at"} {formattedCreatedAtDate}
        </Typography>

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <img
              src={BASEURL + "/" + props.order.orderItems[0].menuItem.image}
              alt={props.order.orderItems[0].menuItem.name}
              style={style.imageStyle}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mx: 2,
              }}
            >
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
            <Button
              variant="contained"
              sx={{ m: " auto 10px", height: "100%" }}
              onClick={openCancelOrderDialog}
            >
              Cancel
              <CancelOutlinedIcon sx={{ ml: 1 }} />
            </Button>
          )}
        </Box>
      )}
      {expanded && (
        <Box>
          {props.order.orderItems?.map((orderItem) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={orderItem.id}
            >
              <img
                src={BASEURL + "/" + orderItem.menuItem.image}
                alt={orderItem.menuItem.name}
                style={style.imageStyle}
              />
              {isSmallScreen ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: "1",
                      ml: 1,
                      minWidth: "0",
                    }}
                  >
                    <Typography
                      variant={style.fontContentVariant}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "90%",
                      }}
                    >
                      {orderItem.menuItem.name}
                    </Typography>
                    <Typography
                      variant={style.fontContentVariant}
                      sx={{ color: "#8b8989" }}
                    >
                      x {orderItem.quantity}
                    </Typography>
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
            </Box>
          ))}
          {props.order.remark && (
            <Typography variant={style.fontContentVariant} sx={{ pt: 1 }}>
              Remarks: {props.order.remark}
            </Typography>
          )}
          <Typography
            variant={style.fontContentVariant}
            fontWeight={700}
            textAlign="right"
          >
            Total Quantity: {props.order.totalQuantity}
            <br />
            Total price: CHF {parseFloat(props.order.totalPrice).toFixed(
              2
            )}{" "}
          </Typography>
          {!props.order.isAccepted && isSmallScreen && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
              <Button
                variant="contained"
                sx={{ fontSize: "12px" }}
                onClick={openCancelOrderDialog}
              >
                Cancel
                <CancelOutlinedIcon sx={{ ml: 1, fontSize: "18px" }} />
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
}
