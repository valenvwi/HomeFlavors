import { Box, Button, Card, Typography } from "@mui/material";
import { OrderType } from "../types/order";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { BASEURL } from "../../config";

export default function OrderHistoryCard(props: { order: OrderType }) {
  const formattedCreatedAtDate = dayjs(props.order.createdAt).format(
    "YYYY-MM-DD HH:mm"
  );
  const formattedPickUpDateTime = dayjs(
    props.order.pickUpDate + " " + props.order.pickUpTime
  ).format("YYYY-MM-DD HH:mm");

  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ my: 2, p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          Order created at {formattedCreatedAtDate}
        </Typography>

        {expanded ? (
          <Button onClick={() => setExpanded(false)}>
            <ExpandLessIcon />
          </Button>
        ) : (
          <Button onClick={() => setExpanded(true)}>
            <ExpandMoreIcon />
          </Button>
        )}
      </Box>
      {!expanded && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <img
              src={BASEURL + "/" + props.order.orderItems[0].menuItem.image}
              alt={props.order.orderItems[0].menuItem.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "5px",
                margin: "10px 0px",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mx: 2,
              }}
            >
              <Typography variant="subtitle1">
                Pick up time: {formattedPickUpDateTime}
              </Typography>
              <Typography variant="subtitle1">
                Price: {props.order.totalPrice}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6"></Typography>
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
            >
              <img
                src={BASEURL + "/" + orderItem.menuItem.image}
                alt={orderItem.menuItem.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                  margin: "10px 0px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h6">
                {orderItem.menuItem.name} x {orderItem.quantity}
              </Typography>
              <Typography variant="h6">
                CHF {orderItem.menuItem.price * orderItem.quantity}
              </Typography>
            </Box>
          ))}
          {props.order.remark && (
            <Typography variant="h6">Remarks: {props.order.remark}</Typography>
          )}
          <Typography variant="h6" fontWeight={700} textAlign="right">
            Total price: CHF {props.order.totalPrice}{" "}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
