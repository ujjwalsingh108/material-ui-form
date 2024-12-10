import React, { useReducer } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  Chip,
  AppBar,
  Toolbar,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { reducer, initialState } from "../../hooks/GlobalState";
import { QuestionType } from "../../utils";

const JobQueryForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddQuestion = () => {
    dispatch({ type: "ADD_QUESTION" });
  };

  const handleUpdateQuestionText = (id: number, text: string) => {
    dispatch({ type: "UPDATE_QUESTION_TEXT", payload: { id, text } });
  };

  const handleChangeQuestionType = (id: number, type: QuestionType) => {
    dispatch({ type: "CHANGE_QUESTION_TYPE", payload: { id, type } });
  };

  const handleAddOption = (id: number, option: string) => {
    dispatch({ type: "ADD_OPTION", payload: { id, option } });
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch({ type: "REMOVE_QUESTION", payload: { id } });
  };

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: "8px" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Create a New Job Query
          </Typography>
        </Toolbar>
      </AppBar>

      {state.questions.map((question) => (
        <Box
          key={question.id}
          mb={4}
          p={2}
          border="1px solid #ccc"
          position="relative"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Question {question.id}</Typography>

            <IconButton
              color="error"
              onClick={() => handleDeleteQuestion(question.id)}
              title="Delete this question"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>

          <TextField
            fullWidth
            label="Enter your question"
            value={question.text}
            onChange={(e) =>
              handleUpdateQuestionText(question.id, e.target.value)
            }
            margin="normal"
          />

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant={question.type === "freeText" ? "contained" : "outlined"}
              onClick={() => handleChangeQuestionType(question.id, "freeText")}
            >
              Set as Free Text
            </Button>
            <Button
              variant={
                question.type === "multipleChoice" ? "contained" : "outlined"
              }
              onClick={() =>
                handleChangeQuestionType(question.id, "multipleChoice")
              }
            >
              Set as Multiple Choice
            </Button>
          </Stack>

          {question.type === "multipleChoice" && (
            <Box mt={2}>
              <Typography variant="subtitle1">Options</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {question.options.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    onDelete={() =>
                      dispatch({
                        type: "REMOVE_OPTION",
                        payload: { id: question.id, option },
                      })
                    }
                  />
                ))}
              </Stack>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleAddOption(
                      question.id,
                      `Option ${question.options.length + 1}`
                    )
                  }
                >
                  Add Option
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ))}

      <Button variant="contained" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </>
  );
};

export default JobQueryForm;
