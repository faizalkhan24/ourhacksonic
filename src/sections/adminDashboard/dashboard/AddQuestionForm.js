import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const AddQuestionForm = ({ open, onClose, onSave, initialData = "" }) => {
  const [question, setQuestion] = useState(initialData);

  // Reset question state when initialData changes (e.g., when opening the modal)
  useEffect(() => {
    setQuestion(initialData);
  }, [initialData, open]); // Depend on both initialData and open state

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (question.trim() !== "") {
      onSave(question);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={{ backgroundColor: "#000", color: "#FFD700" }}>
        {initialData ? "Edit Question" : "Add Question"}
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "#000" }}>
        <TextField
          fullWidth
          label="Question Title"
          value={question}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: '#FFD700' } }}
          InputProps={{ style: { color: '#FFD700' } }}
          style={{ marginTop: 10 }}
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#000" }}>
        <Button onClick={onClose} style={{ color: "#FFD700" }}>Cancel</Button>
        <Button onClick={handleSubmit} style={{ backgroundColor: "#FFD700", color: "black" }}>
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionForm;
