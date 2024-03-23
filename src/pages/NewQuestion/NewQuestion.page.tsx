import "./NewQuestion.page.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {InputText} from "primereact/inputtext";
import {useRef, useState} from "react";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {addAnswer} from "../../store/questionsSlice.store";
import {useNavigate} from "react-router-dom";

export const NewQuestionPage = () => {
    const toast = useRef(null);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const _currUser = useAppSelector(state => state.auth.userData);

    const [firstOption, setFirstOption] = useState<string>("");

    const [secondOption, setSecondOption] = useState<string>("");

    const _isLoading = useAppSelector(state => state.questions.loadingSaveAnswer);

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        const error = []

        if (!firstOption) {
            error.push({
                severity: "error",
                summary: "Error",
                detail: "First Option is required",
                life: 2000
            });
        }

        if (!secondOption) {
            error.push({
                severity: "error",
                summary: "Error",
                detail: "Second Option is required",
                life: 2000
            });
        }

        if (error.length > 0) {
            (toast.current! as any).show(error);

            return
        }



        dispatch(addAnswer({
            author: _currUser.id,
            optionOneText: firstOption,
            optionTwoText: secondOption
        }));

        navigate('/', {replace: true})
    };

    return <div
        className="card  bg-white shadow-2xl shadow-gray-300  flex px-3 py-5 flex-col justify-center items-center">
        <Toast ref={toast}/>

        <h1 className="font-bold text-center text-3xl"> Would You Rather </h1>

        <h3 className="text-gray-500 text-center text-1xl"> Create Your Own Poll </h3>

        <form onSubmit={onSubmitForm} className="mt-5 flex flex-col gap-4 w-[700px]">
      <span className="w-full">
        <span className="font-semibold mb-1">First option</span>

        <InputText
            maxLength={500}
            placeholder="Option one"
            className="border-gray-300 border rounded-md h-10 w-full px-2"
            value={firstOption} onChange={(e) => setFirstOption(e.target.value)}/>
      </span>

            <span className="w-full">
                <span className="font-semibold mb-1">Second option</span>

        <InputText
            maxLength={500}
            placeholder="Option two"
            className="border-gray-300 border rounded-md h-10 w-full px-2"
            value={secondOption} onChange={(e) => setSecondOption(e.target.value)}/>
      </span>

            <Button label="Submit" onClick={onSubmitForm}
                    className="bg-violet-500 hover:bg-violet-600"/>
        </form>
    </div>;
};