import React from "react";
import {
  Typography,
  Button,
  Paper,
  Theme,
  Box,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import { RouteComponentProps, navigate } from "@reach/router";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CustomPasswordField from "./wizards/CustomPasswordField";
import CustomTextField from "./wizards/CustomTextField";
import { useStateMachine } from "little-state-machine";
import { updateStore } from "../action";

export default function Signup(_props: RouteComponentProps) {
  const {
    state: {
      store: { students },
    },
    action,
  } = useStateMachine(updateStore);
  const {
    control,
    handleSubmit,
    watch,
    errors,
    getValues,
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    const id = Date.now();
    let temp = students;
    temp[id] = data;
    action({ students: temp });
    navigate("/login");
  };

  const dob = watch("dob");

  return (
    <LoginContainer>
      <StyledPaper elevation={6} square>
        <Heading color="primary" variant="h5" align="center">
          Sign Up
        </Heading>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={CustomTextField}
            name="name"
            control={control}
            label="Fullname"
            autoFocus
            rules={{
              required: "Required",
            }}
            helperText={errors?.name?.message}
            error={!!errors?.name}
          />
          <Controller
            as={CustomTextField}
            name="email"
            control={control}
            label="Email Address"
            rules={{
              required: "Required",
              validate: (value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                "Invalid email",
            }}
            helperText={errors?.email?.message}
            error={!!errors?.email}
          />
          <Controller
            as={CustomTextField}
            name="phone"
            control={control}
            label="Phone No."
            rules={{
              required: "Required",
              validate: (value) =>
                /^(\+\d{1,3}[- ]?)?\d{10}$|^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(
                  value
                ) || "Invalid phone no",
            }}
            helperText={errors?.phone?.message}
            error={!!errors?.phone}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={DatePicker}
              name="dob"
              control={control}
              autoOk
              disableFuture
              variant="inline"
              format="dd MMM yyyy"
              label="Date Of Birth"
              value={dob}
              defaultValue={null}
              inputVariant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon color="action">calendar_today</Icon>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
              rules={{
                required: "Required",
              }}
              helperText={errors?.dob?.message}
              error={!!errors?.dob}
            />
          </MuiPickersUtilsProvider>
          <Controller
            as={CustomTextField}
            name="address"
            control={control}
            label="Address"
            rules={{
              required: "Required",
            }}
            helperText={errors?.address?.message}
            error={!!errors?.address}
          />
          <Controller
            as={CustomTextField}
            name="degree"
            control={control}
            label="Degree of Graduation"
            rules={{
              required: "Required",
            }}
            helperText={errors?.degree?.message}
            error={!!errors?.degree}
          />
          <Controller
            as={CustomTextField}
            name="skills"
            control={control}
            label="Skills"
            rules={{
              required: "Required",
            }}
            helperText={
              errors?.skills?.message ?? "You can select multiple skills"
            }
            error={!!errors?.skills}
          />
          <Controller
            as={CustomTextField}
            name="yearOfExp"
            control={control}
            label="Year of Experience"
            rules={{
              required: "Required",
            }}
            helperText={errors?.yearOfExp?.message}
            error={!!errors?.yearOfExp}
          />
          <Controller
            as={CustomPasswordField}
            name="password"
            control={control}
            label="Password"
            rules={{
              required: "Required",
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
                  value
                ) || "Password is not sufficient. Follow the pattern",
            }}
            helperText={errors?.password?.message}
            error={!!errors?.password}
          />
          <Controller
            as={CustomPasswordField}
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            rules={{
              required: "Please confirm your new password.",
              validate: (value) =>
                value === getValues("password") || "Password does not match",
            }}
            helperText={errors?.confirmPassword?.message}
            error={!!errors?.confirmPassword}
          />
          <Typography variant="caption" color="textSecondary">
            **Make sure the password is atleast 8 characters long and contains
            atleast 1 letter, 1 number and 1 special character
          </Typography>
          <SignupBtn
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </SignupBtn>
        </StyledForm>
      </StyledPaper>
    </LoginContainer>
  );
}

export const StyledForm = styled.form`
  height: calc(100% - 64px);
  overflow: auto;
  padding: 24px 16px 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.palette.primary.light};
  }
`;
export const Heading = styled(Typography)`
  border-bottom: 1.5px solid;
  width: inherit;
  height: 64px !important;
  line-height: 64px !important;
`;
const SignupBtn = styled(Button)`
  margin-top: ${(props: { theme: Theme }) =>
    props.theme.spacing(2)}px !important;
`;
const LoginContainer = styled(Box)`
  height: var(--main-content-height);
  align-items: center;
  justify-content: center;
  display: flex;
`;
const StyledPaper = styled(Paper)`
  max-width: 420px;
  max-height: 550px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.palette.primary.light};
  }
`;
