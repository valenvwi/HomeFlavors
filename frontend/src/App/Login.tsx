import { SubmitHandler, useForm } from "react-hook-form";
import { apiTokenCreate } from "../../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isAxiosError } from "axios";
import flyingPan from "../assets/frying-pan.png";

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await apiTokenCreate(data);
      dispatch(authActions.setIsLoggedIn(true));
      dispatch(authActions.setCurrentUserId(response.data.user_id));
      navigate("/");
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setInvalidCredentials(true);
        return;
      }
      throw error;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={flyingPan}
          alt="flying pan"
          width="100px"
          height="100px"
          color="orange"
        />

        <Typography component="h1" variant="h4" fontWeight={700} sx={{ py: 2 }}>
          Welcome back
        </Typography>
        <Typography
          component="h1"
          variant="body1"
          sx={{ color: "#8b8989", textAlign: "center" }}
        >
          We are happy to see you again!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("username", { required: "Username is required" })}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username && errors.username.message}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />

          {invalidCredentials && (
            <Typography
              variant="subtitle1"
              color="#d32f2f"
              fontFamily="Helvetica"
              fontWeight={500}
            >
              Incorrect username/ password
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
