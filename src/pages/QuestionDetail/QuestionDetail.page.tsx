import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchQuestionDetail, setQuestionAnswer} from "../../store/questionsSlice.store";
import {ProgressSpinner} from "primereact/progressspinner";
import {fetchUserDetail} from "../../store/usersSlice.store";
import {Avatar} from "primereact/avatar";
import "./QuestionDetail.page.scss";
import {Checkbox} from "primereact/checkbox";
import {cloneDeep as _cloneDeep} from "lodash";
import {Knob} from "primereact/knob";

export const QuestionDetailPage = () => {
        const dispatch = useAppDispatch();

        const navigate = useNavigate();

        const {question_id} = useParams()
        ;
        const [optionOne, setOptionOne] = useState<any>(null);

        const [optionTwo, setOptionTwo] = useState<any>(null);

        const _questionDetail = useAppSelector(state => state.questions.questionDetail);

        const _currUser = useAppSelector(state => state.auth.userData);

        const _userDetail = useAppSelector(state => state.users.userDetail);

        const _loadingQuestionDetail = useAppSelector(state => state.questions.loadingDetail);

        const _loadingUserDetail = useAppSelector(state => state.users.loadingUserDetail);

        const [isSelected, setIsSelected] = useState("");

        useEffect(() => {
            if (question_id) {
                dispatch(fetchQuestionDetail(question_id)).unwrap().catch(
                    error => {
                        if (error) {
                            navigate("/404", {replace: true});
                        }
                    }
                );
            } else {
                navigate("/404", {replace: true});
            }


        }, [question_id]);

        useEffect(() => {
            if (_questionDetail) {
                let selectedOption = "";

                dispatch(fetchUserDetail(_questionDetail!.author));

                if (_questionDetail.optionOne.votes.includes(_currUser!.id)) {
                    selectedOption = "optionOne";
                }

                if (_questionDetail.optionTwo.votes.includes(_currUser!.id)) {
                    selectedOption = "optionTwo";
                }

                setIsSelected(selectedOption);

                setOptionOne(_cloneDeep(_questionDetail.optionOne.votes));

                setOptionTwo(_cloneDeep(_questionDetail.optionTwo.votes));
            }
        }, [_questionDetail]);

        const onClickCheckbox = (optionValue: "optionOne" | "optionTwo") => {
            if (isSelected) {
                return;
            }

            if(optionValue === 'optionOne') {
                setOptionOne([...optionOne,_currUser.id])
            }

            if(optionValue === 'optionTwo') {
                setOptionTwo([...optionTwo,_currUser.id])
            }

            setIsSelected(optionValue);

            dispatch(setQuestionAnswer({
                qid: _questionDetail!.id,
                answer: optionValue,
                authedUser: _currUser.id
            }));
        };

        const calcOptionOne = () => {
            if (
                (!optionOne && !optionTwo) ||
                (optionOne.length === 0 && optionTwo.length === 0)) {
                return 0;
            }

            return ((optionOne.length / (optionOne.length + optionTwo.length)) * 100).toFixed(1);
        };

        return <div className="flex flex-col min-h-[500px] h-fit justify-center items-center bg-white shadow-xl card">
            {
                (_loadingQuestionDetail || _loadingUserDetail) &&
                <ProgressSpinner style={{width: "50px", height: "50px"}} strokeWidth="8" fill="var(--surface-ground)"
                                 animationDuration=".5s"/>
            }

            {
                !_loadingQuestionDetail &&
                !_loadingUserDetail &&
                <div className="flex flex-col justify-center items-center gap-3">

          <span className="font-extrabold text-2xl">
          Poll by {_questionDetail?.author}
          </span>

                    <Avatar className="p-avatar-custom" image={_userDetail?.avatarURL}/>

                    <span className="font-extrabold text-4xl">
                        Would You Rather
                     </span>

                    <div className="grid grid-cols-2 gap-x-[180px]">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex cursor-pointer">
                                <Checkbox onChange={() => onClickCheckbox("optionOne")} inputId="optionOne"
                                          checked={isSelected === "optionOne"}/>

                                <label htmlFor="optionOne" className="ml-2">{_questionDetail?.optionOne.text}</label>
                            </div>

                            <div className=" flex flex-col justify-center items-center gap-2 mt-5">
                                <Knob disabled value={calcOptionOne()} valueTemplate={"{value}%"}/>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="flex cursor-pointer">
                                <Checkbox onChange={() => onClickCheckbox("optionTwo")} inputId="optionTwo"
                                          checked={isSelected === "optionTwo"}/>

                                <label htmlFor="optionTwo" className="ml-2">{_questionDetail?.optionTwo.text}</label>
                            </div>

                            <div className=" flex flex-col justify-center items-center gap-2 mt-5">
                                <Knob disabled value={
                                    (!optionOne && !optionTwo) ||
                                    (optionOne.length === 0 && optionTwo.length === 0) ? 0 :
                                        100 - (calcOptionOne() as number)
                                } valueTemplate={"{value}%"}/>
                            </div>
                        </div>

                        <div className=" mt-3 flex flex-col justify-start items-center gap-3 ">
                            {
                                optionOne &&
                                optionOne.map((item: string) =>
                                    <p><span className="font-semibold">{item}</span> has voted for this option</p>
                                )
                            }
                        </div>

                        <div className=" mt-3 flex flex-col justify-start items-center gap-3 ">
                            {
                                optionTwo &&
                                optionTwo.map((item: string) =>
                                    <p><span className="font-semibold">{item}</span> has voted for this option</p>
                                )
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
            ;
    }
;