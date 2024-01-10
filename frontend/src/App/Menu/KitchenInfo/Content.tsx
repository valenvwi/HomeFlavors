import { Box, IconButton, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";
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
  iconButtonsx: { height: " 30px", width: "30px" },
  iconsx: { fontSize: "28px" },
} as const;

const largeScreenConfig = {
  fontTitleVariant: "h5",
  fontSubtitleVariant: "subtitle1",
  fontContentVariant: "subtitle2",
  iconButtonsx: { height: " 40px", width: "40px" },
  iconsx: { fontSize: "36px" },
} as const;

export default function Content(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenConfig : largeScreenConfig;

  const onShowEdit = () => {
    props.onShowEditClick();
  };

  return (
    <>
      <Box
        sx={{
          mx: 2,
          mt: 2,
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
          <Typography variant="subtitle2">
            <i>{props.kitchen?.description}</i>
          </Typography>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={onShowEdit}
            color="primary"
            sx={style.iconButtonsx}
          >
            <ModeEditIcon sx={style.iconsx} />
          </IconButton>
        </Box>

      </Box>
    </>
  );
}
