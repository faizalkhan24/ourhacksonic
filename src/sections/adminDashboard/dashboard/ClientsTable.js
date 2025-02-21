import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import WidgetsModal from "./WidgetsModal";
import AddClient from "./AddClient";
import ClientQuestions from "./ClientQuestions";
import DataTable from "components/table/DataTable";

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
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showWidgets, setShowWidgets] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenWidgetsModal = () => {
    setModalTitle("Manage Widgets");
    setShowWidgets(true);
    setShowAddClient(false);
    setShowQuestions(false);
    setOpenModal(true);
  };

  const handleOpenQuestionsModal = (client) => {
    setShowWidgets(false);
    setShowAddClient(false);
    setShowQuestions(true);
    setSelectedClient(client);
    setOpenModal(true);
  };

  const handleOpenAddClientModal = (client = null) => {
    setModalTitle(client ? "Edit Client" : "Add New Client");
    setShowWidgets(false);
    setShowAddClient(true);
    setShowQuestions(false);
    setSelectedClient(client);
    setOpenModal(true);
  };

  const handleSaveClient = (clientData) => {
    if (selectedClient) {
      setClients(
        clients.map((client) =>
          client.id === clientData.id ? clientData : client
        )
      );
    } else {
      setClients([...clients, { id: clients.length + 1, ...clientData }]);
    }
    setSelectedClient(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Client Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000", marginRight: 1 }}
            onClick={() => handleOpenAddClientModal(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000", marginRight: 1 }}
            onClick={() => handleOpenQuestionsModal(params.row)}
          >
            Questions
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000" }}
            onClick={handleOpenWidgetsModal}
          >
            Widgets
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#FFD700",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Clients List
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#FFD700", color: "#000", marginBottom: 2 }}
        onClick={() => handleOpenAddClientModal()}
      >
        Add Client
      </Button>

      <DataTable columns={columns} rows={clients} />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{modalTitle}</Typography>
          {showWidgets ? (
            <WidgetsModal />
          ) : showAddClient ? (
            <AddClient
              onClose={() => setOpenModal(false)}
              onSaveClient={handleSaveClient}
              existingClient={selectedClient}
            />
          ) : showQuestions && selectedClient ? (
            <ClientQuestions
              client={selectedClient}
              onClose={() => setOpenModal(false)}
            />
          ) : (
            <Typography sx={{ mt: 2 }}>No content available.</Typography>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              marginTop: 3,
              width: "100%",
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
