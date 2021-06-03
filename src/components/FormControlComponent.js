import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FormControlComponent = ({ filterArr, filter, handleChange, label }) => {
  const handleStatusChange = (event) => {
    handleChange(event.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} id={"1"}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter}
        onChange={handleStatusChange}
      >
        <MenuItem value="Select" id={0}>
          Select
        </MenuItem>
        {filterArr.map((result) => (
          <MenuItem value={result} id={result}>
            {result}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormControlComponent;
