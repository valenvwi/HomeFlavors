import {
  AppBar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LeftDrawer } from "./LeftDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppSelector } from "../store/root";
import { Link, useNavigate } from "react-router-dom";
import { apiLogoutCreate, useOrdersList } from "../../../api";
import { authActions } from "../store/auth";
import { cartActions } from "../store/cart";
import { useAppDispatch } from "../store/root";
import { useSpring, animated } from "@react-spring/web";

export default function AppNavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const cartUpdated = useAppSelector((state) => state.cart.cartUpdated);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const isOwner = useAppSelector((state) => state.auth.isOwner);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const { data: ordersResponse } = useOrdersList(
    {
      kitchen_pending_orders: true,
    },
    { query: { enabled: isOwner } }
  );

  useEffect(() => {
    if (ordersResponse) {
      const orders = ordersResponse?.data;
      setNotificationCount(orders.length);
    }
  }, [ordersResponse]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToCartPage = () => {
    navigate("/cart");
  };

  const goToOrderHistoryPage = () => {
    navigate("/orderHistory");
  };

  const goToPendingOrderPage = () => {
    navigate("/pendingOrders");
  };

  const goToSalesDataPage = () => {
    navigate("/salesData");
  };

  const logout = () => {
    apiLogoutCreate();
    dispatch(authActions.setIsLoggedIn(false));
    navigate("/login");
  };

  const cartAnimation = useSpring({
    from: {
      transform: "scale(1)",
      color: "inherit",
    },
    to: {
      transform: cartUpdated ? "scale(1.3)" : "scale(1)",
    },
    reset: cartUpdated,
  });

  useEffect(() => {
    if (cartUpdated) {
      const timer = setTimeout(() => {
        dispatch(cartActions.setCartUpdated(false));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [cartUpdated, dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {isLoggedIn && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "5px",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                fontFamily="Lobster"
              >
                Home Flavors
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoggedIn && isOwner && (
              <>
                <Button color="inherit" onClick={goToPendingOrderPage}>
                  <Badge badgeContent={notificationCount} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </Button>
                <Button color="inherit" onClick={goToSalesDataPage}>
                  <LeaderboardIcon />
                </Button>
                <Button color="inherit" onClick={logout}>
                  <LogoutIcon />
                </Button>
              </>
            )}
            {isLoggedIn && !isOwner && (
              <>
                <Button color="inherit" onClick={goToCartPage}>
                  <animated.div style={cartAnimation}>
                    <Badge badgeContent={totalQuantity} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </animated.div>
                </Button>
                <Button color="inherit" onClick={goToOrderHistoryPage}>
                  <HistoryIcon />
                </Button>
                <Button color="inherit" onClick={logout}>
                  <LogoutIcon />
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <Button color="inherit" onClick={goToLoginPage}>
                <LoginIcon />
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {isLoggedIn ? (
              <Button color="inherit" onClick={goToCartPage}>
                <animated.div style={cartAnimation}>
                  <Badge badgeContent={totalQuantity} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </animated.div>
              </Button>
            ) : (
              <Button color="inherit" onClick={goToLoginPage}>
                <LoginIcon />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "200px",
            },
          }}
        >
          <LeftDrawer handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
    </Box>
  );
}
