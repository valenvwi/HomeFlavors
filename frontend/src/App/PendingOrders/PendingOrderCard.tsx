import { Box, Button, Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BASEURL } from "../../config";

export default function PendingOrderCard(props: { order: OrderType }) {
  return (
    <Container sx={{ m: 2, p: 4, width: "100%" }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>
          Order details
        </Typography>
        <Typography variant="subtitle1">
          Order for <b>{props.order.name}</b> created at{" "}
          {dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Paper sx={{ px: 3, py: 2, backgroundColor: "#faf4f0" }}>
            <Typography variant="subtitle1">
              Pick up Date & Time
              <br />
              <b>
                {props.order.pickUpDate}{" "}
                {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
              </b>
            </Typography>
          </Paper>
          <Paper sx={{ px: 3, py: 2, backgroundColor: "#faf4f0" }}>
            <Typography variant="subtitle1">
              Contact number
              <br />
              <b>{props.order.contactNumber}</b>
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {props.order.orderItems?.map((orderItem) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <img
            src={`${BASEURL}/${orderItem.menuItem.image}`}
            alt={orderItem.menuItem.name}
            width="100px"
            height="100px"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />

          <Typography key={orderItem.id}>
            {orderItem.menuItem.name} x {orderItem.quantity}
          </Typography>
          <Typography>
            CHF {orderItem.menuItem.price * orderItem.quantity}
          </Typography>
        </Box>
      ))}
      {props.order.remark && (
        <Typography variant="subtitle1">
          Remark: {props.order.remark}
        </Typography>
      )}
      <br />
      <Typography fontWeight={700} sx={{ textAlign: "right" }}>
        Total price: CHF {props.order.totalPrice}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="success" sx={{ m: 2 }}>
          Accept
        </Button>
        <Button variant="contained" color="error" sx={{ my: 2 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
