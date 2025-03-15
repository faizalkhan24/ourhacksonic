import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";
import List from "components/Opportunities/list"; 

const DynamicArticles = () => {
  const [articlesByAPI, setArticlesByAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


useEffect(() => {
  const pollInterval = 5000; // Check every 500ms
  const maxWaitTime = 50000; // Wait up to 5 seconds
  let elapsedTime = 0;

  // Poll localStorage until clientParams is available
  const intervalId = setInterval(() => {
    const storedParams = localStorage.getItem("clientParams");
    if (storedParams) {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      const clientParams = JSON.parse(storedParams);
      if (clientParams && clientParams.label && clientParams.classifications) {
        const { label, classifications } = clientParams;
        const apiCalls = [];

        label.forEach((l) => {
          classifications.forEach((c) => {
            const url = `http://4.227.190.93:3001/classify?label=${encodeURIComponent(
              l
            )}&classification=${encodeURIComponent(c)}`;
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
image: (!item.IMAGE_LINK || item.IMAGE_LINK === "#") ? "/logo/notfound.png" : item.IMAGE_LINK,
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
        setError("Invalid client parameters found in local storage.");
      }
    } else {
      elapsedTime += pollInterval;
      if (elapsedTime >= maxWaitTime) {
        clearInterval(intervalId);
        setLoading(false);
        setError("No client parameters found in local storage after waiting.");
      }
    }
  }, pollInterval);

  // Fallback timeout (just in case)
  const timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    setLoading(false);
    setError("No client parameters found in local storage after waiting.");
  }, maxWaitTime);

  return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
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
