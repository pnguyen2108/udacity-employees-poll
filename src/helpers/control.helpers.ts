import type { IQuestionFormat } from "../modes/questions.model";

export const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};


export const formatQuestion = (data : IQuestionFormat) => {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: data.author,
    optionOne: {
      votes: [],
      text: data.optionOneText,
    },
    optionTwo: {
      votes: [],
      text: data.optionTwoText,
    }
  }
};