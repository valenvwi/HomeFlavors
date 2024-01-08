import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ordersCreate, orderItemsCreate } from "../../../api";
import { useAppDispatch, useAppSelector } from "../store/root";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart";
import { useUsersRetrieve } from "../../../api";
import { modalActions } from "../store/modal";

type OrderInputs = {
  name: string;
  contactNumber: string;
  pickUpDateTime: dayjs.Dayjs;
  remark: string;
};

export default function CheckoutForm() {

  const getDefaultPickUpTime = () => {
    const nowPlus20Min = dayjs().add(20, 'minute');
    const openingTime = dayjs().hour(12).minute(0);
    const closingTime = dayjs().hour(19).minute(59);

    if (nowPlus20Min.isBefore(openingTime)) {
      return openingTime;
    } else if (nowPlus20Min.isAfter(closingTime)) {
      return dayjs().add(1, 'day').hour(12).minute(0);
    } else {
      return nowPlus20Min;
    }
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<OrderInputs>({
    defaultValues: {
      pickUpDateTime: getDefaultPickUpTime(),
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

  const goToOrderHistory = () => {
    navigate("/orderHistory");
  };

  const onSubmit: SubmitHandler<OrderInputs> = async (data) => {
    const orderData = {
      kitchen: "1",
      totalPrice: totalPrice.toString(),
      totalQuantity: cartItems
        .map((cartItem) => cartItem.quantity)
        .reduce((a, b) => a + b, 0),
      name: data.name,
      contactNumber: data.contactNumber,
      pickUpDate: data.pickUpDateTime.format("YYYY-MM-DD"),
      pickUpTime: data.pickUpDateTime.format("HH:mm"),
      remark: data.remark,
    };
    try {
      const response = await ordersCreate(orderData);
      createOrderItems(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrderItems = async (orderId: number) => {
    try {
      for (const cartItem of cartItems) {
        const orderItemData = {
          menu_item: cartItem.id,
          quantity: cartItem.quantity,
          order: orderId,
        };
        await orderItemsCreate(orderItemData);
        console.log("Order item created", orderItemData);
      }
      console.log("All order items created");
      dispatch(cartActions.resetCart());
      dispatch(modalActions.setIsCheckedout(true));
      goToOrderHistory();
    } catch (error) {
      console.error("Error creating order items", error);
    }
  };

  const isTimeValid = (time: dayjs.Dayjs) => {
    const hour = time.hour();
    if (hour < 12 || hour > 19) {
      return true;
    }
    return false;
  };

  const maxDate = dayjs().add(30, "day");

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Paper
      elevation={6}
      sx={{
        mt: { xs: 1, md: 5 },
        p: 2,
        backgroundColor: "#fff6f2",
        borderRadius: "10px",
      }}
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
                <MobileDateTimePicker
                  label="Pick up date & time"
                  value={value}
                  onChange={onChange}
                  sx={{ width: "90%", py: 1 }}
                  minDateTime={dayjs().add(20, "minute")}
                  maxDate={maxDate}
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
