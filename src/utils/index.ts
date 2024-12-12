export type QuestionType = "multipleChoice" | "freeText";

export type Question = {
  id: number;
  type: QuestionType;
  text: string;
  options: string[];
  qualifyingAnswers: string[];
};

export type State = {
  questions: Question[];
};

export type Action =
  | { type: "ADD_QUESTION" }
  | { type: "REMOVE_QUESTION"; payload: { id: number } }
  | {
      type: "UPDATE_QUESTION_TEXT";
      payload: {
        id: number;
        text: string;
      };
    }
  | {
      type: "CHANGE_QUESTION_TYPE";
      payload: {
        id: number;
        type: QuestionType;
      };
    }
  | {
      type: "ADD_OPTION";
      payload: {
        id: number;
        option: string;
      };
    }
  | {
      type: "REMOVE_OPTION";
      payload: {
        id: number;
        option: string;
      };
    }
  | {
      type: "UPDATE_QUALIFYING_ANSWERS";
      payload: {
        id: number;
        qualifyingAnswers: string[];
      };
    };

export type GlobalStateContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type GlobalStateProviderProps = {
  children: React.ReactNode;
};
