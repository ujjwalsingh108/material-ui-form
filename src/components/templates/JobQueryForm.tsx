import React from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  InputAdornment,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { QuestionType } from "../../utils";
import { useGlobalState } from "../../hooks/GlobalStateHook";

import { useNavigate } from "react-router";

const JobQueryForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    dispatch({ type: "ADD_QUESTION" });
  };

  const handleUpdateQuestionText = (id: number, text: string) => {
    dispatch({ type: "UPDATE_QUESTION_TEXT", payload: { id, text } });
  };

  const handleChangeQuestionType = (id: number, type: QuestionType) => {
    dispatch({ type: "CHANGE_QUESTION_TYPE", payload: { id, type } });
  };

  // const handleAddOption = (id: number, option: string) => {
  //   dispatch({ type: "ADD_OPTION", payload: { id, option } });
  // };

  const handleDeleteQuestion = (id: number) => {
    dispatch({ type: "REMOVE_QUESTION", payload: { id } });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Questions:", state.questions);
    navigate("/form-summary");
  };

  return (
    <>
      <AppBar position="static" sx={{ marginY: "8px" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Create a New Job Query
          </Typography>
        </Toolbar>
      </AppBar>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          QUALIFICATION QUESTIONS
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSave}>
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

                <Stack direction={"row"} spacing={2} mt={2}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="job-query-choice"
                    >
                      <FormControlLabel
                        value="multipleChoice"
                        checked={question.type === "multipleChoice"}
                        onChange={() =>
                          handleChangeQuestionType(
                            question.id,
                            "multipleChoice"
                          )
                        }
                        control={<Radio />}
                        label="Multiple Choice"
                      />
                      <FormControlLabel
                        value="freeText"
                        checked={question.type === "freeText"}
                        onChange={() =>
                          handleChangeQuestionType(question.id, "freeText")
                        }
                        control={<Radio />}
                        label="Free Text"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>

                <TextField
                  fullWidth
                  required
                  label="Add your question here"
                  value={question.text}
                  onChange={(e) =>
                    handleUpdateQuestionText(question.id, e.target.value)
                  }
                  margin="normal"
                />

                {/**Type options */}
                <Box sx={{ marginTop: "1.5rem" }}>
                  {question.type === "multipleChoice" && (
                    <TextField
                      fullWidth
                      label="Type Options (Minimum 2)"
                      placeholder="Type an option"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                width: "100%",
                                maxHeight: "100px",
                                overflowY: "auto",
                                padding: "4px",
                              }}
                            >
                              {question.options.map((option, index) => (
                                <Chip
                                  key={index}
                                  label={option}
                                  onDelete={() => {
                                    if (question.options.length > 2) {
                                      dispatch({
                                        type: "REMOVE_OPTION",
                                        payload: {
                                          id: question.id,
                                          option,
                                        },
                                      });
                                    } else {
                                      alert(
                                        "At least two options are required."
                                      );
                                    }
                                  }}
                                />
                              ))}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const inputElement = e.target as HTMLInputElement;
                          const inputValue = inputElement.value.trim();

                          if (
                            inputValue &&
                            !question.options.includes(inputValue)
                          ) {
                            dispatch({
                              type: "ADD_OPTION",
                              payload: {
                                id: question.id,
                                option: inputValue,
                              },
                            });
                            inputElement.value = "";
                          }
                        }
                      }}
                    />
                  )}
                  {question.type === "multipleChoice" && (
                    <Typography
                      sx={{
                        marginLeft: "1rem",
                        fontSize: "0.75rem",
                        color: "gray",
                      }}
                    >
                      Type and press enter to create multiple options
                    </Typography>
                  )}
                </Box>

                {/** Pick qualifying answers */}
                <Box sx={{ marginTop: "1.5rem" }}>
                  {question.type === "multipleChoice" && (
                    <TextField
                      fullWidth
                      label="Pick Qualifying Answers"
                      placeholder="Type an answer from the above options"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                width: "100%",
                                maxHeight: "100px",
                                overflowY: "auto",
                                padding: "4px",
                              }}
                            >
                              {question.qualifyingAnswers.map(
                                (answer, index) => (
                                  <Chip
                                    key={index}
                                    label={answer}
                                    onDelete={() => {
                                      if (
                                        question.qualifyingAnswers.length > 1
                                      ) {
                                        dispatch({
                                          type: "UPDATE_QUALIFYING_ANSWERS",
                                          payload: {
                                            id: question.id,
                                            qualifyingAnswers:
                                              question.qualifyingAnswers.filter(
                                                (ans) => ans !== answer
                                              ),
                                          },
                                        });
                                      } else {
                                        alert(
                                          "At least one qualifying answer is required."
                                        );
                                      }
                                    }}
                                  />
                                )
                              )}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const inputElement = e.target as HTMLInputElement;
                          const inputValue = inputElement.value.trim();

                          if (
                            inputValue &&
                            question.options.includes(inputValue) &&
                            !question.qualifyingAnswers.includes(inputValue)
                          ) {
                            dispatch({
                              type: "UPDATE_QUALIFYING_ANSWERS",
                              payload: {
                                id: question.id,
                                qualifyingAnswers: [
                                  ...question.qualifyingAnswers,
                                  inputValue,
                                ],
                              },
                            });
                            inputElement.value = "";
                          } else if (!question.options.includes(inputValue)) {
                            alert(
                              "Please select a valid option from the available choices."
                            );
                          }
                        }
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" onClick={handleAddQuestion}>
                Add Question
              </Button>

              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default JobQueryForm;
