import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { SyntheticEvent } from "react";

const labels = [
  "Soup",
  "Noodles Soup",
  "Chicken",
  "Beef",
  "Seafood",
  "Vegetables",
  "Pasta",
];

const categories = [
  "soup",
  "noodles soup",
  "chicken",
  "beef",
  "seafood",
  "vegetables",
  "pasta",
];

export default function Tabbar(props: {
  handleCategoryChange: (category: string) => void;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="scrollable tabs"
      sx={{ margin: "0 auto"}}
    >
      {labels.map((label, index) => (
        <Tab
          label={label}
          key={index}
          onClick={() => props.handleCategoryChange(categories[index])}
        />
      ))}
    </Tabs>
  );
}
