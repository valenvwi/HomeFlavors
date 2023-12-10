import { Box, TextField } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { KitchenType } from "../../types/kitchen";

type Props = {
  kitchen?: KitchenType;
  showEdit: boolean;
  onHideEditClick: () => void;
};

export default function EditContent(props: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const onHideEdit = () => {
    props.onHideEditClick();
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
        <Box>
          <TextField
            id="outlined-multiline-static"
            label="Name"
            defaultValue={props.kitchen?.name}
            multiline
            variant="standard"
            sx={{ width: "90%", pt: 1, pb: 2 }}
          ></TextField>
          <TextField
            id="outlined-multiline-static"
            label="Cuisine"
            defaultValue={props.kitchen?.cuisine}
            multiline
            variant="standard"
            sx={{ width: "90%", pt: 1, pb: 2 }}
          ></TextField>
          <TextField
            id="outlined-multiline-static"
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
            id="outlined-multiline-static"
            label="Address"
            defaultValue={props.kitchen?.address}
            variant="standard"
            multiline
            sx={{ width: "90%", pt: 1, pb: 2 }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Contact Number"
            defaultValue={props.kitchen?.contactNumber}
            variant="standard"
            multiline
            sx={{ width: "90%", pt: 1, pb: 2 }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Opening Hours"
            defaultValue={props.kitchen?.openingHours}
            variant="standard"
            multiline
            rows={4}
            sx={{ width: "90%", pt: 1, pb: 2 }}
          />
        </Box>
        <button onClick={onHideEdit}>Cancel</button>
        <button>Save</button>
      </Box>
    </>
  );
}
