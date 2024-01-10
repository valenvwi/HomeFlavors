import {
  Box,
  Button,
  CircularProgress,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme, useMediaQuery } from "@mui/material";
import { ContainedButton } from "../../components";

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

export default function Modal(props: {
  open: boolean;
  handleConfirm?: () => void;
  handleClose?: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon: "success" | "alert" | "loading" | "fail" | "none";
  subtext?: string;
  subtextButtonText?: string;
  subtextAction?: () => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isSmallScreen ? smallScreenStyle : largeScreenStyle;

  return (
    <MuiModal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.icon === "success" && (
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green", p: 1 }} />
        )}
        {props.icon === "alert" && (
          <WarningAmberIcon sx={{ fontSize: 80, color: "orange", p: 1 }} />
        )}
        {props.icon === "fail" && (
          <ErrorIcon sx={{ fontSize: 80, color: "red", p: 1 }} />
        )}

        {props.icon === "loading" && <CircularProgress sx={{ m: 3 }} />}
        <Typography
          id="modal-modal-title"
          variant={isSmallScreen ? "subtitle1" : "h6"}
          component="h2"
          sx={{ textAlign: "center" }}
        >
          {props.message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {props.confirmText && (
            <ContainedButton
              sx={{ mt: 3, mb: 2, mx: 2 }}
              onClick={props.handleConfirm}
            >
              {props.confirmText}
            </ContainedButton>
          )}
          {props.cancelText && (
            <ContainedButton
              sx={{ mt: 3, mb: 2, mx: 2 }}
              onClick={props.handleClose}
            >
              {props.cancelText}
            </ContainedButton>
          )}
        </Box>
        {props.subtext && (
          <Typography
            id="modal-modal-description"
            variant={isSmallScreen ? "subtitle2" : "subtitle1"}
          >
            Don't have an account?{" "}
            <Button onClick={props.subtextAction}>
              <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"}>
                {props.subtextButtonText}
              </Typography>
            </Button>
          </Typography>
        )}
      </Box>
    </MuiModal>
  );
}
