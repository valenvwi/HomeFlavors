import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { menuItemsCreate } from "../../../../api";
import { useState } from "react";

export default function AddMenuItem() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuItemType>();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<MenuItemType> = (data) => {
    menuItemsCreate(data);
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
            {...register("image", { required: "Image is required" })}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <Card>
              <CardMedia
                component="img"
                alt="Selected Image"
                height="200px"
                image={selectedImage}
              />
            </Card>
          )}
          <TextField
            {...register("name", {
              required: "name is required",
            })}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
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
            >
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="noodlesSoup">Noodles Soup</MenuItem>
              <MenuItem value="chicken">Chicken</MenuItem>
              <MenuItem value="beef">Beef</MenuItem>
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
                defaultChecked
              />
            }
            label="Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("isVeg")}
                onChange={(e) => setValue("isVeg", e.target.checked)}
              />
            }
            label="Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("isSpicy")}
                onChange={(e) => setValue("isSpicy", e.target.checked)}
              />
            }
            label="Spicy"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
