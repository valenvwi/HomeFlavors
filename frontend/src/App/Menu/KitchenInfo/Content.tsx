import { Box, IconButton, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";
import { useAppSelector } from "../../store/root";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

type Props = {
  kitchen?: KitchenType;
  showEdit: boolean;
  onShowEditClick: () => void;
};

const smallScreenConfig = {
  fontTitleVariant: "h6",
  fontSubtitleVariant: "subtitle1",
  fontContentVariant: "subtitle2",
} as const;

const largeScreenConfig = {
  fontTitleVariant: "h5",
  fontSubtitleVariant: "subtitle1",
  fontContentVariant: "subtitle2",
} as const;

export default function Content(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const onShowEdit = () => {
    props.onShowEditClick();
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          my: 2,
          display: isSmallScreen ? "block" : "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant={style.fontTitleVariant} fontWeight={700}>
            {props.kitchen?.name}
          </Typography>
          <Typography variant={style.fontSubtitleVariant} sx={{}}>
            <i>{props.kitchen?.description}</i>
          </Typography>
          <Typography variant={style.fontContentVariant}>
            Cuisine: {props.kitchen?.cuisine}
          </Typography>
        </Box>
        <Box>
          <Typography variant={style.fontContentVariant}>
            Opening Hours: {props.kitchen?.openingHours}
          </Typography>
          <Typography variant={style.fontContentVariant}>
            Address: {props.kitchen?.address}
          </Typography>
          <Typography variant={style.fontContentVariant}>
            Contact Number: {props.kitchen?.contactNumber}
          </Typography>
        </Box>
        {currentUserId === props.kitchen?.owner && (
          <IconButton
            onClick={onShowEdit}
            color="primary"
            sx={{ height: " 40px", width: "40px" }}
          >
            <ModeEditIcon sx={{ fontSize: "36px" }} />
          </IconButton>
        )}
      </Box>
    </>
  );
}
