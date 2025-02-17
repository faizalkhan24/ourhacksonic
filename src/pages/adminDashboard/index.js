import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Switch,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClientSelector from "sections/adminDashboard/dashboard/ClientSelector";

const clientsData = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
];

const widgetsData = [
  { id: 102, name: "Analytics", enabled: false },
  { id: 103, name: "Reports", enabled: true },
  { id: 104, name: "Notifications", enabled: false },
  { id: 105, name: "Settings", enabled: true },
  { id: 106, name: "Users", enabled: false },
  { id: 107, name: "Payments", enabled: true },
  { id: 108, name: "Logs", enabled: false },
];


const AdminDashboard = () => {

  const [selectedClient, setSelectedClient] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [showConfig, setShowConfig] = useState(false);

  const handleClientChange = (client) => {
    setSelectedClient(client);
    setWidgets([...widgetsData]);
    setShowConfig(true);
  };

  const handleToggleWidget = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId
          ? { ...widget, enabled: !widget.enabled }
          : widget
      )
    );
  };

  const handleCloseConfig = () => {
    setShowConfig(false);
    setSelectedClient(null); // Reset dropdown selection
  };


  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100%",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Client Selector */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
          Select a Client:
        </Typography>
        <Paper
          sx={{
            padding: 1,
            backgroundColor: "#000",
            color: "#FFD700",
            border: "1px solid #FFD700",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          <ClientSelector
            clients={clientsData}
            selectedClient={selectedClient}
            onClientChange={handleClientChange}
          />
        </Paper>
      </Box>

      {/* Widget Configuration Box (Appears Below) */}
      {showConfig && (
        <Box
          sx={{
            marginTop: 3,
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))",
            color: "white",
            padding: 3,
            borderRadius: 2,
            minWidth: 400,
            maxWidth: 500,
            border: "2px solid white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Box
              sx={{
                width: 8,
                height: 20,
                backgroundColor: "#FFD700",
                marginRight: 1,
              }}
            />
            <Typography variant="h6">
              Configure Widgets for {selectedClient?.name}
            </Typography>
            <IconButton
              onClick={handleCloseConfig}
              sx={{ color: "white", marginLeft: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Scrollable Widget List with Yellow Scrollbar */}
          <Box
            sx={{
              maxHeight: "50vh",
              overflowY: "auto",
              paddingRight: 1,
              scrollbarWidth: "thin",
              scrollbarColor: "#FFD700 rgba(255, 215, 0, 0.2)", // Yellow scrollbar
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#FFD700", // Yellow scrollbar thumb
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(255, 215, 0, 0.2)", // Faint yellow background
              },
            }}
          >
            <List>
              {widgets.map((widget) => (
                <ListItem key={widget.id}>
                  <ListItemText primary={widget.name} />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={widget.enabled}
                      onChange={() => handleToggleWidget(widget.id)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#FFD700 !important",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#FFD700 !important",
                          },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Save Button */}
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%", bgcolor: "#FFD700", color: "#000" }}
            onClick={handleCloseConfig}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default AdminDashboard