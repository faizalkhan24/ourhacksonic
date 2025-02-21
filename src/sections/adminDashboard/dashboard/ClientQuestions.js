import React, { useState, useEffect } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Modal, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Covers 80% of the page
  height: "80vh", // Takes 80% of the viewport height
  bgcolor: "#000",
  border: "2px solid #FFD700",
  boxShadow: 24,
  p: 4,
  color: "#FFD700",
  borderRadius: 2,
  overflowY: "auto", // Enable scrolling if content is long
};

const ClientQuestions = ({ client, onClose }) => {
  const [assignedQuestions, setAssignedQuestions] = useState(client.questions || []);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  // Simulate fetching predefined questions from the database
  useEffect(() => {
    const allQuestions = [
      { id: 1, text: "What is your budget?" },
      { id: 2, text: "What are your main business goals?" },
      { id: 3, text: "Do you have any preferred technologies?" },
    ];
    // Filter out already assigned questions
    const assignedIds = assignedQuestions.map((q) => q.id);
    setAvailableQuestions(allQuestions.filter((q) => !assignedIds.includes(q.id)));
  }, [assignedQuestions]);

  // Handle assigning a question with an answer
  const handleAssignQuestion = () => {
    if (!selectedQuestion || !answer.trim()) return;

    const newQuestion = { ...selectedQuestion, answer };
    setAssignedQuestions([...assignedQuestions, newQuestion]);

    // Remove from available list
    setAvailableQuestions(availableQuestions.filter((q) => q.id !== selectedQuestion.id));

    // Reset state
    setAnswer("");
    setSelectedQuestion(null);
    setOpenAddQuestionModal(false);
  };

  // Handle removing an assigned question
  const handleRemoveQuestion = (questionId) => {
    const removedQuestion = assignedQuestions.find((q) => q.id === questionId);
    setAssignedQuestions(assignedQuestions.filter((q) => q.id !== questionId));

    // Add it back to available questions
    setAvailableQuestions([...availableQuestions, { id: removedQuestion.id, text: removedQuestion.text }]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      <Typography variant="h5">{client.name}'s Questions</Typography>

      {/* Assigned questions list */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", bgcolor: "#222", borderRadius: 2, padding: 2 }}>
        {assignedQuestions.length === 0 ? (
          <Typography sx={{ color: "#FFD700", textAlign: "center", padding: 2 }}>No questions assigned yet.</Typography>
        ) : (
          <List>
            {assignedQuestions.map((question) => (
              <ListItem
                key={question.id}
                sx={{ color: "#FFD700", borderBottom: "1px solid #FFD700", display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText primary={question.text} secondary={`Answer: ${question.answer}`} />
                <IconButton sx={{ color: "#FFD700" }} onClick={() => handleRemoveQuestion(question.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Buttons Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFD700", color: "#000", flex: 1 }}
          onClick={() => setOpenAddQuestionModal(true)}
        >
          Add Question
        </Button>
  
      </Box>

      {/* Modal for selecting a question */}
      <Modal open={openAddQuestionModal} onClose={() => setOpenAddQuestionModal(false)}>
        <Box sx={{ ...modalStyle, width: "50%", height: "60vh" }}>
          <Typography variant="h6">Select a Question</Typography>
          <List sx={{ bgcolor: "#222", borderRadius: 2, padding: 2, maxHeight: 300, overflowY: "auto" }}>
            {availableQuestions.length === 0 ? (
              <Typography sx={{ color: "#FFD700", textAlign: "center" }}>No more questions available.</Typography>
            ) : (
              availableQuestions.map((question) => (
                <ListItem
                  key={question.id}
                  sx={{ color: "#FFD700", display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText primary={question.text} />
                  <IconButton sx={{ color: "#FFD700" }} onClick={() => setSelectedQuestion(question)}>
                    <AddIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>

          {/* Answer input field */}
          {selectedQuestion && (
            <Box sx={{ mt: 2 }}>
              <Typography>Answer for: {selectedQuestion.text}</Typography>
              <TextField
                label="Answer"
                variant="outlined"
                fullWidth
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                InputLabelProps={{ style: { color: "#FFD700" } }}
                sx={{ input: { color: "#FFD700" }, mt: 1 }}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FFD700", color: "#000", mt: 2, width: "100%" }}
                onClick={handleAssignQuestion}
              >
                Assign Question
              </Button>
            </Box>
          )}

          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000", mt: 2, width: "100%" }}
            onClick={() => setOpenAddQuestionModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClientQuestions;
