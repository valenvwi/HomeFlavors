import { SubmitHandler, useForm } from "react-hook-form";
import { apiTokenCreate } from "../../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { isAxiosError } from "axios";
import flyingPan from "../assets/frying-pan.png";
import {
  BoldTypography,
  ContainedButton,
  GreyTypography,
  OrangePaper,
  SpaceAroundFlexBox,
} from "../components";
import { authLogoStyle } from "../components/imgStyle";

const outerBoxStyle = {
  marginTop: "120px",
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

const errorMsgStyle = {
  color: "#d32f2f",
  fontFamily: "Helvetica",
  fontWeight: 500,
};

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [defaultUsername, setDefaultUsername] = useState<string>("");
  const [defaultPassword, setDefaultPassword] = useState<string>("");

  const handleGuestLogin = () => {
    setDefaultUsername("demouser");
    setDefaultPassword("asdasd");
    setValue("username", "demouser");
    setValue("password", "asdasd");
  };

  const handleOwnerLogin = () => {
    setDefaultUsername("demoowner");
    setDefaultPassword("dsadsa");
    setValue("username", "demoowner");
    setValue("password", "dsadsa");
  };

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      console.log("data", data);
      console.log("e.target.value", defaultUsername);

      const response = await apiTokenCreate(data);
      dispatch(authActions.setIsLoggedIn(true));
      dispatch(authActions.setCurrentUserId(response.data.userId));
      dispatch(authActions.setIsOwner(response.data.isOwner));
      dispatch(authActions.setJustLoggedIn(true));
      dispatch(authActions.setUsername(data.username));
      navigate("/menu");
      window.scrollTo(0, 0);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setInvalidCredentials(true);
        return;
      }
      throw error;
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ flexGrow: 1 }}>
      <Box sx={outerBoxStyle}>
        <img src={flyingPan} alt="flying pan" style={authLogoStyle} />

        <BoldTypography variant="h5" sx={{ py: 2 }}>
          Welcome back
        </BoldTypography>
        <GreyTypography variant="body2" sx={{ textAlign: "center" }}>
          We are happy to see you again!
        </GreyTypography>
        <OrangePaper sx={{ my: 3, display: "flex", flexDirection: "column" }}>
          <BoldTypography variant="subtitle2" sx={{ textAlign: "center" }}>
            Select a demo account to log in
          </BoldTypography>
          <SpaceAroundFlexBox>
            <ContainedButton
              sx={{ my: 1, fontSize: "12px" }}
              onClick={handleGuestLogin}
            >
              Guest
            </ContainedButton>
            <ContainedButton
              sx={{ fontSize: "12px" }}
              onClick={handleOwnerLogin}
            >
              Owner
            </ContainedButton>
          </SpaceAroundFlexBox>
        </OrangePaper>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={formBoxStyle}
        >
          <TextField
            {...register("username", { required: "Username is required" })}
            id="username"
            label="Username"
            autoComplete="username"
            value={defaultUsername}
            onChange={(e) => setDefaultUsername(e.target.value)}
            autoFocus
            error={!!errors.username}
            helperText={errors.username && errors.username.message}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={defaultPassword}
            onChange={(e) => setDefaultPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />

          {invalidCredentials && (
            <Typography variant="subtitle2" sx={errorMsgStyle}>
              Incorrect username/ password
            </Typography>
          )}
          <ContainedButton type="submit" sx={buttonStyle}>
            Log In
          </ContainedButton>
          <Grid container>
            <Grid item sx={{ fontSize: "12px" }}>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
