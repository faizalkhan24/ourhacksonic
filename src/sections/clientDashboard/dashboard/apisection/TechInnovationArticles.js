import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import List from "components/Opportunities/list"; // Assuming this component exists

const TechInnovationArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/classify", {
          params: { label: "tech", classification: "Innovation" },
        });

        const data =
          response.data?.map((item) => ({
            title: (
              <a
                href={item.LINK || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
              >
                {item.TITLE || "No Title"}
              </a>
            ),
            // details: item.CONTENT || "No Description Available",
            location: item.LABEL || "Location", // You can adjust this field
            date: item.DATE || "12/10/2000", // You can adjust this field
            image: item.IMAGE_LINK || "/logo/notfound.png", // Default image if null || "/logo/notfound.png", // Default image if null
          })) || [];

        setArticles(data);

        console.log(data)
      } catch (error) {
        setError("Error fetching tech innovation articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6">Loading Tech Innovation Articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <List
      title="Tech Innovation Articles"
      opportunities={articles}
      noDataMessage="No tech innovation articles available at the moment."
    />
  );
};

export default TechInnovationArticles;
