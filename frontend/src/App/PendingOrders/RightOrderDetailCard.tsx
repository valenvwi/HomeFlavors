import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BASEURL } from "../../config";
import {
  BoldTypography,
  ContainedButton,
  GreyBoldTypography,
} from "../../components";
import { smImgStyle } from "../../components/imgStyle";

const mediumScreenConfig = {
  containerStyle: {
    pt: 2,
    backgroundColor: "white",
    borderRadius: "30px",
    marginTop: "90px",
    width: "90%",
    height: "70vh",
  },

  orderDetailBox: {
    p: 1,
    mb: 2,
  },
  imgStyle: { ...smImgStyle, mr: 1 },
  orderItemBox: {
    display: "flex",
    alignItems: "center",
    my: 2,
  },
};

const bigScreenConfig = {
  containerStyle: {
    m: 2,
    px: 5,
    py: 2,
    width: "100%",
  },
  orderDetailBox: {
    px: 2,
    mb: 4,
  },
  imgStyle: {
    objectFit: "cover",
    borderRadius: "10px",
    width: "60px",
    height: "60px",
    mr: 2,
  },
  orderItemBox: {
    display: "flex",
    alignItems: "center",
    m: 2,
  },
};
type Props = {
  order: OrderType;
  acceptOrder: (orderId: number) => void;
  cancelOrder: (orderId: number) => void;
  onSetShowOrderList: (showOrderList: boolean) => void;
};
export default function RightOrderDetailCard(props: Props) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const style = isMediumScreen ? mediumScreenConfig : bigScreenConfig;

  const onAcceptOrder = () => {
    props.acceptOrder(props.order.id);
    props.onSetShowOrderList(true);
  };

  const onCancelOrder = () => {
    props.cancelOrder(props.order.id);
    props.onSetShowOrderList(true);
  };

  return (
    <Container sx={style.containerStyle}>
      <Box sx={style.orderDetailBox}>
        <BoldTypography variant="h5">Order details</BoldTypography>
        <Typography variant="subtitle2" sx={{ pt: 1 }}>
          Order for <b>{props.order.name}</b> created at{" "}
          {dayjs(props.order.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <Box sx={{ display: "flex", mt: 1 }}>
          <GreyBoldTypography variant="subtitle2" sx={{ mr: 1 }}>
            Pick up time:{" "}
          </GreyBoldTypography>
          <BoldTypography variant="subtitle2">
            {props.order.pickUpDate}{" "}
            {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
          </BoldTypography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <GreyBoldTypography variant="subtitle2" sx={{ mr: 1 }}>
            Contact number:
          </GreyBoldTypography>
          <BoldTypography variant="subtitle2">
            {props.order.contactNumber}
          </BoldTypography>
        </Box>
      </Box>

      {props.order.orderItems?.map((orderItem) => (
        <Box sx={style.orderItemBox} key={orderItem.id}>
          <Box
            component="img"
            src={`${BASEURL}/${orderItem.menuItem.image}`}
            alt={orderItem.menuItem.name}
            sx={style.imgStyle}
          />

          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              flexDirection: "column",
            }}
          >
            <BoldTypography key={orderItem.id} variant="subtitle2">
              {orderItem.menuItem.name}
            </BoldTypography>
            <GreyBoldTypography variant="subtitle2">
              Qty: {orderItem.quantity}
            </GreyBoldTypography>
          </Box>
          <BoldTypography variant="subtitle2">
            CHF {(orderItem.menuItem.price * orderItem.quantity).toFixed(2)}
          </BoldTypography>
        </Box>
      ))}
      {props.order.remark && (
        <Typography variant="subtitle1">
          Remark: {props.order.remark}
        </Typography>
      )}
      <br />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GreyBoldTypography sx={{ mr: 1 }}>Total quantity:</GreyBoldTypography>
        <BoldTypography>{props.order.totalQuantity}</BoldTypography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <GreyBoldTypography sx={{ mr: 1 }}>Total price:</GreyBoldTypography>
        <BoldTypography sx={{ textAlign: "right" }}>
          CHF {parseFloat(props.order.totalPrice).toFixed(2)}
        </BoldTypography>
      </Box>
      {!props.order.isAccepted && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ContainedButton
            color="success"
            sx={{ mb: 3, mx: 2 }}
            onClick={onAcceptOrder}
          >
            Accept
          </ContainedButton>
          <ContainedButton color="error" sx={{ mb: 3 }} onClick={onCancelOrder}>
            Cancel
          </ContainedButton>
        </Box>
      )}
      {props.order.isAccepted && isMediumScreen && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ContainedButton
            onClick={() => props.onSetShowOrderList(true)}
            sx={{ mb: 3 }}
          >
            Back
          </ContainedButton>
        </Box>
      )}
    </Container>
  );
}
