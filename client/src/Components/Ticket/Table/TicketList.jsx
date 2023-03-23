import React, { useEffect, useState } from "react";
import moment from "moment";
import {useNavigate} from 'react-router-dom'
import { ticketStatsues } from "../../../utils/constant";
import {
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Collapse,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";

import Ticket from "../../../Services/ticketService";

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  function statusColor(status) {
    if (status === ticketStatsues.open) return "bg-green-400 ";
    if (status === ticketStatsues.close) return "bg-red-500 ";
    if (status === ticketStatsues.blocked) return "bg-slate-300 ";
  }

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row" align="center">
          {row?.title}
        </TableCell>
        <TableCell align="center">{row?.description}</TableCell>
        <TableCell align="center">{row?.ticketPriority}</TableCell>
        <TableCell align="center" className={` ${statusColor(row?.status)}`}>
          {row?.status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className="flex">
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <span className="font-bold">ID</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">Reporter</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">Assigneed</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="font-bold">Created At</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="font-bold">Updated At</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{row?._id}</TableCell>
                    <TableCell align="left">{row?.reporter}</TableCell>
                    <TableCell align="left">{row?.assignee}</TableCell>
                    <TableCell align="right">
                      {moment(row?.createdAt, moment.ISO_8601).format(
                        "DD/MM/YYYY"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row?.updatedAt, moment.ISO_8601).format(
                        "DD/MM/YYYY"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  return (
    <>
      {tickets && tickets.length === 0 ? (
        <section className="bg-white h-1/2 rounded-lg shadow-gray-900 shadow-md flex justify-center items-center">
          <button className="bg-yellow-400 border-white rounded-lg font-semibold hover:text-white hover:bg-gray-900 py-5 px-8" onClick={()=> navigate('/createticket')}>
            Create Ticket
          </button>
        </section>
      ) : (
        <section>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Ticket Priority</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ticket) => (
                    <Row key={ticket?._id} row={ticket} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={tickets.length}
            className="bg-white"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </section>
      )}
    </>
  );
};

export default TicketList;
