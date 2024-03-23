import { IQuestion } from "../../modes/questions.model";
import { QuestionComponent } from "../../components/Question/Question.component";
import { useAppSelector } from "../../app/hooks";
import { ProgressSpinner } from "primereact/progressspinner";

export interface IQuestionsProps {
  questions: IQuestion[];
}

export const QuestionsPage = ({ questions }: IQuestionsProps) => {
  const _loadingQuestions = useAppSelector(state => state.questions.loadingQuestions);
  return <>
    {
      _loadingQuestions &&
      <div className="flex justify-center items-center">
        <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="var(--surface-ground)"
                         animationDuration=".5s" />
      </div>

    }

    {
      !_loadingQuestions &&
      <div className="grid grid-cols-3 gap-4">
        {
          questions.map(((question: IQuestion, index: number) =>
              <QuestionComponent key={index} question={question} />
          ))
        }
      </div>
    }
  </>;
};
