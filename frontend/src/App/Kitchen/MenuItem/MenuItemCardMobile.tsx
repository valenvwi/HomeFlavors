import { Box, Button, Card, Typography } from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { BASEURL } from "../../../config";
import spicyIcon from "../../../assets/spicy.jpg";
import vegIcon from "../../../assets/veg.png";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { menuItemsDestroy } from "../../../../api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import soldOut from "../../../assets/sold-out.png";

export default function MenuItemCard(props: {
  menuItem: MenuItemType;
  isOwner: boolean;
  onSetMenuItem: (menuItem: MenuItemType) => void;
}) {
  const onDeleteMenuItem = () => {
    console.log(props.menuItem.id);
    menuItemsDestroy(props.menuItem.id);
  };

  const setMenuItem = () => {
    props.onSetMenuItem(props.menuItem);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", my: 2, p: 2 }}>
      <img
        src={`${BASEURL}/${props.menuItem.image}`}
        alt={props.menuItem.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
          aspectRatio: "1",
          margin: "0 auto",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          my: 2,
          mx: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ pr: 2, fontWeight: 600 }}>
          {props.menuItem.name}
        </Typography>
        {props.menuItem.isVeg && (
          <img src={vegIcon} alt="Vegetarian icon" width="25" height="25" />
        )}
        {props.menuItem.isSpicy && (
          <img src={spicyIcon} alt="Spicy icon" width="50" height="50" />
        )}
      </Box>
      <Typography variant="subtitle2" sx={{ mx: 1 }}>
        {props.menuItem.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          m: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {props.menuItem.price} CHF
        </Typography>
        {props.isOwner ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{ backgroundColor: "white" }}
                onClick={setMenuItem}
              >
                <ModeEditIcon sx={{ fontSize: "32px" }} />
              </Button>
              <Button
                style={{ backgroundColor: "white", color: "#d32f2f" }}
                onClick={onDeleteMenuItem}
              >
                <DeleteIcon sx={{ fontSize: "32px" }} />
              </Button>
            </Box>
          </>
        ) : props.menuItem.isAvailable ? (
          <Button color="primary">
            <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
          </Button>
        ) : (
          <img src={soldOut} alt="Sold Out" width="75" height="75" />
        )}
      </Box>
    </Card>
  );
}
