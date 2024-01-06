import { Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};

export default function PaymentForm() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.nameOnCard, "You don't really need to submit");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        mt: { md: 5 },
        mb: 5,
        p: 2,
        backgroundColor: "#fff6f2",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ m: 2 }}>
        Payment Method
      </Typography>
      <Typography variant="subtitle1" sx={{ m: 2 }}>
        This is a demo website, so you don't need to enter anything here.
      </Typography>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1, textAlign: "center" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("nameOnCard")}
            label="Name on Card"
            variant="standard"
            defaultValue="Hello world"
            sx={{ width: "90%", py: 1 }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("cardNumber")}
            label="Card Number"
            variant="standard"
            defaultValue="1234 1234 1234 1234"
            sx={{ width: "90%", py: 1 }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("expirationDate")}
            label="Expiration Date"
            variant="standard"
            defaultValue="01/2021"
            sx={{ width: "90%", py: 1 }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("cvv")}
            label="CVV"
            variant="standard"
            defaultValue="123"
            sx={{ width: "90%", py: 1 }}
          ></TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}
