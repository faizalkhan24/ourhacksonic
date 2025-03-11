import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WidgetsModal from "./WidgetsModal";
import AddClient from "./AddClient";
import ClientQuestions from "./ClientQuestions";
import DataTable from "components/table/DataTable";
import EditIcon from "@mui/icons-material/Edit";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
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
  const [industries, setIndustries] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    fetchClients();
    fetchIndustries();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://172.210.67.200:3000/api/clients");
      const data = await response.json();

      const transformedClients = data.map((client) => ({
        id: client.id,
        name: client.client_name,
        email: client.email,
        labels: client.label || [],
        customers: client.customer || [],
        competitors: client.competitor || [],
        industries: client.industry_id || [],
      }));

      setClients(transformedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchIndustries = async () => {
    try {
      const response = await fetch(
        "http://172.210.67.200:3000/api/industry/industries"
      );
      const data = await response.json();

      // Convert industry array into a lookup object
      const industryMap = data.reduce((acc, industry) => {
        acc[industry.ID] = industry.NAME;
        return acc;
      }, {});

      setIndustries(industryMap);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  const handleOpenWidgetsModal = (client) => {
    setSelectedClient(client);
    setModalTitle("Assign Widgets");
    setShowWidgets(true);
    setShowAddClient(false);
    setShowQuestions(false);
    setOpenModal(true);
  };

  const handleOpenAddClientModal = async (client = null) => {
    setModalTitle(client ? "Edit Client" : "Add New Client");
    setShowWidgets(false);
    setShowAddClient(true);
    setShowQuestions(false);

    if (client) {
      try {
        const response = await fetch(
          `http://172.210.67.200:3000/api/clients/${client.id}`
        );
        const data = await response.json();

        setSelectedClient({
          id: data.id,
          client_name: data.client_name, // Changed from 'name'
          email: data.email,
          label: data.label || [], // Match API field names
          customer: data.customer || [],
          competitor: data.competitor || [],
          industry_id: data.industry_id || [],
        });
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    } else {
      setSelectedClient(null);
    }
    setOpenModal(true);
  };
  const handleSaveClient = (clientData) => {
    const transformedClient = {
      id: clientData.id,
      name: clientData.client_name,
      email: clientData.email,
      labels: clientData.label || [],
      customers: clientData.customer || [],
      competitors: clientData.competitor || [],
      industries: clientData.industry_id || [],
    };

    if (clientData.id) {
      setClients(
        clients.map((client) =>
          client.id === transformedClient.id ? transformedClient : client
        )
      );
    } else {
      setClients([...clients, transformedClient]);
    }
    setSelectedClient(null);
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await fetch(`http://172.210.67.200:3000/api/clients/${clientId}`, {
        method: "DELETE",
      });
      setClients(clients.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setConfirmOpen(true);
  };

  const columns = [
    { field: "id", headerName: "Code", width: 200 },
    { field: "name", headerName: "Client Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "customers",
      headerName: "Customers",
      width: 250,
      renderCell: (params) => params.row.customers?.join(", ") || "N/A",
    },
    {
      field: "competitors",
      headerName: "Competitors",
      width: 250,
      renderCell: (params) => params.row.competitors?.join(", ") || "N/A",
    },
    {
      field: "lebal",
      headerName: "Keywords",
      width: 250,
      renderCell: (params) => params.row.labels?.join(", ") || "N/A",
    },
    {
      field: "industries",
      headerName: "Industries",
      width: 250,
      renderCell: (params) =>
        params.row.industries
          .map((id) => industries[id] || `ID ${id}`) // Map industry ID to name
          .join(", ") || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            aria-label="edit"
            sx={{ color: "#FFD700" }}
            onClick={() => handleOpenAddClientModal(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="delete"
            sx={{ color: "#FFD700" }}
            onClick={() => handleDeleteClick(params.row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <Button
            variant="contained"
            sx={{ 
              backgroundColor: "#FFD700", 
              color: "#000",
              '&:hover': { backgroundColor: "#FFE55C" }
            }}
            onClick={() => handleOpenWidgetsModal(params.row)}
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

      <DataTable
        columns={columns}
        rows={clients}
        getRowId={(row) => row.id} // Add this prop
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{modalTitle}</Typography>
          {showWidgets && selectedClient ? (
            <WidgetsModal
              clientId={selectedClient.id}
              onClose={() => setOpenModal(false)}
              onAssignSuccess={(newAssignments) => {
                console.log("Assigned widgets:", newAssignments);
              }}
            />
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
        </Box>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <Box sx={{ ...modalStyle, width: "30%" }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Confirm Delete
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Are you sure you want to delete{" "}
            {clientToDelete ? clientToDelete.name : "this client"}?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={() => setConfirmOpen(false)}
              variant="contained"
              sx={{ backgroundColor: "#FFD700", color: "#000" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteClient(clientToDelete.id);
                setConfirmOpen(false);
              }}
              variant="contained"
              sx={{ backgroundColor: "#FF0000", color: "#000" }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClientsTable;
