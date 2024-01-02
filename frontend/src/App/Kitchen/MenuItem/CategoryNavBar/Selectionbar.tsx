import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const labels = ["Soup", "Meat", "Seafood", "Vegetables", "Pasta"];
const categories = ["soup", "meat", "seafood", "vegetables", "pasta"];

export default function Selectionbar(props: {
  handleCategoryChange: (category: string) => void;
}) {
  const [category, setCategory] = useState("soup");

  const handleChange = (event) => {
    props.handleCategoryChange(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ width: "70%", margin: " 20px auto" }}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Category"
        onChange={handleChange}
      >
        {categories.map((category, index) => (
          <MenuItem key={category} value={category}>
            {labels[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
