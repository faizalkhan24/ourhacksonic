import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Modal,
  Grid,
  Switch,
} from "@mui/material";

// Sample client data
const clientsData = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
  { id: 3, name: "Client C" },
];

// Sample widgets data
const initialWidgets = [
  { id: 101, name: "Analytics", enabled: false },
  { id: 102, name: "Reports", enabled: true },
  { id: 103, name: "Notifications", enabled: false },
  { id: 104, name: "Settings", enabled: true },
  { id: 105, name: "Users", enabled: false },
  { id: 106, name: "Payments", enabled: true },
  { id: 107, name: "Logs", enabled: false },
];

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#000",
  border: "2px solid #FFD700",
  boxShadow: 24,
  p: 4,
  color: "#FFD700",
  borderRadius: 2,
};

const ClientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showWidgets, setShowWidgets] = useState(false);
  const [widgets, setWidgets] = useState(initialWidgets);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Toggle widget state
  const handleToggleWidget = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  // Open modal for Widgets
  const handleOpenWidgetsModal = () => {
    setModalTitle("Manage Widgets");
    setShowWidgets(true);
    setOpenModal(true);
  };

  // Open modal for Questions
  const handleOpenQuestionsModal = () => {
    setModalTitle("Client Questions");
    setShowWidgets(false);
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#FFD700",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, color: "#FFD700" }}>
        Clients List
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden", backgroundColor: "#000", border: "2px solid #FFD700" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="clients table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#FFD700", backgroundColor: "#000", border: "1px solid #FFD700" }}>
                  Client Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#FFD700", backgroundColor: "#000", border: "1px solid #FFD700" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow key={client.id} hover sx={{ borderBottom: "1px solid #FFD700" }}>
                    <TableCell sx={{ color: "#FFD700", border: "1px solid #FFD700" }}>{client.name}</TableCell>
                    <TableCell align="right" sx={{ border: "1px solid #FFD700" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFD700",
                          color: "#000",
                          "&:hover": { backgroundColor: "#E6C200" },
                          marginRight: 1,
                        }}
                        onClick={handleOpenWidgetsModal}
                      >
                        Widgets
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#FFD700",
                          color: "#FFD700",
                          "&:hover": { borderColor: "#E6C200", color: "#E6C200" },
                        }}
                        onClick={handleOpenQuestionsModal}
                      >
                        Show Questions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: "#FFD700" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clientsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{modalTitle}</Typography>

          {/* Conditionally render widgets */}
          {showWidgets ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {widgets.map((widget) => (
                <Grid item xs={12} sm={6} key={widget.id}>
                  <Paper
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#000",
                      border: "1px solid #FFD700",
                    }}
                  >
                    <Typography>{widget.name}</Typography>
                    <Switch
                      checked={widget.enabled}
                      onChange={() => handleToggleWidget(widget.id)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#FFD700 !important",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#FFD700 !important",
                        },
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ mt: 2 }}>Client-specific questions go here.</Typography>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              marginTop: 3,
              width: "100%",
              "&:hover": { backgroundColor: "#E6C200" },
            }}
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClientsTable;
