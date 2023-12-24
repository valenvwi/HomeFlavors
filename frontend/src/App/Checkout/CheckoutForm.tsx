import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type OrderInputs = {
  name: string;
  contactNumber: string;
  pickUpDateTime: dayjs.Dayjs;
  remark: string;
};

export default function CheckoutForm() {
  const { register, control, handleSubmit } = useForm<OrderInputs>({
    defaultValues: {
      pickUpDateTime: dayjs().add(15, "minute"),
    },
  });

  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    console.log(data);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ m: 2 }}>
        Order information
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="pickUpDateTime"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Pick up date & time"
                  value={value}
                  onChange={onChange}
                  sx={{ width: "90%", py: 1 }}
                  minDateTime={dayjs().add(15, "minute")}
                />
              )}
            />
          </LocalizationProvider>
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
        <Button type="submit" variant="contained" sx={{ margin: "20px auto" }}>
          Place Order
        </Button>
      </Grid>
    </Paper>
  );
}
