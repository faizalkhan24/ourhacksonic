import React from "react";
import OpportunitiesList from "./apisection/technology-opportunities";
import CybersecurityOpportunities from "./apisection/cybersecurity-opportunities";
import { Box } from "@mui/material";
import MarketShareChart from 'sections/clientDashboard/dashboard/market-share-chart';

const InsightsRight = () => {
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
    <OpportunitiesList/>
    <CybersecurityOpportunities/>
    <MarketShareChart />

  </Box>
  );
};

export default InsightsRight;
