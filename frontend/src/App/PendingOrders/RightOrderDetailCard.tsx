import { Box, Button, Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BASEURL } from "../../config";

const containerStyle = {
  m: 2,
  p: 4,
  width: "100%",
};

const orderDetailBox = {
  p: 3,
  mb: 4,
  borderRadius: "15px",
  backgroundColor: "#fff6f2",
};

const orderDetailSmallBox = {
  display: "flex",
  justifyContent: "space-around",
};

const smallPaperStyle = {
  px: 3,
  py: 2,
};

const boldFontStyle = {
  fontWeight: 700,
};

const orderItemBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  my: 2,
};

const imgStyle = {
  objectFit: "cover",
  borderRadius: "10px",
  width: "150px",
  height: "150px",
};

const fontSummary = {
  textAlign: "right",
  fontWeight: 700,
};

type Props = {
  order: OrderType;
  acceptOrder: (orderId: number) => void;
  cancelOrder: (orderId: number) => void;
};
export default function RightOrderDetailCard(props: Props) {
  const onAcceptOrder = () => {
    props.acceptOrder(props.order.id);
  };

  const onCancelOrder = () => {
    props.cancelOrder(props.order.id);
  };

  return (
    <Container sx={containerStyle}>
      <Paper elevation={6} sx={orderDetailBox}>
        <Typography variant="h5" style={boldFontStyle}>
          Order details
        </Typography>
        <Typography variant="subtitle1">
          Order for <b>{props.order.name}</b> created at{" "}
          {dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <br />
        <Box sx={orderDetailSmallBox}>
          <Paper sx={smallPaperStyle}>
            <Typography variant="subtitle1">
              Pick up Date & Time
              <br />
              <b>
                {props.order.pickUpDate}{" "}
                {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
              </b>
            </Typography>
          </Paper>
          <Paper sx={smallPaperStyle}>
            <Typography variant="subtitle1">
              Contact number
              <br />
              <b>{props.order.contactNumber}</b>
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {props.order.orderItems?.map((orderItem) => (
        <Box sx={orderItemBox}>
          <Box
            component="img"
            src={`${BASEURL}/${orderItem.menuItem.image}`}
            alt={orderItem.menuItem.name}
            sx={imgStyle}
          />

          <Typography key={orderItem.id}>
            {orderItem.menuItem.name} x {orderItem.quantity}
          </Typography>
          <Typography>
            CHF {(orderItem.menuItem.price * orderItem.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}
      {props.order.remark && (
        <Typography variant="subtitle1">
          Remark: {props.order.remark}
        </Typography>
      )}
      <br />
      <Typography sx={fontSummary}>
        Total quantity: {props.order.totalQuantity}
      </Typography>
      <Typography sx={fontSummary}>
        Total price: CHF {parseFloat(props.order.totalPrice).toFixed(2)}
      </Typography>
      {!props.order.isAccepted && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ m: 2 }}
            onClick={onAcceptOrder}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ my: 2 }}
            onClick={onCancelOrder}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Container>
  );
}
