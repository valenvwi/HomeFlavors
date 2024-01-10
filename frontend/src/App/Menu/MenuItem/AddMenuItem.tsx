import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { MenuItemType } from "../../types/menuItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { menuItemsCreate, useMenuItemsList } from "../../../../api";
import { useRef, useState } from "react";
import { labels, categories } from "../../Utils/constants";
import { useAppDispatch } from "../../store/root";
import { modalActions } from "../../store/modal";
import {
  CenterFlexBox,
  ContainedButton,
  FullWidthTextField,
} from "../../../components";
import { lgImgStyle } from "../../../components/imgStyle";

export default function AddMenuItem(props: {
  ontoggleAddMenuItem: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuItemType>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const { refetch } = useMenuItemsList();
  const [showImageError, setShowImageError] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    imageInputRef.current?.click();
  };

  const cancelAddMenuItem = () => {
    props.ontoggleAddMenuItem();
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
      setShowImageError(false);
    }
  };

  const onSubmit: SubmitHandler<MenuItemType> = async (data) => {
    const formData = new FormData();
    if (!selectedImage) {
      setShowImageError(true);
      return;
    }

    formData.append("image", image);
    formData.append("kitchen", "1");
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });

    await menuItemsCreate(formData);
    refetch();
    props.ontoggleAddMenuItem();
    window.scrollTo(0, 0);
    dispatch(modalActions.setIsCreatedMenuItem(true));
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
          <ContainedButton
            onClick={handleButtonClick}
            style={{ marginBottom: "15px" }}
          >
            Upload Image
          </ContainedButton>
          {selectedImage && (
            <Card sx={{ p: 1 }}>
              <CardMedia
                component="img"
                alt="Selected Image"
                style={lgImgStyle}
                image={selectedImage}
              />
            </Card>
          )}

          {showImageError && (
            <Typography sx={{ color: "#d32f2f", fontSize: "0.75rem", mx: 1 }}>
              Please select an image
            </Typography>
          )}
          <FullWidthTextField
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
            id="name"
            label="Name"
            autoComplete="name"
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            autoFocus
          />
          <FullWidthTextField
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
            id="description"
            label="Description"
            autoComplete="description"
            multiline
            rows={5}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />
          <FullWidthTextField
            {...register("price", {
              required: "Price is required",
              validate: {
                isNumber: (value) => {
                  const trimmedValue = value.trim();
                  return (
                    (!isNaN(trimmedValue) && trimmedValue === value) ||
                    "Price must be a number without leading or trailing whitespace"
                  );
                },
              },
            })}
            name="price"
            label="Price"
            type="price"
            autoComplete="current-price"
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
              defaultValue={"soup"}
              error={!!errors.category}
            >
              {labels.map((label, index) => (
                <MenuItem value={categories[index]} key={label}>
                  {label}
                </MenuItem>
              ))}
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
          <CenterFlexBox>
            <ContainedButton type="submit" sx={{ my: 3, mx: 2 }}>
              Add
            </ContainedButton>
            <ContainedButton
              type="button"
              onClick={cancelAddMenuItem}
              sx={{ my: 3, mx: 2 }}
            >
              Cancel
            </ContainedButton>
          </CenterFlexBox>
        </Box>
      </Box>
    </Container>
  );
}
