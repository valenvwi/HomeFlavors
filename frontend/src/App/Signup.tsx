import { Link, useNavigate } from "react-router-dom";
import { apiRegisterCreate, apiTokenCreate } from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import flyingPan from "../assets/frying-pan.png";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";

type SignupInputs = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    await apiRegisterCreate(data);
    try {
      const response = await apiTokenCreate({
        password: data.password,
        username: data.username,
      });
      dispatch(authActions.setIsLoggedIn(true));
      dispatch(authActions.setCurrentUserId(response.data.user_id));
      dispatch(authActions.setNewUser(true));
      dispatch(authActions.setUsername(data.username));
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "120px",
          marginBottom: "120px",
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

        <Typography component="h1" variant="h5" fontWeight={700} sx={{ py: 2 }}>
          Sign up
        </Typography>
        <Typography
          component="h1"
          variant="body2"
          sx={{ color: "#8b8989", textAlign: "center" }}
        >
          Please enter your detail below
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
            required
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username && errors.username.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            required
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters long",
              },
            })}
            required
            name="firstName"
            label="First name"
            type="firstName"
            autoComplete="firstName"
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
          <TextField
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters long",
              },
            })}
            required
            name="lastName"
            label="Last name"
            type="lastName"
            autoComplete="lastName"
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />

          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            required
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Invalid phone number" },
            })}
            required
            name="phoneNumber"
            label="Phone number"
            type="phoneNumber"
            autoComplete="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%", fontSize: "12px" }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item sx={{ fontSize: "12px" }}>
              <Link to="/login">{"Already have an account? Log in"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
