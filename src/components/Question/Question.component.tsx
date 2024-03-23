import type { IQuestion } from "../../models/questions.model";
import moment from "moment";
import { Link } from "react-router-dom";

export interface IQuestionProps {
  question: IQuestion;
}

export const QuestionComponent = ({ question }: IQuestionProps) => {
  return <div
    className="card border border-black shadow-xl rounded-md p-3 flex flex-col justify-center items-center gap-3">
    <h2 className="font-semibold text-center"> {question?.author} </h2>

    <p className="text-center"> {moment(question.timestamp).format("hh:mm A | MM/DD/YYYY")}</p>

    <hr className="border border-gray-300 w-full" />

    <Link className="w-full" to={`/questions/${question.id}`}>
    <button className="w-full btn text-center h-10 flex items-center justify-center cursor-pointer
                              bg-violet-500 hover:bg-violet-600 rounded-md text-white">
      View detail
    </button>
  </Link>
</div>
  ;
};