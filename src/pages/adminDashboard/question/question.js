import React, { useState } from "react";
import { TextField, Button, Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = (index = null) => {
    setEditIndex(index);
    setQuestion(index !== null ? questionsList[index] : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestion("");
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (question.trim() !== "") {
      if (editIndex !== null) {
        const updatedList = [...questionsList];
        updatedList[editIndex] = question;
        setQuestionsList(updatedList);
      } else {
        setQuestionsList([...questionsList, question]);
      }
    }
    handleClose();
  };

  const handleDelete = (index) => {
    setQuestionsList(questionsList.filter((_, i) => i !== index));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4">
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
          <TableContainer component={Paper} style={{ backgroundColor: "#000", border: "1px solid #FFD700" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#FFD700", border: "1px solid #FFD700" }}>Sr No</TableCell>
                  <TableCell style={{ color: "#FFD700", border: "1px solid #FFD700" }}>Question</TableCell>
                  <TableCell style={{ color: "#FFD700", border: "1px solid #FFD700" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionsList.length > 0 ? (
                  questionsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((q, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ color: "#fff", border: "1px solid #FFD700" }}>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell style={{ color: "#fff", border: "1px solid #FFD700" }}>{q}</TableCell>
                      <TableCell style={{ color: "#fff", border: "1px solid #FFD700" }}>
                        <IconButton onClick={() => handleOpen(index)} style={{ color: "#FFD700" }}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(index)} style={{ color: "#FFD700" }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center", color: "#FFD700", border: "1px solid #FFD700" }}>
                      No questions added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={questionsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ color: "#FFD700" }}
          />
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle style={{ backgroundColor: "#000", color: "#FFD700" }}>{editIndex !== null ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent style={{ backgroundColor: "#000" }}>
          <TextField
            fullWidth
            label="Question Title"
            name="title"
            value={question}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: '#FFD700' } }}
            InputProps={{ style: { color: '#FFD700' } }}
            style={{ marginTop: 10 }}
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#000" }}>
          <Button onClick={handleClose} style={{ color: "#FFD700" }}>Cancel</Button>
          <Button onClick={handleSubmit} style={{ backgroundColor: "#FFD700", color: "black" }}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddQuestion;
