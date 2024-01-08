import { Box, Grid } from "@mui/material";
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
import { CartItemType } from "../types/cartItem";
import {
  OrangePaper,
  BoldTypography,
  ResponsiveGrid,
  StandardTextField,
  ContainedButton,
} from "../../components";

type OrderInputs = {
  name: string;
  contactNumber: string;
  pickUpDateTime: dayjs.Dayjs;
  remark: string;
};

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
};

export default function CheckoutForm() {
  const getDefaultPickUpTime = () => {
    const nowPlus20Min = dayjs().add(20, "minute");
    const openingTime = dayjs().hour(12).minute(0);
    const closingTime = dayjs().hour(19).minute(59);

    if (nowPlus20Min.isBefore(openingTime)) {
      return openingTime;
    } else if (nowPlus20Min.isAfter(closingTime)) {
      return dayjs().add(1, "day").hour(12).minute(0);
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
  const maxDate = dayjs().add(30, "day");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: usersResponse } = useUsersRetrieve(currentUserId || 0);
  const user = usersResponse?.data;
  const nameInForm = user?.firstName;
  const contactNumberInForm = user?.phoneNumber;

  const goToOrderHistory = () => {
    navigate("/orderHistory");
  };

  const backToShoppingCart = () => {
    navigate("/cart");
  };

  const isTimeValid = (time: dayjs.Dayjs) => {
    const hour = time.hour();
    if (hour < 12 || hour > 19) {
      return true;
    }
    return false;
  };

  const onSubmit: SubmitHandler<OrderInputs> = async (data) => {
    const orderData = {
      kitchen: "1",
      totalPrice: totalPrice.toString(),
      totalQuantity: cartItems
        .map((cartItem: CartItemType) => cartItem.quantity)
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
      dispatch(cartActions.resetCart());
      dispatch(modalActions.setIsCheckedout(true));
      goToOrderHistory();
    } catch (error) {
      console.error("Error creating order items", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <OrangePaper
      sx={{
        mt: { xs: 1, md: 5 },
      }}
    >
      <BoldTypography variant="h5" sx={{ m: 2 }}>
        Order information
      </BoldTypography>
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
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters long",
              },
            })}
            label="Name"
            defaultValue={nameInForm}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          ></StandardTextField>
        </ResponsiveGrid>
        <ResponsiveGrid>
          <StandardTextField
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9+]{8,15}$/,
                message:
                  "Contact number must be 8-15 characters long and can only contain numbers and +",
              },
            })}
            label="Contact Number"
            defaultValue={contactNumberInForm}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber && errors.contactNumber.message}
          ></StandardTextField>
        </ResponsiveGrid>
        <ResponsiveGrid>
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
                  sx={{ input: { fontSize: "14px" }, width: "95%", py: 1 }}
                  minDateTime={dayjs().add(20, "minute")}
                  maxDate={maxDate}
                  shouldDisableTime={isTimeValid}
                />
              )}
            />
          </LocalizationProvider>
        </ResponsiveGrid>
        <ResponsiveGrid>
          <StandardTextField
            {...register("remark")}
            label="Remark"
            multiline
            rows={3}
          ></StandardTextField>
        </ResponsiveGrid>
        <Box sx={boxStyle}>
          <ContainedButton sx={{ mx: 1 }} onClick={backToShoppingCart}>
            Back to Cart
          </ContainedButton>
          <ContainedButton type="submit" sx={{ mx: 1 }}>
            Place Order
          </ContainedButton>
        </Box>
      </Grid>
    </OrangePaper>
  );
}
