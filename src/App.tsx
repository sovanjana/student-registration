import React from "react";
import { Container } from "@material-ui/core";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  Theme,
} from "@material-ui/core/styles";
import { Router, Redirect } from "@reach/router";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import Login from "./components/Signin";
import Signup from "./components/Signup";
import Topnav from "./components/Topnav";
import Account from "./components/Account";
import Admin from "./components/Admin";

import "./styles.css";

createStore({
  store: {
    students: {},
    loggedInUserId: null,
  },
});

export default function App() {
  return (
    <StateMachineProvider>
      {/* <DevTool /> */}
      <AppThemeProvider>
        <AppContainer maxWidth="xl" disableGutters>
          <Topnav />
          <Content>
            <Router primary={false} component={React.Fragment}>
              <Redirect from="/" to="login" />
              <Login path="login" />
              <Signup path="signup" />
              <Account path="account/:id" />
              <Admin path="admin" />
            </Router>
          </Content>
        </AppContainer>
      </AppThemeProvider>
    </StateMachineProvider>
  );
}

// DEVNOTE: initialize default theme...
const defaultTheme = createMuiTheme();

function AppThemeProvider(props: { children: React.ReactNode; theme?: Theme }) {
  const themeWithDefault = Object.assign({}, defaultTheme, props.theme);

  return (
    <StyledThemeProvider theme={themeWithDefault}>
      <MuiThemeProvider theme={themeWithDefault}>
        {props.children}
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
}

const Content = styled.main`
  min-height: var(--main-content-height);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.palette.primary.light};
  }
`;
const AppContainer = styled(Container)`
  height: var(--app-height);
  position: relative;
`;
