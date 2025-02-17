import React from 'react'
import { Box, Grid } from "@mui/material";
import KeywordSelector from 'sections/clientDashboard/dashboard/keyword-selector';
import Insights from 'sections/clientDashboard/dashboard/insights';
import InsightsRight from 'sections/clientDashboard/dashboard/insights-right';
import { useState } from "react";

const ClientDashboard = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", padding: 4 }}>
      
    {/* Keyword Selector Below Header */}
    <Box sx={{ marginTop: 2 }}>
      <KeywordSelector selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords} />
    </Box>

    {/* Main Content */}
    <Grid container spacing={14}>
      <Grid item xs={12} md={6}>
      
        <Insights />
      </Grid>
      <Grid item xs={12} md={6}>
        <InsightsRight />
      </Grid>
    </Grid>
  </Box>
  )
}

export default ClientDashboard