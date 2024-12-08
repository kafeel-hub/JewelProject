// import { useMemo } from "react";

// // import {
// //   StyledPrimaryButton,
// //   StyledSecondaryButton,
// //   StyledPositiveButton,
// //   StyledNegetiveButton,
// //   StyledMoreButton,
// // } from "@components/ui/Button";
// import {
//   StyledPrimaryButton,
//   StyledSecondaryButton,
//   StyledPositiveButton,
//   StyledNegetiveButton,
//   StyledMoreButton,
// } from "../Ui/Button";
// const CustomButton = ({
//   variant = "primary",
//   size = "md",
//   label,
//   sx,
//   ...props
// }) => {
//   const buttonVariants = {
//     primary: StyledPrimaryButton,
//     positive: StyledPositiveButton,
//     negative: StyledNegetiveButton,
//     more: StyledMoreButton,
//     secondary: StyledSecondaryButton,
//   };

//   const Button = useMemo(
//     () => buttonVariants[variant] || StyledPrimaryButton,
//     [variant]
//   );

//   return (
//     <Button
//       {...props}
//       sx={{
//         padding: size == "xs" ? "4px 18px" : "8px 22px",
//         ...sx,
//       }}
//     >
//       {label}
//     </Button>
//   );
// };

// export default CustomButton;


import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ text, theme, className,variantType,icon=false,type, loading=false ,...props }) => {
  const buttonClass1 = `custom-btn ${theme&& theme.palette.mode === 'dark' ? 'custom-btn-white' : 'custom-btn-black'} shadow-box ${className}`;
  const buttonClass2 = `custom-btn ${theme&& theme.palette.mode === 'dark' ? 'custom-btn-black' : 'custom-btn-white'} shadow-box ${className}`;


  return (
    <Button type={type} className={`${variantType ==="dark"? buttonClass1:buttonClass2}`} {...props}>
      {loading? <>...Loading</>:text}
    </Button>
  );
};

export default CustomButton;

