import { Box, Button, TextField } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";
import { useForm, SubmitHandler } from "react-hook-form";
import { kitchensPartialUpdate, useKitchensRetrieve } from "../../../../api";

type Props = {
  kitchen?: KitchenType;
  showEdit: boolean;
  onHideEditClick: () => void;
};

export default function EditContent(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { register, handleSubmit } = useForm<KitchenType>();
  const { refetch } = useKitchensRetrieve(1);
  const onHideEdit = () => {
    props.onHideEditClick();
  };

  const onSubmit: SubmitHandler<KitchenType> = async (data) => {
    console.log(data);
    const response = await kitchensPartialUpdate(1, data);
    if (!response) {
      console.log("error");
      return;
    }
    refetch();
    onHideEdit();
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          my: 2,
          display: isSmallScreen ? "flex" : "block",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              {...register("name")}
              label="Name"
              defaultValue={props.kitchen?.name}
              multiline
              variant="standard"
              sx={{ width: "90%", pt: 1, pb: 2 }}
            ></TextField>
            <TextField
              {...register("cuisine")}
              label="Cuisine"
              defaultValue={props.kitchen?.cuisine}
              multiline
              variant="standard"
              sx={{ width: "90%", pt: 1, pb: 2 }}
            ></TextField>
            <TextField
              {...register("description")}
              label="Description"
              defaultValue={props.kitchen?.description}
              multiline
              variant="standard"
              rows={5}
              sx={{ width: "90%", pt: 1, pb: 2 }}
            />
          </Box>
          <Box>
            <TextField
              {...register("address")}
              label="Address"
              defaultValue={props.kitchen?.address}
              variant="standard"
              multiline
              sx={{ width: "90%", pt: 1, pb: 2 }}
            />
            <TextField
              {...register("contactNumber")}
              label="Contact Number"
              defaultValue={props.kitchen?.contactNumber}
              variant="standard"
              multiline
              sx={{ width: "90%", pt: 1, pb: 2 }}
            />
            <TextField
              {...register("openingHours")}
              label="Opening Hours"
              defaultValue={props.kitchen?.openingHours}
              variant="standard"
              multiline
              rows={4}
              sx={{ width: "90%", pt: 1, pb: 2 }}
            />
          </Box>
          <Button onClick={onHideEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </form>
      </Box>
    </>
  );
}
