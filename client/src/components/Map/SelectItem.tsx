import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

type ITime = {
  value: number;
  label: string;
};

const visitTimes: ITime[] = [
  { value: 0, label: "None" },
  { value: 15, label: "15 mins" },
  { value: 30, label: "30 mins" },
  { value: 45, label: "45 mins" },
  { value: 60, label: "60 mins" },
];

type Props = {
  dotNum: string;
  visitTime: string;
  calculated: boolean;
  indexItem: number;
  realTime: string;
  sumTime: string;
  mode: string;
  markers: IMarker[];
  handleChange: (index: number, field: string, value: string) => void;
  handleChangeMode: (value: string) => void;
};

const SelectItem: React.FC<Props> = ({
  dotNum,
  visitTime,
  calculated,
  indexItem,
  realTime,
  sumTime,
  mode,
  markers,
  handleChange,
  handleChangeMode,
}) => {
  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChangeMode((event.target as HTMLInputElement).value);
  };
  const onChange =
    (indexItem: number) =>
    (e: SelectChangeEvent): void => {
      handleChange(indexItem, e.target.name, e.target.value);
    };

  return (
    <Grid container spacing={2}>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <FormControl variant="standard" sx={{ maxWidth: 110 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="index_num"
            value={dotNum}
            onChange={onChange(indexItem)}
            label="Title"
          >
            {markers.map((marker: IMarker, index: number) => (
              <MenuItem key={index} value={index}>
                {marker.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <FormControl variant="standard" sx={{ maxWidth: 110, minWidth: 90 }}>
          <InputLabel id="demo-simple-select-standard-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="time"
            value={visitTime}
            onChange={onChange(indexItem)}
            label="Time"
          >
            {visitTimes.map((timeItem: ITime, t_index: number) => (
              <MenuItem key={t_index} value={timeItem.value}>
                {timeItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={6}>
        {calculated && indexItem > 0 && markers.length > 0 && (
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6} sx={{ maxWidth: 120 }}>
              <TextField
                label="Travel Time"
                type="text"
                value={realTime}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <TextField
                label="Sum Time"
                type="text"
                value={sumTime}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item lg={12} md={12} sm={6} xs={6} sx={{ mt: 2 }}>
        {calculated && indexItem > 0 && markers.length === 2 && (
          <>
            <FormControl sx={{ float: "left" }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ fontSize: 15 }}
              >
                Travel Mode
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={mode}
                onChange={onChangeMode}
              >
                <FormControlLabel
                  value="driving"
                  control={<Radio />}
                  label="Driving"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectItem;
