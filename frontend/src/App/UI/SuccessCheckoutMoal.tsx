import { Box, Button, Modal, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme, useMediaQuery } from "@mui/material";

const shareStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const smallScreenWidth = {
  width: "280px",
  p: 2,
};

const largeScreenWidth = {
  width: "500px",
  p: 4,
};

const smallScreenStyle = { ...shareStyle, ...smallScreenWidth };
const largeScreenStyle = { ...shareStyle, ...largeScreenWidth };

export default function SuccessCheckoutModal(props: {
  open: boolean;
  handleClose: () => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenStyle : largeScreenStyle;

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green", p: 1 }} />
        <Typography
          id="modal-modal-title"
          variant={isSmallScreen ? "subtitle1" : "h6"}
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Your order has been successfully placed!
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={props.handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
