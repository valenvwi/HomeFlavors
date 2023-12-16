import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LeftDrawer } from "./LeftDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../store/root";
import { Link, useNavigate } from "react-router-dom";
import { apiLogoutCreate } from "../../../api";
import { authActions } from "../store/auth";
import { useAppDispatch } from "../store/root";

export default function AppNavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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

  const logout = () => {
    apiLogoutCreate();
    dispatch(authActions.setIsLoggedIn(false));
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
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
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={goToCartPage}>
                  <ShoppingCartIcon />
                </Button>
                <Button color="inherit">
                  <HistoryIcon />
                </Button>
                <Button color="inherit" onClick={logout}>
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={goToLoginPage}>
                <LoginIcon />
                <Typography variant="subtitle2" sx={{ px: 1 }}>
                  Login
                </Typography>
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
