import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAppSelector } from "../store/root";
import { useNavigate } from "react-router-dom";
import { apiLogoutCreate } from "../../../api";
import { authActions } from "../store/auth";
import { useAppDispatch } from "../store/root";

export const LeftDrawer = (props: { handleDrawerToggle: () => void }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isOwner = useAppSelector((state) => state.auth.isOwner);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToLoginPage = () => {
    navigate("/login");
    props.handleDrawerToggle();
  };

  const goToMenuPage = () => {
    navigate("/menu");
    props.handleDrawerToggle();
  };

  const goToCartPage = () => {
    navigate("/cart");
    props.handleDrawerToggle();
  };

  const goToOrderHistoryPage = () => {
    navigate("/orderHistory");
    props.handleDrawerToggle();
  };

  const goToPendingOrderPage = () => {
    navigate("/pendingOrders");
    props.handleDrawerToggle();
  };

  const goToSalesDataPage = () => {
    navigate("/salesData");
    props.handleDrawerToggle();
  };

  const logout = () => {
    apiLogoutCreate();
    dispatch(authActions.setIsLoggedIn(false));
    navigate("/login");
    window.scrollTo(0, 0);
    props.handleDrawerToggle();
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {isLoggedIn ? (
          isOwner ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={goToMenuPage}>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText>Menu</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={goToPendingOrderPage}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText>Pending orders</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={goToSalesDataPage}>
                  <ListItemIcon>
                    <LeaderboardIcon />
                  </ListItemIcon>
                  <ListItemText>Sales Report</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={goToMenuPage}>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText>Menu</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={goToCartPage}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText>Shopping cart</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={goToOrderHistoryPage}>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText>Order history</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={goToLoginPage}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );
};
