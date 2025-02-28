import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const WidgetsModal = ({ open, onClose, onAdd }) => {
  const [widgets, setWidgets] = useState([
    { id: 101, name: "OPPORTUNITIES", enabled: false },
    { id: 102, name: "STRATEGIES", enabled: true },
    { id: 103, name: "GEOPOLITICS", enabled: false },
    { id: 104, name: "CHALLENGES", enabled: false },
    { id: 105, name: "COMPETITION", enabled: false },
  ]);

  const handleToggleWidget = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  const handleAdd = () => {
    const selectedWidgets = widgets.filter((widget) => widget.enabled);
    console.log("Selected Widgets:", selectedWidgets);

    if (onAdd) {
      onAdd(selectedWidgets); // Pass selected widgets to parent
    }
    onClose(); // Close modal
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign="center">Select Widgets</DialogTitle>
      <DialogContent>
        {widgets.map((widget) => (
          <Box
            key={widget.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #FFD700",
            }}
          >
            <Typography>{widget.name}</Typography>
            <Switch
              checked={widget.enabled}
              onChange={() => handleToggleWidget(widget.id)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#FFD700" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#FFD700",
                },
              }}
            />
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
        <Button onClick={handleAdd} variant="contained" sx={{ backgroundColor: "#FFD700", color: "#000" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetsModal;
