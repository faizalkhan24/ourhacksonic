import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import List from "components/Opportunities/list"; // Make sure this component supports onItemClick as below
import Loader from "components/Loader/Loader"; // Adjust path if needed

const DynamicArticles = () => {
  const [articlesByAPI, setArticlesByAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // New state for timeline popup
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openTimeline, setOpenTimeline] = useState(false);

  const apiUrl = process.env.REACT_APP_APIBASEURL;

  useEffect(() => {
    const pollInterval = 5000; // Check every 5 seconds
    const maxWaitTime = 50000; // Wait up to 50 seconds
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

      // Loop for each label
      for (const l of label) {
        // Handle Sentiment separately so it's only called once.
        if (classifications.includes("Sentiment")) {
          const sentimentAPIs = [
            {
              url: `${apiUrl}/sentiment?label=${encodeURIComponent(
                l
              )}&type=positive`,
              type: "Positive Sentiment",
              arrow: "↑",
              color: "#4caf50",
            },
            {
              url: `${apiUrl}/sentiment?label=${encodeURIComponent(
                l
              )}&type=negative`,
              type: "Negative Sentiment",
              arrow: "↓",
              color: "red",
            },
          ];

          sentimentAPIs.forEach(({ url, type, arrow, color }) => {
            apiCalls.push(
              axios.get(url).then((response) => ({
                label: type, // using the sentiment type as the label
                classification: type,
                arrow,
                color,
                articles: response.data.map((item) => ({
                  title: (
                    <a
                      // href={item.LINK || "#"}
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
                  classification: type,
                  industry: item.INDUSTRY || "Unknown Industry",
                  date: item.DATE || "Unknown Date",
                  image:
                    item.IMAGE_LINK && item.IMAGE_LINK !== "#"
                      ? item.IMAGE_LINK
                      : "/logo/notfound.png",
                  // Added timeline property (expecting an array)
                  timeline: item.TIMELINE || [],
                })),
              }))
            );
          });
        }
      }

      // For other classifications, iterate over each label.
      for (const l of label) {
        for (const c of classifications) {
          if (c !== "Sentiment") {
            const url = `${apiUrl}/classify?label=${encodeURIComponent(
              l
            )}&classification=${encodeURIComponent(c)}`;
            console.log("API URL:", url);

            apiCalls.push(
              axios
                .get(url)
                .then((response) => {
                  // Flatten the data and remove duplicates.
                  const flattenedArticles = response.data.flat();
                  const uniqueArticles = Array.from(
                    new Map(
                      flattenedArticles.map((item) => [item.LINK, item])
                    ).values()
                  );

                  if (uniqueArticles.length === 0) return null;

                  return {
                    label: l,
                    classification: c,
                    articles: uniqueArticles.map((item) => ({
                      title: (
                        <a
                          // href={item.LINK || "#"}
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
                      // Added timeline property
                      timeline: item.TIMELINE || [],
                    })),
                  };
                })
                .catch((err) => {
                  console.error(
                    `Error fetching articles for ${l} - ${c}:`,
                    err
                  );
                  return null;
                })
            );
          }
        }
      }

      try {
        let results = await Promise.all(apiCalls);
        results = results.filter((item) => item !== null);
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

  // Handler for when an article is clicked in the List component
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setOpenTimeline(true);
  };

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
          .filter((item) => item.articles && item.articles.length > 0)
          .map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                sx={{
                  padding: 2,
                  height: 700,
                  backgroundColor: "#000",
                  border: "1px solid #fff",
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6" sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "yellow",
                      width: "10px",
                      height: "24px",
                    }}
                  />
                  {`Articles for ${item.label} - ${item.classification}`}{" "}
                  {item.arrow && (
                    <span style={{ color: item.color, fontSize: "18px" }}>
                      {item.arrow}
                    </span>
                  )}
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* Total news: {item.articles.length} */}
                  </span>
                </Typography>

                {/* Pass onItemClick to List so that clicking an article shows its timeline */}
                <List
                  opportunities={item.articles}
                  noDataMessage="No articles available."
                  onItemClick={handleArticleClick}
                />
              </Paper>
            </Grid>
          ))}
      </Grid>

      {/* Timeline Popup Modal */}
      <Dialog
        open={openTimeline}
        onClose={() => setOpenTimeline(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Timeline</DialogTitle>
        <DialogContent>
          {selectedArticle &&
          selectedArticle.timeline &&
          Array.isArray(selectedArticle.timeline) &&
          selectedArticle.timeline.length > 0 ? (
            selectedArticle.timeline.map((event, idx) => (
              <Box
                key={idx}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                {event.IMAGE_LINK && event.IMAGE_LINK !== "#" && (
                  <Box
                    component="img"
                    src={event.IMAGE_LINK}
                    alt={event.TITLE}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      mr: 2,
                    }}
                  />
                )}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {event.TITLE}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {event.LABEL || "No LABEL"}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {event.CLASSIFICATION || ""}
                  </Typography>
                  <a
                    href={event.LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4caf50" }}
                  >
                    Read more
                  </a>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No timeline data available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTimeline(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DynamicArticles;
