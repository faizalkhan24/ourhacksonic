import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Stack,
  Chip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddClient = ({ onClose, onSaveClient, existingClient }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [labels, setLabels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.210.67.200:3000/api/industry/industries")
      .then((response) => setIndustryOptions(response.data))
      .catch((error) => console.error("Error fetching industries:", error));

    if (existingClient && Object.keys(existingClient).length > 0) {
      console.log("Populating fields with:", existingClient); // Debugging

      setClientName(existingClient.client_name || "");
      setClientEmail(existingClient.email || "");

      setLabels(existingClient.label ? [...existingClient.label] : []);
      setCustomers(existingClient.customer ? [...existingClient.customer] : []);
      setCompetitors(
        existingClient.competitor ? [...existingClient.competitor] : []
      );
      setIndustries(
        existingClient.industry_id ? [...existingClient.industry_id] : []
      );

      console.log("Labels:", existingClient.label);
      console.log("Customers:", existingClient.customer);
      console.log("Competitors:", existingClient.competitor);
      console.log("Industries:", existingClient.industry_id);
    }
  }, [existingClient]);

  useEffect(() => {
    if (existingClient) {
      setClientName(existingClient.client_name || "");
      setClientEmail(existingClient.email || "");
      setLabels(existingClient.label || []); // Match API field names
      setCustomers(existingClient.customer || []);
      setCompetitors(existingClient.competitor || []);
      setIndustries(existingClient.industry_id || []);
    }
  }, [existingClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
  
    const clientData = {
      client_name: clientName,
      email: clientEmail,
      label: labels,
      customer: customers,
      competitor: competitors,
      industry_id: industries,
    };
  
    try {
      let response;
      if (existingClient?.id) {
        response = await axios.put(
          `http://172.210.67.200:3000/api/clients/${existingClient.id}`,
          clientData
        );
      } else {
        response = await axios.post(
          "http://172.210.67.200:3000/api/clients", 
          clientData
        );
      }
      
      // Use the response data which contains the server-generated ID
      onSaveClient(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleChipInput = (e, setField, field) => {
    if (e.key === "," && e.target.value.trim()) {
      e.preventDefault();
      const newValue = e.target.value.trim();
      if (!field.includes(newValue)) {
        setField([...field, newValue]);
      }
      e.target.value = "";
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
        position: "relative",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6">
        {existingClient ? "Update Client" : "Add Client"}
      </Typography>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={4}>
          <TextField
            label="Client Name"
            fullWidth
            required
            value={clientName}
            onChange={(e) => {
              console.log("Client Name Changed:", e.target.value);
              setClientName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Client Email"
            type="email"
            fullWidth
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Typography variant="subtitle1">Industries</Typography>
            <Select
              multiple
              value={industries}
              onChange={(e) => setIndustries(e.target.value)}
              renderValue={(selected) =>
                selected
                  .map((id) => industryOptions.find((io) => io.ID === id)?.NAME)
                  .join(", ")
              }
            >
              {industryOptions.map((industry) => (
                <MenuItem key={industry.ID} value={industry.ID}>
                  {industry.NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {["Labels", "Customers", "Competitors"].map((fieldType, index) => {
          const [field, setField] = {
            Labels: [labels, setLabels],
            Customers: [customers, setCustomers],
            Competitors: [competitors, setCompetitors],
          }[fieldType];

          return (
            <Grid item xs={4} key={index}>
              <Typography variant="subtitle1">{fieldType}</Typography>
              <TextField
                fullWidth
                placeholder={`Type and press ','`}
                onKeyDown={(e) => {
                  if (e.key === "," && e.target.value.trim()) {
                    e.preventDefault();
                    const newValue = e.target.value.trim();
                    if (!field.includes(newValue)) {
                      setField([...field, newValue]);
                    }
                    e.target.value = "";
                  }
                }}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                {field.map((item, idx) => (
                  <Chip
                    key={idx}
                    label={item}
                    onDelete={() =>
                      setField(field.filter((val) => val !== item))
                    }
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {existingClient ? "Update Client" : "Create Client"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddClient;
