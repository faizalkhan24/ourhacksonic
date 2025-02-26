import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid, Stack, Chip } from "@mui/material";

const AddClient = ({ onClose, onSaveClient, existingClient }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [customers, setCustomers] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [labels, setLabels] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    if (existingClient) {
      setClientName(existingClient.name);
      setClientEmail(existingClient.email);
      setCustomers(existingClient.customers || []);
      setCompetitors(existingClient.competitors || []);
      setLabels(existingClient.labels || []);
      setIndustries(existingClient.industries || []);
    }
  }, [existingClient]);

  // Function to handle Chip addition
  const handleAddChip = (field, event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value) {
        if (field === "customers") setCustomers([...customers, value]);
        if (field === "competitors") setCompetitors([...competitors, value]);
        if (field === "labels") setLabels([...labels, value]);
        if (field === "industries") setIndustries([...industries, value]);
      }
      setInputValue({ ...inputValue, [field]: "" }); // Clear input field
    }
  };

  // Function to handle Chip deletion
  const handleDeleteChip = (field, chipToDelete) => {
    if (field === "customers") setCustomers(customers.filter((chip) => chip !== chipToDelete));
    if (field === "competitors") setCompetitors(competitors.filter((chip) => chip !== chipToDelete));
    if (field === "labels") setLabels(labels.filter((chip) => chip !== chipToDelete));
    if (field === "industries") setIndustries(industries.filter((chip) => chip !== chipToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    onSaveClient({
      id: existingClient?.id || Date.now(),
      name: clientName,
      email: clientEmail,
      customers,
      competitors,
      labels,
      industries,
    });

    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
        {existingClient ? "Edit Client Information" : "Add New Client"}
      </Typography>

      <Grid container spacing={2}>
        {/* Name & Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Client Name"
            variant="outlined"
            fullWidth
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Client Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </Grid>

        {/* Dynamic Chip Inputs */}
        {[
          { label: "Who are your customers?", field: "customers", values: customers },
          { label: "Who are your competitors?", field: "competitors", values: competitors },
          { label: "Labels that describe this client", field: "labels", values: labels },
          { label: "Industry this client belongs to", field: "industries", values: industries },
        ].map(({ label, field, values }) => (
          <Grid item xs={12} sm={6} key={field}>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
              {label}
            </Typography>
            <TextField
              placeholder="Type & press Enter"
              variant="outlined"
              fullWidth
              value={inputValue[field] || ""}
              onChange={(e) => setInputValue({ ...inputValue, [field]: e.target.value })}
              onKeyDown={(event) => handleAddChip(field, event)}
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {values.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  onDelete={() => handleDeleteChip(field, chip)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {existingClient ? "Update Client" : "Add Client"}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddClient;
