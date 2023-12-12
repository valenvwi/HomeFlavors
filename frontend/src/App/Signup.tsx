import { Link, useNavigate } from "react-router-dom";
import { apiRegisterCreate } from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

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
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    apiRegisterCreate(data);
    navigate("/login");
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
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
          <TextField
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters long",
              },
            })}
            margin="normal"
            required
            fullWidth
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
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last name"
            type="lastName"
            autoComplete="lastName"
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
          <TextField
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Invalid phone number" },
            })}
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone number"
            type="phoneNumber"
            autoComplete="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Already have an account? Log in"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
