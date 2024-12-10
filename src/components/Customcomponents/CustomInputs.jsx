import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
// import { DatePicker } from '@mui/x-date-pickers';

const CustomInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    type={type}
    variant="outlined"
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    sx={{
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      marginBottom: "16px",

      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #ccc",
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #ccc !important",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #ccc !important",
        boxShadow: "none !important",
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        backgroundColor: "#f9fafb !important",
      },
    }}
  />
);

const StyledSelect = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
}) => {
  return (
    <StyledSelect fullWidth variant="outlined" sx={{ my: 2 }} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        style={{ borderRadius: "12px", width: "100%" }}
        elevation={1}
      >
        {options &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </StyledSelect>
  );
};

// import { StyledTextField } from '@mui/material';

// const CustomDatePicker = ({
//   label,
//   value,
//   onChange,
//   error,
//   helperText,
//   InputProps,
//   ...props
// }) => {
//   return (
//     <DatePicker
//       {...props}
//       value={value}
//       onChange={onChange}
//       renderInput={(params) => (
//         <StyledTextField
//           {...params}
//           sx={{ my: 2 }}
//           label={label}
//           error={error}
//           helperText={error ? helperText : ''}
//           variant="outlined"
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             ...InputProps,
//             style: {
//               borderRadius: '12px',
//               ...InputProps?.style,
//             },
//           }}
//           className="custom-input-field"
//         />
//       )}
//     />
//   );
// };

const TableInput = ({ label, name, type = "text", value, onChange, error }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (type === "number") {
      const numericValue =
        inputValue === "" || !isNaN(inputValue) ? inputValue : value;
      x;
      onChange({ target: { name, value: numericValue } });
    } else {
      onChange(event);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      variant="outlined"
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      // sx={{
      //   backgroundColor: "#f9fafb",
      //   borderRadius: "8px",
      //   marginBottom: "16px",
      //   "& .MuiOutlinedInput-root": {
      //     borderRadius: "8px",
      //   },
      //   "& .MuiOutlinedInput-notchedOutline": {
      //     border: "1px solid #ccc",
      //   },
      //   "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      //     border: "1px solid #ccc !important",
      //   },
      //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      //     {
      //       border: "1px solid #ccc !important",
      //       boxShadow: "none !important",
      //     },
      //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      //     {
      //       border: "1px solid #ccc !important",
      //       boxShadow: "none !important",
      //     },
      //   "& .MuiOutlinedInput-root.Mui-focused": {
      //     backgroundColor: "#f9fafb !important",
      //   },
      // }}
    />
  );
};

export { CustomInput, CustomSelect, TableInput };
