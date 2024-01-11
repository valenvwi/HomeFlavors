import {
  Box,
  Drawer,
  List,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { OrderType } from "../types/order";
import { useMemo, useState } from "react";
import LeftOrderCard from "./LeftOrderCard";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";

const boxStyle = {
  overflow: "auto",
  px: 1,
  my: 1,
};

const toggleButtonStyle = {
  m: "0 auto",
  pt: 4,
};

const fontStyle = {
  textAlign: "center",
  py: 5,
  fontWeight: 700,
};

const dateStyle = {
  textAlign: "center",
  fontWeight: 700,
  py: 2,
};

const mediumScreenConfig = {
  drawerStyle: {
    width: "100%",
    zIndex: 3,
    [`& .MuiDrawer-paper`]: { width: "100%", boxSizing: "border-box" },
  },
};

const bigScreenConfig = {
  drawerStyle: {
    width: "30%",
    flexShrink: 0,
    zIndex: 0,
    [`& .MuiDrawer-paper`]: { width: "30%", boxSizing: "border-box" },
  },
};

type Props = {
  pendingOrders: OrderType[];
  upcomingOrders: OrderType[];
  onSetOrder: (orderId: number) => void;
  onSetShowOrderList: (showOrderList: boolean) => void;
};

export default function LeftOrderList(props: Props) {
  const [alignment, setAlignment] = useState("pending");
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const style = isMediumScreen ? mediumScreenConfig : bigScreenConfig;

  const orders =
    alignment === "pending" ? props.pendingOrders : props.upcomingOrders;
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const todayOrders = useMemo(
    () => orders.filter((order) => order.pickUpDate === today),
    [orders, today]
  );

  const tomorrowOrders = useMemo(
    () => orders.filter((order) => order.pickUpDate === tomorrow),
    [orders, tomorrow]
  );
  const upcomingOrders = useMemo(
    () => orders.filter((order) => order.pickUpDate > tomorrow),
    [orders, tomorrow]
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const changeOrder = (order: OrderType) => {
    props.onSetOrder(order);
    props.onSetShowOrderList(false);
  };

  return (
    <Drawer variant="permanent" sx={style.drawerStyle}>
      <Toolbar />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={toggleButtonStyle}
      >
        <ToggleButton value="pending">Pending</ToggleButton>
        <ToggleButton value="upcoming">Upcoming</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={boxStyle}>
        <List>
          {orders && orders.length === 0 ? (
            <Typography variant="h6" sx={fontStyle}>
              No {alignment} orders
            </Typography>
          ) : (
            <>
              {todayOrders.length > 0 && (
                <>
                  <Typography sx={dateStyle}>
                    Today ({todayOrders.length})
                  </Typography>
                  {todayOrders.map((order) => (
                    <LeftOrderCard
                      key={order.id}
                      order={order}
                      changeOrder={changeOrder}
                    />
                  ))}
                  {(tomorrowOrders.length > 0 || upcomingOrders.length > 0) && (
                    <Divider sx={{ mt: 3 }} />
                  )}
                </>
              )}
              {tomorrowOrders.length > 0 && (
                <>
                  <Typography sx={dateStyle}>
                    Tomorrow ({tomorrowOrders.length})
                  </Typography>
                  {tomorrowOrders.map((order) => (
                    <LeftOrderCard
                      key={order.id}
                      order={order}
                      changeOrder={changeOrder}
                    />
                  ))}
                  {upcomingOrders.length > 0 && <Divider sx={{ mt: 3 }} />}
                </>
              )}
              {upcomingOrders.length > 0 && (
                <>
                  <Typography sx={dateStyle}>
                    Upcoming ({upcomingOrders.length})
                  </Typography>
                  {upcomingOrders.map((order) => (
                    <LeftOrderCard
                      key={order.id}
                      order={order}
                      changeOrder={changeOrder}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
