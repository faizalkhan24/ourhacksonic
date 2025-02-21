import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

const ClientsList = ({ clients, onOpenWidgets, onOpenQuestions, onEditClient }) => {
  return (
    <List sx={{ bgcolor: "#222", borderRadius: 2, padding: 2 }}>
      {clients.length === 0 ? (
        <ListItem sx={{ color: "#FFD700" }}>No clients added yet.</ListItem>
      ) : (
        clients.map((client) => (
          <ListItem key={client.id} sx={{ color: "#FFD700", borderBottom: "1px solid #FFD700", display: "flex", justifyContent: "space-between" }}>
            <ListItemText primary={client.name} secondary={client.email} />
            <Button sx={{ color: "#FFD700" }} onClick={() => onOpenWidgets()}>Widgets</Button>
            <Button sx={{ color: "#FFD700" }} onClick={() => onOpenQuestions(client)}>Questions</Button>
            <Button sx={{ color: "#FFD700" }} onClick={() => onEditClient(client)}>Edit</Button>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ClientsList;
