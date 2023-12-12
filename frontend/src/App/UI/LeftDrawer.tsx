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

export const LeftDrawer = () => {
  const icons = [<ShoppingCartIcon />, <HistoryIcon />];
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Shopping cart", "Order history"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text}>Shopping cart</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
