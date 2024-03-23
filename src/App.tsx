import "./App.scss";
import "primereact/resources/themes/tailwind-light/theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primeicons/primeicons.css";
import { HomePage } from "./pages/Home/Home.page";
import { LeaderboardPage } from "./pages/Leaderboard/Leaderboard.page";
import { AppLayoutPage } from "./pages/AppLayout/AppLayout.page";
import { AuthGuardComponent } from "./components/AuthGuard/AuthGuard.component";
import { LoginPage } from "./pages/Login/Login.page";
import { NotFoundPage } from "./pages/NotFound/NotFound.page";
import { NewQuestionPage } from "./pages/NewQuestion/NewQuestion.page";
import { useEffect } from "react";
import { fetchQuestions } from "./store/questionsSlice.store";
import { useAppDispatch } from "./app/hooks";
import { QuestionDetailPage } from "./pages/QuestionDetail/QuestionDetail.page";

const App = () => {
  const  dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return <BrowserRouter>
    <AuthGuardComponent>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/add" element={<NewQuestionPage />} />
          <Route path="/questions/:question_id" element={<QuestionDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthGuardComponent>
  </BrowserRouter>;
};
export default App;
