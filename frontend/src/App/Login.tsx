import { SubmitHandler, useForm } from "react-hook-form";
import { apiTokenCreate } from "../../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/root";
import { authActions } from "./store/auth";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const response = await apiTokenCreate(data);
    if (!response) {
      console.log("error");
      return;
    }
    dispatch(authActions.setIsLoggedIn(true));
    dispatch(authActions.setCurrentUserId(response.data.user_id));
    navigate("/");
  };


  return (
      <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "200px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register('username', { required: 'Username is required' })}
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
            {...register('password', { required: 'Password is required' })}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
