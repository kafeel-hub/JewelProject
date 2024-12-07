import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomDropdown = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  options = [],
  size = "small",
  menuHeight = 300,
  variant = "outlined",
  sx,
  helperText,
  error,
  limitTags = 1,
  callFilterAction = async (value) => {},
  renderInput = (params) => (
    <TextField
      {...params}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
    />
  ),
  getOptionLabel = (option) => option.label,
  isOptionEqualToValue = (option, value) => option.label === value.label,
  renderOption = (props, option) => (
    <li {...props} key={option.id || option.value}>
      {option.label}
    </li>
  ),
  multiselect = false,
  ...props
}) => {
  const [searchText, setSearchText] = useState("");

  // Search with debounce
  useEffect(() => {
    const debounce = setTimeout(() => {
      // if (searchText !== undefined) {
      if (callFilterAction) callFilterAction(searchText);
      // }
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText]);

  return (
    <Autocomplete
      id={id}
      size={size}
      value={value}
      options={options}
      variant={variant}
      multiple={multiselect}
      limitTags={limitTags == -1 ? undefined : limitTags}
      getOptionLabel={getOptionLabel}
      onInputChange={(e, val) => setSearchText(val)}
      PaperComponent={(props) => (
        <Paper
          {...props}
          elevation={1}
          sx={{
            my: "6px",
            "::-webkit-scrollbar": {
              display: "none",
            },
            maxHeight: menuHeight,
            scrollbarWidth: "none",
            borderRadius: (theme) => theme.palette.borderRadius_sm,
          }}
        />
      )}
      sx={{
        ".MuiOutlinedInput-root": {
          borderRadius: (theme) => theme.palette.borderRadius_sm,
        },
        ".MuiInputLabel-root": {
          fontSize: "14px",
        },
        ".MuiAutocomplete-input": {
          fontSize: "14px",
        },
        ".MuiAutocomplete-tag": {
          maxWidth: "100px",
        },
        ...sx,
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={renderInput}
      renderOption={renderOption}
      onChange={onChange}
      disablePortal
      {...props}
    />
  );
};

export default CustomDropdown;
