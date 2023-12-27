import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ordersCreate, orderItemsCreate } from "../../../api";
import { useAppDispatch, useAppSelector } from "../store/root";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart";
import { useUsersRetrieve } from "../../../api";
import { CartItemType } from "../types/cartItem";

type OrderInputs = {
  name: string;
  contactNumber: string;
  pickUpDateTime: dayjs.Dayjs;
  remark: string;
};

export default function CheckoutForm() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<OrderInputs>({
    defaultValues: {
      pickUpDateTime: dayjs().add(15, "minute"),
    },
  });

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: usersResponse } = useUsersRetrieve(currentUserId || 0);
  const user = usersResponse?.data;
  const nameInForm = user?.firstName;
  const contactNumberInForm = user?.phoneNumber;

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
    try {
      const response = await ordersCreate(orderData);
      createOrderItems(response.data.id);
    }
    catch (error) {
      console.log(error);
    }
  };

  const createOrderItems = (orderId: number) => {
    cartItems.map((cartItem: CartItemType) => {
      const orderItemData = {
        menu_item: cartItem.id,
        quantity: cartItem.quantity,
        order: orderId,
      };
      orderItemsCreate(orderItemData);
      console.log("Order item created", orderItemData);
    });
    dispatch(cartActions.resetCart());
    goToSuccessCheckout();
  };

  const isDayValid = (date: dayjs.Dayjs) => {
    const day = date.day();
    if (day === 0 || day === 1) {
      return true;
    }

    return false;
  };

  const isTimeValid = (time: dayjs.Dayjs) => {
    const hour = time.hour();
    if (hour < 12 || hour > 19) {
      return true;
    }
    return false;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
            {...register("name", { required: "Name is required" })}
            label="Name"
            variant="standard"
            defaultValue={nameInForm}
            sx={{ width: "90%", py: 1 }}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9+]{8,15}$/,
                message:
                  "Contact number must be 8-15 characters long and can only contain numbers and +",
              },
            })}
            label="Contact Number"
            variant="standard"
            defaultValue={contactNumberInForm}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber && errors.contactNumber.message}
            sx={{ width: "90%", py: 1 }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="pickUpDateTime"
              control={control}
              rules={{ required: "Pick up date and time are required" }}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Pick up date & time"
                  value={value}
                  onChange={onChange}
                  sx={{ width: "90%", py: 1 }}
                  minDateTime={dayjs().add(15, "minute")}
                  shouldDisableDate={isDayValid}
                  shouldDisableTime={isTimeValid}
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
