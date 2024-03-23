import {describe, expect} from "vitest";
import {store} from "./app/store";
import {fetchUsers, userInitialState} from "./store/usersSlice.store";
import {questions, users} from "../_DATA";
import {authInitialState, authLogin, logout} from "./store/authSlice.store";
import {addQuestion, fetchQuestions, questionsInitialState, setQuestionAnswer} from "./store/questionsSlice.store";
import {IQuestionAnswer, IQuestionFormat} from "./modes/questions.model";
import {fireEvent, getByText, render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import App from "./App";

describe('App', () => {
    describe('Redux auth state test', () => {
        it('auth init state test', async () => {
            expect(store.getState().auth).toEqual(authInitialState)
        });

        it('login test', async () => {
            await store.dispatch(authLogin({
                username: users.sarahedo.id,
                password: users.sarahedo.password
            }));

            expect(store.getState().auth?.userData).toEqual(users.sarahedo)
        })

        it('logout test', () => {
            store.dispatch(logout())

            expect(store.getState().auth).toEqual(authInitialState)
        })
    })

    describe('Redux users state test', () => {
        it('user init state test', async () => {
            expect(store.getState().users).toEqual(userInitialState)
        });

        it('fetchUsers test', async () => {
            await store.dispatch(fetchUsers());

            expect(store.getState().users?.users).toEqual(Object.values(users))
        })
    })

    describe('Redux questions state test', () => {
        it('questions init state test', async () => {
            expect(store.getState().questions).toEqual(questionsInitialState)
        });

        it('fetchQuestions test', async () => {
            await store.dispatch(fetchQuestions());

            expect(store.getState().questions?.questions).toEqual(questions)
        })

        it('saveQuestionAnswer success test', async () => {
            const questionId = "am8ehyc8byjqgar0jgpub9"

            const question = questions[questionId]

            const answer: IQuestionAnswer = {
                qid: questionId,
                authedUser: users.johndoe.id,
                answer: 'optionTwo'
            }

            const currOptionTwoVotes = question.optionTwo.votes.length;

            await store.dispatch(setQuestionAnswer(answer))

            const stateQuestion = store.getState().questions?.questions[questionId]

            expect(stateQuestion.optionTwo.votes.length).toBeGreaterThan(currOptionTwoVotes)

        })

        it('saveQuestionAnswer failed test', async () => {
            const questionId = "am8ehyc8byjqgar0jgpub9"

            const question = questions[questionId]

            const answer: IQuestionAnswer = {
                qid: questionId,
                authedUser: '111',
                answer: 'optionTwo'
            }

            const currOptionTwoVotes = question.optionTwo.votes.length;

            await store.dispatch(setQuestionAnswer(answer))

            const stateQuestion = store.getState().questions?.questions[questionId]

            expect(stateQuestion.optionTwo.votes.length).toEqual(currOptionTwoVotes)

        })

        it('saveQuestion success test', async () => {
            const question: IQuestionFormat = {
                author: users.johndoe.id,
                optionOneText: 'optionOne',
                optionTwoText: 'optionTwo'
            }

            const currQuestionsLength = Object.keys(questions).length

            await store.dispatch(addQuestion(question))

            const stateQuestionsLength = Object.keys(store.getState().questions?.questions).length;

            expect(stateQuestionsLength).toBeGreaterThan(currQuestionsLength)
        })

        it('saveQuestion failed test', async () => {
            const question: IQuestionFormat = {
                author: '222',
                optionOneText: 'optionOne',
                optionTwoText: 'optionTwo'
            }

            const currQuestionsLength = Object.keys(questions).length

            await store.dispatch(addQuestion(question))

            const stateQuestionsLength = Object.keys(store.getState().questions?.questions).length;

            expect(stateQuestionsLength).toEqual(currQuestionsLength)
        })
    })

    describe('Render test', () => {
        it('init page render test', async () => {
            const initAppContainer = render(
                <React.StrictMode>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </React.StrictMode>
            );

            expect(initAppContainer).toMatchSnapshot();
        });

        it('fireEvent test', () => {
            const initAppContainer = render(
                <React.StrictMode>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </React.StrictMode>
            );

            const button = initAppContainer.getByText('Login')

            fireEvent.click(button)

            expect(initAppContainer.getByText('Login')).toBeDefined()
        });
    })
});