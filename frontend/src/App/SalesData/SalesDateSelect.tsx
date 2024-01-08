import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function SalesDateSelect(props: {
  onSetDate: (startDate: string, endDate: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];

  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);
  const thisWeekString = thisWeek.toISOString().split("T")[0];

  const thisMonth = new Date(today);
  thisMonth.setDate(thisMonth.getDate() - 30);
  const thisMonthString = thisMonth.toISOString().split("T")[0];

  const handleChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    setSelectedDate(value);

    switch (value) {
      case 0:
        props.onSetDate(todayString, todayString);
        break;
      case 1:
        props.onSetDate(yesterdayString, yesterdayString);
        break;
      case 2:
        props.onSetDate(thisWeekString, todayString);
        break;
      case 3:
        props.onSetDate(thisMonthString, todayString);
        break;
      default:
        break;
    }
  };

  return (
    <FormControl sx={{ py: 2 }}>
      <InputLabel id="demo-simple-select-label">Select Date</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedDate}
        label="Date"
        onChange={handleChange}
        sx={{ fontSize: "14px" }}
      >
        <MenuItem value={0}>Today</MenuItem>
        <MenuItem value={1}>Yesterday</MenuItem>
        <MenuItem value={2}>Last 7 Days</MenuItem>
        <MenuItem value={3}>Last 30 Days</MenuItem>
      </Select>
    </FormControl>
  );
}
