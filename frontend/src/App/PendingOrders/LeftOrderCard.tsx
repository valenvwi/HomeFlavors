import {
  Box,
  Divider,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderType } from "../types/order";
import { BoldTypography, GreyTypography } from "../../components";

const paperStyle = {
  display: "flex",
  alignItems: "top",
  justifyContent: "space-between",
  flexGrow: 1,
};
type Props = {
  order: OrderType;
  changeOrder: (order: OrderType) => void;
};

export default function LeftOrderCard(props: Props) {
  const changeOrder = (order: OrderType) => {
    props.changeOrder(order);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box key={props.order.id}>
        <ListItemButton
          onClick={() => changeOrder(props.order)}
          sx={{ justifyContent: "center" }}
        >
          <Box sx={{ ...paperStyle, px: !isSmallScreen && 1 }}>
            <Box>
              <BoldTypography variant="subtitle2">
                Order #{props.order.id}
              </BoldTypography>
              <GreyTypography variant="subtitle2">
                {props.order.pickUpDate}{" "}
                {dayjs(props.order.pickUpTime, "HH:mm:ss").format("HH:mm")}
              </GreyTypography>
            </Box>
            <BoldTypography variant="subtitle2" sx={{ color: "green" }}>
              {" "}
              CHF {parseFloat(props.order.totalPrice).toFixed(2)}
            </BoldTypography>
          </Box>
        </ListItemButton>
      </Box>
      <Divider sx={{ my: 1 }} />
    </>
  );
}
