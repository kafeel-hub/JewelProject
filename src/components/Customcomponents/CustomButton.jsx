import { useMemo } from "react";

// import {
//   StyledPrimaryButton,
//   StyledSecondaryButton,
//   StyledPositiveButton,
//   StyledNegetiveButton,
//   StyledMoreButton,
// } from "@components/ui/Button";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledPositiveButton,
  StyledNegetiveButton,
  StyledMoreButton,
} from "../Ui/Button";
const CustomButton = ({
  variant = "primary",
  size = "md",
  label,
  sx,
  ...props
}) => {
  const buttonVariants = {
    primary: StyledPrimaryButton,
    positive: StyledPositiveButton,
    negative: StyledNegetiveButton,
    more: StyledMoreButton,
    secondary: StyledSecondaryButton,
  };

  const Button = useMemo(
    () => buttonVariants[variant] || StyledPrimaryButton,
    [variant]
  );

  return (
    <Button
      {...props}
      sx={{
        padding: size == "xs" ? "4px 18px" : "8px 22px",
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
