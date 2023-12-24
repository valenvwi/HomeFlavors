import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type OrderInputs = {
  name: string;
  contactNumber: string;
  pickUpDate: string;
  pickUpTime: string;
  remark: string;
};
export default function Checkout() {
  const { register, handleSubmit } = useForm<OrderInputs>();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container sx={{ my: 5, py: 5 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography
          variant={isMediumScreen ? "h4" : "subtitle1"}
          sx={{ m: 2, textAlign: "left", fontWeight: 600 }}
        >
          Checkout
        </Typography>
        <Grid
          container
          spacing={3}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name")}
              label="Name"
              variant="standard"
              sx={{ width: "90%", py: 1 }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("contactNumber")}
              label="Contact Number"
              variant="standard"
              sx={{ width: "90%", py: 1 }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("pickUpDate")}
              label="Pick Up Date"
              variant="standard"
              sx={{ width: "90%", py: 1 }}
            >
              
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("pickUpTime")}
              label="Pick Up Time"
              variant="standard"
              sx={{ width: "90%", py: 1 }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("remark")}
              label="Remark"
              variant="standard"
              sx={{ width: "90%", py: 2 }}
              multiline
              rows={3}
            ></TextField>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
