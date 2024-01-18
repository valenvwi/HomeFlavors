import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { categories, labels } from "../../../Utils/constants";

export default function Tabbar(props: {
  handleCategoryChange: (category: string) => void;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      orientation="horizontal"
      onChange={(event, newValue) => handleChange(newValue)}
      aria-label="scrollable tabs"
      sx={{ margin: "0 auto" }}
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
