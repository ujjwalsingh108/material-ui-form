import { Action, State } from "../utils";

export const initialState: State = {
  questions: [
    {
      id: 1,
      text: "Select Companies you've worked with before",
      type: "multipleChoice",
      options: ["Indiamart", "Alibaba", "Blackbuck"],
      qualifyingAnswers: ["Indiamart"],
    },
  ],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            id: state.questions.length + 1,
            type: "multipleChoice",
            text: "",
            options: [],
            qualifyingAnswers: [],
          },
        ],
      };

    case "REMOVE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload.id),
      };

    case "UPDATE_QUESTION_TEXT":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? { ...q, text: action.payload.text } : q
        ),
      };

    case "CHANGE_QUESTION_TYPE":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? {
                ...q,
                type: action.payload.type,
                options: [],
                qualifyingAnswers: [],
              }
            : q
        ),
      };

    case "ADD_OPTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? { ...q, options: [...q.options, action.payload.option] }
            : q
        ),
      };

    case "REMOVE_OPTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? {
                ...q,
                options: q.options.filter(
                  (opt) => opt !== action.payload.option
                ),
                qualifyingAnswers: q.qualifyingAnswers.filter(
                  (ans) => ans !== action.payload.option
                ),
              }
            : q
        ),
      };

    case "UPDATE_QUALIFYING_ANSWERS":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? {
                ...q,
                qualifyingAnswers: action.payload.qualifyingAnswers,
              }
            : q
        ),
      };

    default:
      throw new Error("Unhandled action type.");
  }
};
