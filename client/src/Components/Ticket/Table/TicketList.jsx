import React, { useEffect, useState } from "react";
import moment from 'moment'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

import Ticket from "../../../Services/ticketService";
const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const ticketsGet = async () => {
    const result = await Ticket.getTicket({
      accessToken: Cookies.get("x-access-token"),
    });
    console.log("tickets", result?.data);

    if (result) {
      if (result.status === 200) {
        setTickets(() => result.data.tickets);
        return;
      }
    }

    if (result.response) {
      console.log("error", result.response.data.message);

      throw new Error(result.response.data.message);
    }
  };
  useEffect(() => {
    ticketsGet();
    console.log("Ticket got.");
  }, []);
  /* add moment module on createdAt updatedAt */

  return (
    <>
      <section>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Ticket Priority</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets &&
                tickets.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?._id}
                    </TableCell>
                    <TableCell>{row?.title}</TableCell>
                    <TableCell>{row?.description}</TableCell>
                    <TableCell>{row?.ticketPriority}</TableCell>
                    <TableCell>{row?.reporter}</TableCell>
                    <TableCell>{row?.assignee}</TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell> {moment(row?.createdAt, moment.ISO_8601).format("DD/MM/YYYY")}</TableCell>
                    <TableCell> {moment(row?.updatedAt, moment.ISO_8601).format("DD/MM/YYYY")}</TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default TicketList;
