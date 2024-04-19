import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Grid, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useRef } from "react";
import moment from "moment-jalaali";

const SearchProductionDateFilter = () => {
  const [calendarType, setCalendarType] = useState("EN");
  const test1 = useRef();
  const test2 = useRef();
  const getInitialDates = (calendarType) => {
    const startDate = calendarType === "EN" ? 1990 : 1370;
    const endDate = calendarType === "EN" ? 2020 : 1395;
    return [startDate, endDate];
  };

  const getMarks = (calendarType) => {
    const startYear = calendarType === "EN" ? 1900 : 1300;
    const endYear = calendarType === "EN" ? 2024 : 1403;
    return [
      { value: startYear, label: calendarType === "EN" ? "1900" : "1300" },
      { value: endYear, label: calendarType === "EN" ? "2024" : "1403" },
    ];
  };

  const [selectedDates, setSelectedDates] = useState(
    getInitialDates(calendarType)
  );
  const marks = getMarks(calendarType);

  useEffect(() => {
    setSelectedDates(getInitialDates(calendarType));
  }, [calendarType]);

  const handleInputChange = (e, index) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue.toString().length > 4) {
      newValue = "";
    }
    if (calendarType === "EN" && newValue > 2024) {
      newValue = 2024;
    }
    if (calendarType === "IR" && newValue > 1403) {
      newValue = 1403;
    }
    const newDates = [...selectedDates];
    newDates[index] = newValue;
    setSelectedDates(newDates);
    const date = moment(newValue, "jYYYY");
    const timestamp = date.unix();
    console.log(timestamp);
  };

  const handleSliderInput = (e, newValue) => {
    setSelectedDates(newValue);
  };

  const handleCalendarType = (event) => {
    setCalendarType(event.target.value);
    test1.current.value = "";
    test2.current.value = "";
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={calendarType}
              defaultValue={calendarType}
              onChange={handleCalendarType}
            >
              <FormControlLabel
                defaultChecked
                value="EN"
                control={<Radio />}
                label="میلادی"
              />
              <FormControlLabel value="IR" control={<Radio />} label="شمسی" />
            </RadioGroup>
          </FormControl>
          <Box>
            <Slider
              value={selectedDates}
              onChange={handleSliderInput}
              marks={marks}
              valueLabelDisplay="auto"
              min={calendarType === "EN" ? 1900 : 1300}
              max={calendarType === "EN" ? 2024 : 1402}
            />
          </Box>
          <Box className={"border"}>
            <TextField
              variant="filled"
              value={selectedDates[0]}
              onChange={(e) => handleInputChange(e, 0)}
              inputRef={test1}
            />
            <TextField
              variant="filled"
              value={selectedDates[1]}
              onChange={(e) => handleInputChange(e, 1)}
              inputRef={test2}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchProductionDateFilter;
