import { Link, useNavigate } from "react-router-dom";
import { apiRegisterCreate, apiTokenCreate } from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Container, Grid, TextField } from "@mui/material";
import flyingPan from "../assets/frying-pan.png";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";
import { authLogoStyle } from "../components/imgStyle";
import { BoldTypography, ContainedButton, GreyTypography } from "../components";

const outerBoxStyle = {
  margin: "100px auto 50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formBoxStyle = {
  mt: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonStyle = {
  mt: 3,
  mb: 2,
  width: "100%",
  fontSize: "12px",
};

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
      dispatch(authActions.setCurrentUserId(response.data.userId));
      dispatch(authActions.setNewUser(true));
      dispatch(authActions.setUsername(data.username));
      navigate("/menu");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={outerBoxStyle}>
        <img src={flyingPan} alt="flying pan" style={authLogoStyle} />

        <BoldTypography variant="h5" sx={{ py: 2 }}>
          Sign up
        </BoldTypography>
        <GreyTypography variant="body2" sx={{ textAlign: "center" }}>
          Please enter your detail below
        </GreyTypography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={formBoxStyle}
        >
          <TextField
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Minimum 4 characters long",
              },
              validate: {
                noWhitespace: (value) =>
                  /^\S*$/.test(value) || "No whitespace is allowed",
              },
            })}
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
                message: "Mininum 6 characters long",
              },
              validate: {
                noWhitespace: (value) =>
                  /^\S*$/.test(value) || "No whitespace is allowed",
              },
            })}
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
                message: "Minimum 2 characters long",
              },
              validate: {
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value || "Invalid first name",
              },
            })}
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
                message: "Minimum 2 characters long",
              },
              validate: {
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value || "Invalid last name",
              },
            })}
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
              validate: {
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value || "Invalid emai accress",
              },
            })}
            id="email"
            label="Email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Invalid phone number" },
              pattern: {
                value: /^[0-9+]{8,15}$/,
                message: "invalid phone number",
              },
            })}
            name="phoneNumber"
            label="Phone number"
            type="phoneNumber"
            autoComplete="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
          <ContainedButton type="submit" sx={buttonStyle}>
            Sign up
          </ContainedButton>
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
