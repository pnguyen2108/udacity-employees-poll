import type {IQuestionAnswer, IQuestionFormat, IQuestions} from "./src/models/questions.model";
import {formatQuestion} from "./src/helpers/control.helpers";
import type {IUser, IUsers} from "./src/models/users.model";
import {isNil as _isNil} from "lodash"

export let questions: IQuestions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
            votes: ["sarahedo"],
            text: "have horrible short term memory"
        },
        optionTwo: {
            votes: [],
            text: "have horrible long term memory"
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "johndoe",
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: "become a superhero"
        },
        optionTwo: {
            votes: ["johndoe", "sarahedo"],
            text: "become a supervillian"
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "sarahedo",
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: "be telekinetic"
        },
        optionTwo: {
            votes: ["sarahedo"],
            text: "be telepathic"
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: "loxhs1bqm25b708cmbf3g",
        author: "tylermcginnis",
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: "be a front-end developer"
        },
        optionTwo: {
            votes: ["sarahedo"],
            text: "be a back-end developer"
        }
    },
    "vthrdm985a262al8qx3do": {
        id: "vthrdm985a262al8qx3do",
        author: "tylermcginnis",
        timestamp: 1489579767190,
        optionOne: {
            votes: ["tylermcginnis"],
            text: "find $50 yourself"
        },
        optionTwo: {
            votes: ["johndoe"],
            text: "have your best friend find $500"
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: "xj352vofupe1dqz9emx13r",
        author: "johndoe",
        timestamp: 1493579767190,
        optionOne: {
            votes: ["johndoe"],
            text: "write JavaScript"
        },
        optionTwo: {
            votes: ["tylermcginnis"],
            text: "write Swift"
        }
    }
};

export let users: IUsers = {
    sarahedo: {
        id: "sarahedo",
        password: "Udacity123!",
        name: "Sarah Edo",
        avatarURL: "https://media.istockphoto.com/id/1331329483/vector/female-avatar-icon.jpg?s=612x612&w=0&k=20&c=VPS89ZjzR7Ft7YkJWCg2ItTQTeIhdXjEut-Hc1gcpPI=",
        answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            "am8ehyc8byjqgar0jgpub9": "optionTwo",
            "loxhs1bqm25b708cmbf3g": "optionTwo"
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
    },
    tylermcginnis: {
        id: "tylermcginnis",
        password: "Udacity123!",
        name: "Tyler McGinnis",
        avatarURL: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
        answers: {
            "vthrdm985a262al8qx3do": "optionOne",
            "xj352vofupe1dqz9emx13r": "optionTwo"
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
    },
    johndoe: {
        id: "johndoe",
        password: "Udacity123!",
        name: "John Doe",
        avatarURL: "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small/man-avatar-icon-free-vector.jpg",
        answers: {
            "xj352vofupe1dqz9emx13r": "optionOne",
            "vthrdm985a262al8qx3do": "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne"
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
    }
};

export const setLogin = (username: string, password: string) => {
    return new Promise<IUser>((resolve, reject) => {

        if (Object.keys(users).includes(username)) {
            const userData: IUser = users[username];

            if (userData.password !== password) {
                reject("Username or Password is incorrect");

                return;
            }

            return resolve(userData);

        } else {
            reject("Username or Password is incorrect");
        }
    });
};

export const _getAllUsers = () => {
    return new Promise((res) => {
        setTimeout(() => res({...users}), 1000);
    });
};

export const _getUserDetail = (userId: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Object.keys(users).includes(userId)) {
                return resolve(users[userId]);
            } else {
                reject("User not found");
            }
        }, 1000);
    });
};

export const _getQuestions = () => {
    return new Promise((res) => {
        setTimeout(() => res({...questions}), 1000);
    });
};

export const _getQuestionDetail = (questionId: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Object.keys(questions).includes(questionId)) {
                return resolve(questions[questionId]);
            } else {
                reject("Question not found");
            }
        }, 1000);
    });
};


export const _saveQuestion = (question: IQuestionFormat) => {
    return new Promise((res) => {
        const authedUser: string = question.author;

        if (!_isNil(users[authedUser])) {
            const formattedQuestion = formatQuestion(question);

            setTimeout(() => {
                questions = {
                    ...questions,
                    [formattedQuestion.id]: formattedQuestion
                };

                users = {
                    ...users,
                    [authedUser]: {
                        ...users[authedUser],
                        questions: users[authedUser]['questions'].concat([formattedQuestion.id])
                    }
                };

                res(questions);
            }, 1000);
        } else{
            res(questions);
        }
    });
};

export const _saveQuestionAnswer = ({authedUser, qid, answer}: IQuestionAnswer) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!_isNil(users[authedUser])) {
                users = {
                    ...users,
                    [authedUser]: {
                        ...users[authedUser],
                        answers: {
                            ...users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                };
            }

            if (!_isNil(questions[qid]) && !_isNil(users[authedUser])) {
                questions = {
                    ...questions,
                    [qid]: {
                        ...questions[qid],
                        [answer]: {
                            ...questions[qid][answer],
                            votes: questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                };
            }

            resolve(questions)
        }, 500)
    })
};

