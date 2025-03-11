import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import List from "components/Opportunities/list";

const InfrastructureOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(" http://172.210.67.200:3000/opportunities", {
          params: { label: "infrastructure" },
        });

        const data = response.data.classifications?.map((item) => ({
          title: item.prediction || "Unknown",
          details: `Confidence: ${(item.confidence * 100).toFixed(2)}%`,
          location: item.input || "Unknown Location",
          image: "/logo192.png", // You can replace this with a dynamic image URL if needed
        })) || [];

        setOpportunities(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching infrastructure opportunities.");
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Loading Infrastructure Opportunities...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <List
    title="Infrastructure Opportunities"
    opportunities={opportunities}
    noDataMessage="No cybersecurity opportunities available at the moment."
  />
  );
};

export default InfrastructureOpportunities;
