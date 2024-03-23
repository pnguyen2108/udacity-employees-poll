export interface IQuestionFormat {
  author : string;
  optionOneText : string;
  optionTwoText: string;
}

export interface  IOption {
  votes : string[],
  text: string
}

export interface IQuestionAnswer {
  authedUser : string
  qid : string;
  answer: "optionOne" | "optionTwo"
}

export interface IQuestion{
  id: string,
  author: string,
  timestamp: number,
  optionOne: IOption,
  optionTwo: IOption
}

export interface IQuestions {
  [key : string] : IQuestion
}