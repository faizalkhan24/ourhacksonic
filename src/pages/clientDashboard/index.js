// import React from 'react'
// import { Box, Grid } from "@mui/material";
// import KeywordSelector from 'sections/clientDashboard/dashboard/keyword-selector';
// import Insights from 'sections/clientDashboard/dashboard/insights';
// import InsightsRight from 'sections/clientDashboard/dashboard/insights-right';
// import { useState } from "react";

// const ClientDashboard = () => {
//   const [selectedKeywords, setSelectedKeywords] = useState([]);

//   return (
//     <Box sx={{ backgroundColor: "#000", minHeight: "100vh", padding: 4 }}>
      
//     {/* Keyword Selector Below Header */}
//     {/* <Box sx={{ marginTop: 2 }}>
//       <KeywordSelector selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords} />
//     </Box> */}

//     {/* Main Content */}
//     <Grid container spacing={14}>
//       <Grid item xs={12} md={6}>
//         <Insights />
//       </Grid>
//       <Grid item xs={12} md={6}>
        // <InsightsRight />
//       </Grid>
//     </Grid>
//   </Box>
//   )
// }

// export default ClientDashboard

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";
import List from "components/Opportunities/list"; 

const DynamicArticles = () => {
  const [articlesByAPI, setArticlesByAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clientParams = JSON.parse(localStorage.getItem("clientParams"));
    if (clientParams && clientParams.label && clientParams.classifications) {
      const { label, classifications } = clientParams;
      const apiCalls = [];

      label.forEach((l) => {
        classifications.forEach((c) => {
          const url = `http://4.227.190.93:3001/classify?label=${encodeURIComponent(l)}&classification=${encodeURIComponent(c)}`;
          console.log("API URL:", url);

          apiCalls.push(
            axios
              .get(url)
              .then((response) => {
                const uniqueArticles = Array.from(
                  new Map(response.data.map((item) => [item.LINK, item])).values()
                );
                const data = uniqueArticles.map((item) => ({
                  title: (
                    <a
                      href={item.LINK || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {item.TITLE || "No Title"}
                    </a>
                  ),
                  location: item.LABEL || "Technology",
                  date: item.DATE || "Unknown Date",
                  image: item.IMAGE_LINK || "/logo/notfound.png",
                }));
                return { label: l, classification: c, articles: data };
              })
              .catch((err) => {
                console.error("Error fetching articles for", l, "-", c, ":", err);
                return {
                  label: l,
                  classification: c,
                  error: `Error fetching articles for ${l} - ${c}: ${err.message}`,
                };
              })
          );
        });
      });

      Promise.all(apiCalls)
        .then((results) => {
          setArticlesByAPI(results);
        })
        .catch((err) => {
          setError("Error fetching articles.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No client parameters found in local storage.");
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
        <Typography variant="h6">Loading Articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: 4,
        overflowY: "auto", 
      }}
    >
      <Grid container spacing={2}>
        {articlesByAPI.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              sx={{
                padding: 2,
                height: 600, 
                backgroundColor: "#000",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    width: "10px",
                    height: "24px",
                    backgroundColor: "yellow",
                    marginRight: 1,
                  }}
                />
                {`Articles for ${item.label} - ${item.classification}`}
              </Typography>
              {item.error ? (
                <Typography sx={{ color: "#fff" }}>{item.error}</Typography>
              ) : item.articles && item.articles.length > 0 ? (
                <List
                  opportunities={item.articles}
                  noDataMessage="No articles available for this category."
                />
              ) : (
                <Typography sx={{ color: "#fff" }}>No articles available.</Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DynamicArticles;
