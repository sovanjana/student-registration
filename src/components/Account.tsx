import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { useStateMachine } from "little-state-machine";
import { updateStore } from "../action";
import {
  Box,
  Container,
  Typography,
  Paper,
  Theme,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import { format } from "date-fns";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
  degree: string;
  skills: string;
  yearOfExp: string;
  password: string;
  confirmPassword: string;
}
export interface IUserWithId extends IUser {
  id: string;
}

export default function Account(props: RouteComponentProps<{ id: string }>) {
  const { id } = props;
  const {
    state: {
      store: { students, loggedInUserId },
    },
  } = useStateMachine(updateStore);

  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  useEffect(() => {
    if (students && Object.keys(students)?.length) {
      const user = id && students[id];
      setUserDetails(user);
    }
  }, [userDetails, students, loggedInUserId]);

  if (!userDetails) {
    return (
      <Typography color="primary" variant="body1">
        Loading...
      </Typography>
    );
  } else {
    return (
      <AccountContainer>
        <StyledPaper elevation={6} square>
          <Heading color="primary" variant="h5" align="center" gutterBottom>
            Account Details
          </Heading>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <LabelValue label="Name" value={userDetails?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelValue label="Email" value={userDetails?.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelValue label="Phone No." value={userDetails?.phone} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelValue
                label="Date of Birth"
                value={format(new Date(userDetails?.dob), "dd MMMM, yyyy")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <LabelValue label="Address" value={userDetails?.address} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <LabelValue
                label="Degree of Graduation"
                value={userDetails?.degree}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelValue label="Skills" value={userDetails?.skills} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelValue
                label="Year of Experience"
                value={`${userDetails?.yearOfExp} ${
                  parseInt(userDetails?.yearOfExp) > 1 ? "yrs." : "yr"
                }`}
              />
            </Grid>
          </Grid>
        </StyledPaper>
      </AccountContainer>
    );
  }
}

const LabelValue = (props: { label: string; value: string }) => {
  return (
    <Box marginBottom="16px">
      <Label variant="subtitle2" color="primary">
        {props.label}
      </Label>
      <Value variant="body2" color="textSecondary">
        {props.value}
      </Value>
    </Box>
  );
};

const Heading = styled(Typography)`
  border-bottom: 1.5px solid;
  width: inherit;
  padding-bottom: 24px;
`;
const StyledPaper = styled(Paper)`
  max-width: 520px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props: { theme: Theme }) => `
    padding: ${props.theme.spacing(3)}px;
    margin: ${props.theme.spacing(2)}px;
  `}
`;
const Value = styled(Typography)``;
const Label = styled(Typography)`
  text-transform: uppercase;
`;
const AccountContainer = styled(Box)`
  height: var(--main-content-height);
  align-items: center;
  justify-content: center;
  display: flex;
`;
