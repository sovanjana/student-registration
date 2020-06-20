import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Icon, TextFieldProps } from "@material-ui/core";

export default function CustomPasswordField(props: TextFieldProps) {
  const { required, fullWidth, autoComplete, InputProps, type, variant, ...rest } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="password"
      type={showPassword ? "text" : "password"}
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <Icon>{showPassword ? "visibility" : "visibility_off"}</Icon>
            </IconButton>
          </InputAdornment>
        ),
			}}
			{...rest}
    />
  );
}
