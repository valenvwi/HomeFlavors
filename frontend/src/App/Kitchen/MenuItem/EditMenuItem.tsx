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
import { useState } from "react";
import { BASEURL } from "../../../config";

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "120px",
          marginBottom: "120px",
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
          />
          {selectedImage ? (
            <Card>
              <CardMedia
                component="img"
                alt="Selected Image"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  aspectRatio: "1",
                  margin: "0 auto",
                }}
                image={selectedImage}
              />
            </Card>
          ) : props.menuItem.image ? (
            <Card>
              <CardMedia
                component="img"
                alt="Menu Item Image"
                style={{
                  width: "200px",
                  height: "200px",
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
              required: "name is required",
              maxLength: {
                value: 50,
                message: "Name must be under 50 characters long",
              },
            })}
            margin="normal"
            required
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
              required: "description is required",
              minLength: {
                value: 4,
                message: "description must be at least 4 characters long",
              },
            })}
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            autoComplete="description"
            defaultValue={props.menuItem.description}
            autoFocus
            multiline
            rows={5}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />
          <TextField
            {...register("price", {
              required: "price is required",
            })}
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="price"
            autoComplete="current-price"
            defaultValue={props.menuItem.price}
            error={!!errors.price}
            helperText={errors.price && errors.price.message}
          />
          <FormControl fullWidth margin="normal" required>
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

          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Update
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ my: 3 }}
            onClick={cancelEdit}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
