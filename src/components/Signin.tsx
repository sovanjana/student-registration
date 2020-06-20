import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Paper,
  Theme,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import styled from "styled-components";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import CustomTextField from "./wizards/CustomTextField";
import CustomPasswordField from "./wizards/CustomPasswordField";
import { useStateMachine } from "little-state-machine";
import { updateStore } from "../action";
import { Heading, StyledForm } from "./Signup";

export default function Login(props: RouteComponentProps) {
  const {
    state: {
      store: { students, loggedInUserId },
    },
    action,
  } = useStateMachine(updateStore);

  const { control, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedInUserId) {
      setTimeout(() => {
        navigate(`/account/${loggedInUserId}`);
      }, 1500);
    }
  }, [loggedInUserId]);

  const onSubmit = (data: { email: string; password: string }) => {
    setLoading(true);
    if (students && Object.keys(students)?.length) {
      const temp = Object.keys(students).find((key) => {
        if (
          students[key].email === data.email &&
          students[key].password === data.password
        ) {
          return true;
        } else if (students[key].email !== data.email) {
          setError("You are not a registered student. Please sign up first.");
          setLoading(false);
          return false;
        } else if (students[key].password !== data.password) {
          setError("Wrong credentials provided.");
          setLoading(false);
          return false;
        }
      });
      action({ loggedInUserId: temp });
    } else {
      setError("You are not a registered student. Please sign up first.");
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <StyledPaper elevation={6} square>
        <Heading color="primary" variant="h5" align="center">
          Sign In
        </Heading>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={CustomTextField}
            name="email"
            control={control}
            label="Email Address"
            autoFocus
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
            as={CustomPasswordField}
            name="password"
            control={control}
            label="Password"
            rules={{
              required: "Required",
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
                  value
                ) || "Invalid password pattern",
            }}
            helperText={errors?.password?.message}
            error={!!errors?.password}
          />
          {error ? (
            <Typography variant="subtitle2" color="error">
              {error}
            </Typography>
          ) : null}
          <SigninBtn
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Signing In" : "Sign In"}
          </SigninBtn>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Typography variant="caption" color="textPrimary">
              Don't have an account?
            </Typography>
            <SignupLink to="/signup">
              <Typography variant="caption" color="primary">
                Sign Up
              </Typography>
            </SignupLink>
          </Box>
        </StyledForm>
        {loading && <LinearProgress />}
      </StyledPaper>
    </LoginContainer>
  );
}

const SignupLink = styled(Link)`
  margin-left: 8px;
  text-decoration: unset !important;
`;
const SigninBtn = styled(Button)`
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
  display: flex;
  flex-direction: column;
`;
