import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { menuItemsPartialUpdate, useMenuItemsList } from "../../../../api";
import { useRef, useState } from "react";
import { BASEURL } from "../../../config";
import { useAppDispatch } from "../../store/root";
import { modalActions } from "../../store/modal";

export default function EditMenuItem(props: {
  menuItem: MenuItemType;
  onCancelEdit: () => void;
  category: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuItemType>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const { refetch } = useMenuItemsList({ category: props.category });
  const imageInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
      setImage(files[0]);
    }
  };

  const cancelEdit = () => {
    props.onCancelEdit();
  };

  const onSubmit: SubmitHandler<MenuItemType> = async (data) => {
    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    formData.append("kitchen", "1");

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });

    try {
      await menuItemsPartialUpdate(props.menuItem.id, formData);
      refetch();
      props.onCancelEdit();
      dispatch(modalActions.setIsEditedMenuItem(true));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "10px", display: "none" }}
            ref={imageInputRef}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            style={{ marginBottom: "15px" }}
          >
            Upload Image
          </Button>
          {selectedImage ? (
            <Card sx={{ p: 1 }}>
              <CardMedia
                component="img"
                alt="Selected Image"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  aspectRatio: "1",
                  margin: "0 auto",
                }}
                image={selectedImage}
              />
            </Card>
          ) : props.menuItem.image ? (
            <Card sx={{ p: 1 }}>
              <CardMedia
                component="img"
                alt="Menu Item Image"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  aspectRatio: "1",
                  margin: "0 auto",
                }}
                image={`${BASEURL}/${props.menuItem.image}`}
              />
            </Card>
          ) : null}
          <TextField
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 4 characters long",
              },
              maxLength: {
                value: 50,
                message: "Name must be under 50 characters long",
              },
              validate: {
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value ||
                  "Name cannot include leading or trailing whitespace",
              },
            })}
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            defaultValue={props.menuItem.name}
            autoFocus
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
          <TextField
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 4,
                message: "Description must be at least 4 characters long",
              },
              maxLength: {
                value: 1000,
                message: "Description must be under 1000 characters long",
              },
              validate: {
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value ||
                  "Description cannot include leading or trailing whitespace",
              },
            })}
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            autoComplete="description"
            defaultValue={props.menuItem.description}
            autoFocus
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />
          <TextField
            {...register("price", {
              required: "Price is required",
              validate: {
                isNumber: (value) => {
                  const trimmedValue = value.trim();
                  return (
                    (!isNaN(trimmedValue) && trimmedValue === value) ||
                    "Price must be a number without whitespace"
                  );
                },
              },
            })}
            margin="normal"
            fullWidth
            name="price"
            label="Price"
            type="price"
            autoComplete="current-price"
            defaultValue={props.menuItem.price}
            error={!!errors.price}
            helperText={errors.price && errors.price.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              {...register("category", {
                required: "Category is required",
              })}
              label="Category"
              error={!!errors.category}
              defaultValue={props.menuItem.category}
            >
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="meat">Meat</MenuItem>
              <MenuItem value="seafood">Seafood</MenuItem>
              <MenuItem value="vegetables">Vegetables</MenuItem>
              <MenuItem value="pasta">Pasta</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                {...register("isAvailable")}
                onChange={(e) => setValue("isAvailable", e.target.checked)}
                defaultChecked={props.menuItem.isAvailable}
              />
            }
            label="Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("isVeg")}
                onChange={(e) => setValue("isVeg", e.target.checked)}
                defaultChecked={props.menuItem.isVeg}
              />
            }
            label="Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("isSpicy")}
                onChange={(e) => setValue("isSpicy", e.target.checked)}
                defaultChecked={props.menuItem.isSpicy}
              />
            }
            label="Spicy"
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" sx={{ my: 3, mx: 2 }}>
              Update
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={cancelEdit}
              sx={{ my: 3, mx: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
