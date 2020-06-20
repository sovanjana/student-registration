import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { Link, navigate } from "@reach/router";
import { useStateMachine } from "little-state-machine";
import { updateStore } from "../action";

export default function Topnav(props: any) {
  const {
    state: {
      store: { loggedInUserId },
    },
    action,
  } = useStateMachine(updateStore);

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    action({ loggedInUserId: null });
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6">Students Registration</Title>
        <Button component={Link} color="inherit" to="/admin" variant="outlined">
          Admin
        </Button>
        {!loggedInUserId ? (
          <Button component={Link} color="inherit" to="/login">
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

const Title = styled(Typography)`
  flex-grow: 1;
`;
