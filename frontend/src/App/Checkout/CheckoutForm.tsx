import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ordersCreate, orderItemsCreate } from "../../../api";
import { useAppDispatch, useAppSelector } from "../store/root";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart";

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

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToSuccessCheckout = () => {
    navigate("/successcheckedout");
  };

  const onSubmit: SubmitHandler<OrderInputs> = async (data) => {
    const orderData = {
      kitchen: "1",
      totalPrice: totalPrice.toString(),
      name: data.name,
      contactNumber: data.contactNumber,
      pickUpDate: data.pickUpDateTime.format("YYYY-MM-DD"),
      pickUpTime: data.pickUpDateTime.format("HH:mm"),
      remark: data.remark,
    };

    await ordersCreate(orderData);
    try {
      const response = await ordersCreate(orderData);
      setOrderId(response.data.id);
    } catch (error) {
      console.log(error);
    }

    console.log("Order placed");
    createOrderItems(orderId);
  };

  const createOrderItems = (orderId) => {
    cartItems.map((cartItem) => {
      const orderItemData = {
        menu_item: cartItem.id,
        quantity: cartItem.quantity,
        order: orderId,
      };
      orderItemsCreate(orderItemData);
      console.log("Order item created", orderItemData);
    });
    dispatch(cartActions.resetCart());
    console.log("Cart items: ", cartItems);
    goToSuccessCheckout();
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
