import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ columns, rows, pageSizeOptions = [5, 10] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter rows based on search query
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Search Box */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 2,
          backgroundColor: "#000",
          color: "#FFD700",
          "& .MuiOutlinedInput-root": {
            color: "#FFD700",
            borderColor: "#FFD700",
            "& fieldset": { borderColor: "#FFD700" },
            "&:hover fieldset": { borderColor: "#FFD700" },
          },
        }}
        InputLabelProps={{ style: { color: "#FFD700" } }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* DataGrid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        disableSelectionOnClick
        sx={{
          backgroundColor: "#000",
          color: "#FFD700",
          border: "2px solid #FFD700",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#000",
            color: "#FFD700",
            borderBottom: "2px solid #FFD700",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "#FFD700",
            borderBottom: "1px solid #FFD700",
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#111",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#000",
            color: "#FFD700",
            borderTop: "2px solid #FFD700",
          },
          "& .MuiTablePagination-root": {
            color: "#FFD700",
          },
          "& .MuiIconButton-root": {
            color: "#FFD700",
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
