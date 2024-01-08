import { Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BoldTypography,
  OrangePaper,
  ResponsiveGrid,
  StandardTextField,
} from "../../components";

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
    <OrangePaper
      sx={{
        mt: { md: 5 },
        mb: 4,
      }}
    >
      <BoldTypography variant="h5" sx={{ m: 2 }}>
        Payment Method
      </BoldTypography>
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
        <ResponsiveGrid>
          <StandardTextField
            {...register("nameOnCard")}
            label="Name on Card"
            defaultValue="Hello world"
          ></StandardTextField>
        </ResponsiveGrid>
        <ResponsiveGrid>
          <StandardTextField
            {...register("cardNumber")}
            label="Card Number"
            defaultValue="1234 1234 1234 1234"
          ></StandardTextField>
        </ResponsiveGrid>
        <ResponsiveGrid>
          <StandardTextField
            {...register("expirationDate")}
            label="Expiration Date"
            defaultValue="01/2021"
          ></StandardTextField>
        </ResponsiveGrid>
        <ResponsiveGrid>
          <StandardTextField
            {...register("cvv")}
            label="CVV"
            defaultValue="123"
          ></StandardTextField>
        </ResponsiveGrid>
      </Grid>
    </OrangePaper>
  );
}
