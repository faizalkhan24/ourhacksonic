import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const ClientSelector = ({ clients, selectedClient, onClientChange }) => {
  return (
    <FormControl 
      sx={{
        minWidth: 160, 
        backgroundColor: "#000", 
        borderRadius: 1, 
        border: "1px solid #FFD700",
      }}
      size="small"
    >
      <InputLabel sx={{ color: "#FFD700" }}>Select Client</InputLabel>
      <Select
        value={selectedClient ? selectedClient.id : ""}
        onChange={(e) => {
          const client = clients.find((c) => c.id === e.target.value);
          onClientChange(client);
        }}
        sx={{
          color: "#FFD700",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFD700",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFA500",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFA500",
          },
          ".MuiSvgIcon-root": {
            color: "#FFD700",
          },
        }}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Client
        </MenuItem>
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClientSelector;
