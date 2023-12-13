import { Box, Button, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";
import { useAppDispatch, useAppSelector } from "../../store/root";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect } from "react";
import { authActions } from "../../store/auth";

type Props = {
  kitchen?: KitchenType;
  showEdit: boolean;
  onShowEditClick: () => void;
};

export default function Content(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const currentUserId = useAppSelector((state) => state.currentUserId);
  const isKitchenOwner = useAppSelector((state) => state.isKitchenOwner);
  const dispatch = useAppDispatch();
  console.log("current user id: ", currentUserId);
  console.log("kitchen owner: ", props.kitchen?.owner);

  const checkIsKitchenOwner = () => {
    if (props.kitchen?.owner === currentUserId) {
      dispatch(authActions.setIsKitchenOwner(true));
    }
  };

  useEffect(() => {
    checkIsKitchenOwner();
  }, [currentUserId]);

  const onShowEdit = () => {
    props.onShowEditClick();
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          my: 2,
          display: isSmallScreen ? "flex" : "block",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">{props.kitchen?.name}</Typography>
          <Typography variant="h6">
            Cuisine: {props.kitchen?.cuisine}
          </Typography>
          <Typography variant="subtitle1">
            {props.kitchen?.description}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">{props.kitchen?.address}</Typography>
          <Typography variant="subtitle1">
            Contact Number: {props.kitchen?.contactNumber}
          </Typography>
          <Typography variant="subtitle1">
            Opening Hours: {props.kitchen?.openingHours}
          </Typography>
        </Box>
        {isKitchenOwner && (
          <Button onClick={onShowEdit} style={{ backgroundColor: "white" }}>
            <ModeEditIcon />
          </Button>
        )}
      </Box>
    </>
  );
}
