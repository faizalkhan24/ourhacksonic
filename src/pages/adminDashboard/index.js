import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  // Mock Data (Replace this with API data if needed)
  const totalClients = 150;
  const totalWidgets = 25;
  const totalQuestions = 500;

  // Dashboard Cards Data
  const stats = [
    { title: "Total Clients", value: totalClients },
    { title: "Total Widgets", value: totalWidgets },
    { title: "Total Questions", value: totalQuestions },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#000", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "#FFD700", marginBottom: 3, textAlign: "left" }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#1a1a1a",
                color: "#FFD700",
                textAlign: "center",
                border: "1px solid #FFD700",
                borderRadius: 1,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
