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
import { useAppSelector } from "../store/root";
import { useNavigate } from "react-router-dom";

export const LeftDrawer = () => {
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
  const icons = [<ShoppingCartIcon />, <HistoryIcon />];
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {isLoggedIn ? (
          ["Shopping cart", "Order history"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))
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
