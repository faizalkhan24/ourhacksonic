import React from "react";
import { Box } from "@mui/material";
import TransportationOpportunities from "./apisection/transportation-opportunities";
import RollingStockOpportunities from "./apisection/rolling-stock-opportunities";
import InfrastructureOpportunities from "./apisection/infrastructure-opportunities";

const Insights = () => {
  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "#000",
        color: "#fff",
        overflowY: "auto", // Enable scrolling for the entire container
        height: "auto", // Ensure it takes up the full height of the screen
      }}
    >
      {/* Call different opportunity components */}
      <TransportationOpportunities />
      <RollingStockOpportunities />
      <InfrastructureOpportunities />
    </Box>
  );
};

export default Insights;
