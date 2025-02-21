import React, { useState } from "react";
import { Box, Typography, Switch } from "@mui/material";

const WidgetsModal = () => {
  const [widgets, setWidgets] = useState([
    { id: 101, name: "Analytics", enabled: false },
    { id: 102, name: "Reports", enabled: true },
    { id: 103, name: "Notifications", enabled: false },
  ]);

  const handleToggleWidget = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  return (
    <Box >
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
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#FFD700",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#FFD700",
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default WidgetsModal;
