import { Box, Button, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";
import { useAppSelector } from "../../store/root";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

type Props = {
  kitchen?: KitchenType;
  showEdit: boolean;
  onShowEditClick: () => void;
};

export default function Content(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const currentUserId = useAppSelector((state) => state.currentUserId);

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
        {currentUserId === props.kitchen?.owner && (
          <Button onClick={onShowEdit}>
            <ModeEditIcon />
          </Button>
        )}
      </Box>
    </>
  );
}
