import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import type {IQuestion, IQuestionAnswer, IQuestionFormat, IQuestions} from "../models/questions.model";
import {_getQuestionDetail, _getQuestions, _saveQuestion, _saveQuestionAnswer, questions} from "../../_DATA";

export type QuestionState = {
    questions: IQuestions,
    questionDetail: IQuestion | null,
    status: string,
    loadingDetail: boolean
    loadingSaveAnswer: boolean
    loadingQuestions: boolean
};

export const questionsInitialState: QuestionState = {
    questions: {},
    questionDetail: null,
    status: "empty",
    loadingQuestions: false,
    loadingDetail: false,
    loadingSaveAnswer: false
};

export const fetchQuestions = createAsyncThunk(
    "auth/fetchQuestions",
    async () => {
        return await _getQuestions();
    }
);

export const fetchQuestionDetail = createAsyncThunk(
    "auth/fetchQuestionDetial",
    async (questionId: string) => {
        return await _getQuestionDetail(questionId);
    }
);

export const setQuestionAnswer = createAsyncThunk(
    "auth/setQuestionAnswer",
    async (data: IQuestionAnswer) => {
        return await _saveQuestionAnswer(data)
    }
);


export const addQuestion = createAsyncThunk(
    "auth/addQuestion",
    async (data: IQuestionFormat) => {
        return await _saveQuestion(data);
    }
);

export const questionsSlice = createSlice({
    name: "questions",
    initialState: questionsInitialState,
    reducers: {},
    selectors: {
        getQuestions: (state) => {
            return state.questions;
        },
        getQuestionDetail: (state) => {
            return state.questions;
        }
    },
    extraReducers: (builder) => {
        // fetch question list
        builder
            .addCase(fetchQuestions.pending, (state: QuestionState) => {
                state.loadingQuestions = true;

                state.status = "empty";
            })
            .addCase(fetchQuestions.fulfilled, (state: QuestionState, action: any) => {

                state.questions = action.payload;

                state.status = "loaded";

                state.loadingQuestions = false;
            })
            .addCase(fetchQuestions.rejected, (state: QuestionState) => {
                state.loadingQuestions = false;

                state.status = "empty";
            });

        // fetch question detail
        builder
            .addCase(fetchQuestionDetail.pending, (state: QuestionState) => {
                state.loadingDetail = true;
            })
            .addCase(fetchQuestionDetail.fulfilled, (state: QuestionState, action: any) => {
                state.questionDetail = action.payload;

                state.loadingDetail = false;
            })
            .addCase(fetchQuestionDetail.rejected, (state: QuestionState) => {
                state.loadingDetail = false;
            });

        // set question answer
        builder
            .addCase(setQuestionAnswer.pending, (state: QuestionState) => {

                state.loadingSaveAnswer = true;
            })
            .addCase(setQuestionAnswer.fulfilled, (state: QuestionState, action: any) => {
                state.questions = action.payload;

                state.loadingDetail = false;
            })
            .addCase(setQuestionAnswer.rejected, (state: QuestionState) => {

                state.loadingSaveAnswer = false;
            });

        // add question
        builder
            .addCase(addQuestion.pending, (state: QuestionState) => {

                state.loadingSaveAnswer = true;
            })
            .addCase(addQuestion.fulfilled, (state: QuestionState, action: any) => {
                state.questions = action.payload;

                state.loadingDetail = false;
            })
            .addCase(addQuestion.rejected, (state: QuestionState) => {

                state.loadingSaveAnswer = false;
            });
    }
});
