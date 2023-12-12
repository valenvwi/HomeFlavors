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
import { useAppSelector } from "../store/root";
import { useNavigate } from "react-router-dom";
import { apiLogoutCreate } from "../../../api";
import { authActions } from "../store/auth";
import { useAppDispatch } from "../store/root";

export const LeftDrawer = () => {
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const logout = () => {
    apiLogoutCreate();
    dispatch(authActions.setIsLoggedIn(false));
  }

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText>Shopping cart</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
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
