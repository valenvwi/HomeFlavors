import { Box, Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BASEURL } from "../../config";
import { BoldTypography, ContainedButton } from "../../components";

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

const orderItemBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  my: 2,
};

const imgStyle = {
  objectFit: "cover",
  borderRadius: "10px",
  width: "80px",
  height: "80px",
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
        <BoldTypography variant="h6">Order details</BoldTypography>
        <Typography variant="subtitle2" sx={{ pt: 1 }}>
          Order for <b>{props.order.name}</b> created at{" "}
          {dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <br />
        <Box sx={orderDetailSmallBox}>
          <Paper sx={smallPaperStyle}>
            <Typography variant="subtitle2">
              Pick up Date & Time
              <br />
              <b>
                {props.order.pickUpDate}{" "}
                {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
              </b>
            </Typography>
          </Paper>
          <Paper sx={smallPaperStyle}>
            <Typography variant="subtitle2">
              Contact number
              <br />
              <b>{props.order.contactNumber}</b>
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {props.order.orderItems?.map((orderItem) => (
        <Box sx={orderItemBox} key={orderItem.id}>
          <Box
            component="img"
            src={`${BASEURL}/${orderItem.menuItem.image}`}
            alt={orderItem.menuItem.name}
            sx={imgStyle}
          />

          <Typography key={orderItem.id} variant="subtitle2">
            {orderItem.menuItem.name} x {orderItem.quantity}
          </Typography>
          <Typography variant="subtitle2">
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
      <BoldTypography sx={{ textAlign: "right" }}>
        Total quantity: {props.order.totalQuantity}
      </BoldTypography>
      <BoldTypography sx={{ textAlign: "right" }}>
        Total price: CHF {parseFloat(props.order.totalPrice).toFixed(2)}
      </BoldTypography>
      {!props.order.isAccepted && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ContainedButton
            color="success"
            sx={{ m: 2 }}
            onClick={onAcceptOrder}
          >
            Accept
          </ContainedButton>
          <ContainedButton color="error" sx={{ my: 2 }} onClick={onCancelOrder}>
            Cancel
          </ContainedButton>
        </Box>
      )}
    </Container>
  );
}
