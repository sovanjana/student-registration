import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";

export default function CustomTextField(props: TextFieldProps) {
  const { fullWidth, variant, ...rest } = props;

  return <TextField fullWidth margin="normal" variant="outlined" {...rest} />;
}
