import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function LoginModal(props: {
  open: boolean;
  handleClose: () => void;
}) {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Log in to add to cart
        </Typography>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={goToLogin}>
          Log in
        </Button>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Don't have an account? <Button onClick={goToSignup}>Sign up</Button>
        </Typography>
      </Box>
    </Modal>
  );
}
