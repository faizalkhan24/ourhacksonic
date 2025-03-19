import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";
import List from "components/Opportunities/list";
import Loader from "components/Loader/Loader"; // Adjust path if needed

const DynamicArticles = () => {
  const [articlesByAPI, setArticlesByAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_APIBASEURL;

  useEffect(() => {
    const pollInterval = 5000; // Check every 500ms
    const maxWaitTime = 50000; // Wait up to 5 seconds
    let elapsedTime = 0;

    const fetchArticles = async () => {
      const storedParams = localStorage.getItem("clientParams");
      if (!storedParams) return;

      const clientParams = JSON.parse(storedParams);
      if (!clientParams?.label || !clientParams?.classifications) {
        setLoading(false);
        setError("Invalid client parameters.");
        return;
      }

      const { label, classifications } = clientParams;
      const apiCalls = [];

      for (const l of label) {
        for (const c of classifications) {
          const url = `${apiUrl}/classify?label=${encodeURIComponent(
            l
          )}&classification=${encodeURIComponent(c)}`;
          console.log("API URL:", url);

          apiCalls.push(
            axios
              .get(url)
              .then((response) => {
                console.log(response.data);

                // Flatten and remove duplicates
                const flattenedArticles = response.data.flat();
                const uniqueArticles = Array.from(
                  new Map(
                    flattenedArticles.map((item) => [item.LINK, item])
                  ).values()
                );

                // If there are no articles, return null to filter later
                if (uniqueArticles.length === 0) return null;

                return {
                  label: l,
                  classification: c,
                  articles: uniqueArticles.map((item) => ({
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
                    location: item.LABEL || "No LABEL",
                    classification: item.CLASSIFICATION || "Unclassified",
                    industry: item.INDUSTRY || "Unknown Industry",
                    date: item.DATE || "Unknown Date",
                    image:
                      item.IMAGE_LINK && item.IMAGE_LINK !== "#"
                        ? item.IMAGE_LINK
                        : "/logo/notfound.png",
                  })),
                };
              })
              .catch((err) => {
                console.error(`Error fetching articles for ${l} - ${c}:`, err);
                return null; // Ignore failed requests
              })
          );
        }
      }

      try {
        let results = await Promise.all(apiCalls);

        // Filter out APIs that returned no data
        results = results.filter((item) => item !== null);

        // Sort by article count (larger datasets first)
        results.sort((a, b) => b.articles.length - a.articles.length);

        setArticlesByAPI(results);
      } catch {
        setError("Error fetching articles.");
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      if (localStorage.getItem("clientParams")) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        fetchArticles();
      } else {
        elapsedTime += pollInterval;
        if (elapsedTime >= maxWaitTime) {
          clearInterval(intervalId);
          setLoading(false);
          setError("No client parameters found.");
        }
      }
    }, pollInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
      setError("No client parameters found.");
    }, maxWaitTime);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
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
        {articlesByAPI
          .filter((item) => item.articles && item.articles.length > 0) // Ensure only non-empty APIs are shown
          .map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                sx={{
                  padding: 2,
                  height: 700,
                  backgroundColor: "#000",
                  overflowY: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    gap: 4, 
                    alignItems: "left",
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
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >Total news  :
                    {item.articles.length} {/* Show total articles count */}
                  </span>
                </Typography>

                <List
                  opportunities={item.articles}
                  noDataMessage="No articles available for this category."
                />
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DynamicArticles;
