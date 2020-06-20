import React from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";
import { useStateMachine } from "little-state-machine";
import { updateStore } from "../action";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  Typography,
  Button,
  Icon,
} from "@material-ui/core";
import { IUser, IUserWithId } from "./Account";

export default function Admin(props: RouteComponentProps) {
  const {
    state: {
      store: { students },
    }, action
  } = useStateMachine(updateStore);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone No.", accessor: "phone" },
  ];

  const getData: (students: { [key: string]: IUser }) => Array<any> = (
    students
  ) => {
    const studentsArr: Array<IUserWithId> = Object.keys(students).map(key => ({id: key, ...students[key]}));
    let temp: Array<any> = [];
    studentsArr.forEach((student) => {
      temp.push({
        name: student?.name,
        email: student?.email,
        phone: student?.phone,
        rowData: student,
      });
    });
    return temp;
  };

  const data = getData(students);

  const handleDelete = (id: string) => {
    const temp = students
    delete temp[id];
    action({students: temp})
  }

  return (
    <AdminContainer>
      <StyledPaper elevation={6} square>
        <Heading color="primary" variant="h5" align="center">
          List of Students
        </Heading>
        <StyledTableContainer>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns?.map((col) => (
                  <TableCell>{col.header}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length ? (
                data?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(row.rowData?.id)}
                        startIcon={<Icon>delete</Icon>}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no_data">
                  <TableCell colSpan={3} align="center">
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledPaper>
    </AdminContainer>
  );
}

const StyledTableContainer = styled(TableContainer)`
  height: calc(100% - 64px);
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
const Heading = styled(Typography)`
  border-bottom: 1.5px solid;
  width: inherit;
  height: 64px !important;
  line-height: 64px !important;
`;
const StyledPaper = styled(Paper)`
  height: 80%;
  width: 100%;
  max-width: 620px;
`;
const AdminContainer = styled(Box)`
  height: var(--main-content-height);
  align-items: center;
  justify-content: center;
  display: flex;
`;
