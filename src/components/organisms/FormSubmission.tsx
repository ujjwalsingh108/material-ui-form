import { Box, Chip, Typography } from "@mui/material";
import { useGlobalState } from "../../hooks/GlobalStateHook";

export const FormSubmission = () => {
  const { state } = useGlobalState();

  return (
    <div>
      <h1>Form Summary</h1>
      {state.questions.length > 0 ? (
        <div>
          <h2>Questions:</h2>
          <ul>
            {state.questions.map((question, index) => (
              <>
                <li key={index}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">{`Question ${question.id}:`}</Typography>
                    &nbsp;
                    {question.text}
                  </Box>
                </li>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">Options:&nbsp;</Typography>
                  {question.options
                    ? question.options.map((option, idx) => (
                        <Box sx={{ paddingLeft: 1 }}>
                          <Chip key={idx} label={option} />
                        </Box>
                      ))
                    : ""}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">
                    Qualifying Answers:&nbsp;
                  </Typography>
                  {question.qualifyingAnswers
                    ? question.qualifyingAnswers.map((answer, idx) => (
                        <Box sx={{ paddingLeft: 1, paddingTop: 1 }}>
                          <Chip key={idx} label={answer} />
                        </Box>
                      ))
                    : ""}
                </Box>
              </>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};
