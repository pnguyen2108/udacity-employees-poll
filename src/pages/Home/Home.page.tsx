import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import type { IQuestion } from "../../modes/questions.model";
import { cloneDeep as _cloneDeep } from "lodash";
import { QuestionsPage } from "../Questions/Questions.page";
import { fetchQuestions } from "../../store/questionsSlice.store";
import { fetchUserDetail } from "../../store/usersSlice.store";

export const HomePage = () => {

  const dispatch = useAppDispatch();

  const _getQuestions = useAppSelector(state => state.questions.questions);

  const _userData = useAppSelector(state => state.auth.userData);

  const [answeredQuestions, setAnsweredQuestions] = useState<IQuestion[]>([]);

  const [newQuestions, setNewQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  useEffect(() => {
    const answeredQuestions: IQuestion[] = [];

    const unanswerQuestions: IQuestion[] = [];

    Object.entries(_getQuestions).forEach((question: any[]) => {
      const questionValue: IQuestion = question[1];

      const optionOne = questionValue.optionOne;

      const optionTwo = questionValue.optionTwo;

      if (optionOne.votes.includes(_userData.id) || optionTwo.votes.includes(_userData.id) ) {
        answeredQuestions.push(questionValue);
      } else {
        unanswerQuestions.push(questionValue);
      }

    });

    setAnsweredQuestions(_cloneDeep(answeredQuestions));

    setNewQuestions(_cloneDeep(unanswerQuestions));

  }, [_getQuestions]);

  return <div className="bg-white card shadow-xl">
    <TabView>
      <TabPanel
        header="New Questions">
        <QuestionsPage questions={newQuestions} />
      </TabPanel>
      <TabPanel
        header="Done">
        <QuestionsPage questions={answeredQuestions} />
      </TabPanel>
    </TabView>
  </div>;
};