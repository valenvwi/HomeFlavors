import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";

export default function PendingOrderCard(props: { order: OrderType }) {
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography variant="h5">
        {props.order.pickUpDate}{" "}
        {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
      </Typography>
      {props.order.orderItems?.map((orderItem) => (
        <Typography key={orderItem.id}>
          {orderItem.menuItem.name} x {orderItem.quantity}
        </Typography>
      ))}
      <Typography>Total price: CHF {props.order.totalPrice}</Typography>
      {props.order.remark && (
        <Typography>Remark: {props.order.remark}</Typography>
      )}
      <Typography>Name: {props.order.name}</Typography>
      <Typography>Contact number: {props.order.contactNumber}</Typography>
      <Typography>
        Order created at{" "}
        {dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm")}
      </Typography>
    </Card>
  );
}
