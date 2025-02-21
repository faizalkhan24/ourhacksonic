import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddQuestionForm from "sections/adminDashboard/dashboard/AddQuestionForm";
import DataTable from "components/table/DataTable";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = (index = null) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleSaveQuestion = (question) => {
    if (editIndex !== null) {
      setQuestionsList(questionsList.map((q, i) => (i === editIndex ? question : q)));
    } else {
      setQuestionsList([...questionsList, question]);
    }
  };

  const handleDelete = (index) => {
    setQuestionsList(questionsList.filter((_, i) => i !== index));
  };

  const columns = [
    { field: "id", headerName: "Sr No", width: 100 },
    { field: "question", headerName: "Question", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpen(params.row.id - 1)} style={{ color: "#FFD700" }}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id - 1)} style={{ color: "#FFD700" }}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = questionsList.map((q, index) => ({
    id: index + 1,
    question: q,
  }));

  return (
    <Box className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4">
      <Card className="w-full max-w-4xl text-white border border-yellow-500" style={{ backgroundColor: "#000", color: "#FFD700" }}>
        <CardHeader 
          title={<Typography variant="h6">Questions List</Typography>} 
          action={
            <Button 
              variant="contained" 
              style={{ backgroundColor: "#FFD700", color: "black" }} 
              onClick={() => handleOpen()}
            >
              Add Question
            </Button>
          }
        />
        <CardContent>
          <DataTable columns={columns} rows={rows} />
        </CardContent>
      </Card>

      {/* Add/Edit Question Modal */}
      <AddQuestionForm
        open={open}
        onClose={handleClose}
        onSave={handleSaveQuestion}
        initialData={editIndex !== null ? questionsList[editIndex] : ""}
      />
    </Box>
  );
};

export default AddQuestion;
