import React from "react";
import Chart from "react-apexcharts";
import { Box, Typography } from "@mui/material";
import { useChart } from "components/chart";
const data = [
  { brand: "Nike", marketShare: 18.6 },
  { brand: "Adidas", marketShare: 6.6 },
  { brand: "Under Armour", marketShare: 4.3 },
  { brand: "Skechers", marketShare: 3.8 },
  { brand: "Lululemon", marketShare: 3.6 },
];

const categories = data.map((item) => item.brand);
const marketShareValues = data.map((item) => item.marketShare);

const MarketShareChart = () => {
  const chartOptions = useChart({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories,
    },
    stroke: {
      width: [0, 2], // 0 for bars, 2 for line
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  const chartSeries = [
    {
      name: "Market Share",
      type: "bar",
      data: marketShareValues,
    },
    {
      name: "Market Share Trend",
      type: "line",
      data: marketShareValues,
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#000", padding: 2 }}>
      {/* Title with Yellow Left Bar */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Box sx={{ width: 6, height: 24, backgroundColor: "#FFD700", marginRight: 1 }} />
        <Typography variant="h6" sx={{ color: "#fff" }}>Sportswear Market Share</Typography>
      </Box>

      <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
    </Box>
  );
};

export default MarketShareChart;
