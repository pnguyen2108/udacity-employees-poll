import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { Password } from "primereact/password";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authLogin } from "../../store/authSlice.store";
import { Toast } from "primereact/toast";
import "./Login.page.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const toast = useRef(null);

  const navigate = useNavigate();

  const _storeIsAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const _storeIsLoading = useAppSelector(state => state.auth.isLoading);

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onSubmitForm = (event: any) => {
    event.preventDefault();

    if (!username || !password) {
      (toast.current! as any).show({
        severity: "error",
        summary: "Error",
        detail: "Username and Password are required",
        life: 2000
      });

      return;
    }

    dispatch(authLogin({ username, password })).unwrap().catch((error) => {
      (toast.current! as any).show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 2000
      });
    });
  };

  useEffect(() => {
    setIsLoading(_storeIsLoading);
  }, [
    _storeIsLoading
  ]);

  useEffect(() => {
    if (_storeIsAuthenticated) {
      const queryParams = new URLSearchParams(window.location.search);

      const redirectParams = queryParams.get("redirect");

      navigate(redirectParams || "/");
    }
  }, [
    _storeIsAuthenticated
  ]);

  return <div className="bg-gray-200 h-screen flex justify-center items-center">
    <Toast ref={toast} />

    <form onSubmit={onSubmitForm} className="bg-white shadow-xl rounded-xl login-form w-[500px] h-[350px]">
      <div className=" my-4 mx-auto w-[400px]">
        <h3 className="text-3xl  text-violet-600 text-center">Employee Polls</h3>

        <div className="flex flex-col mt-5">
          <label className="font-semibold mb-1">Username</label>
          <InputText
            className="border-gray-300 border rounded-md h-10 w-full px-2"
            value={username} onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div className="flex flex-col mt-8">
          <label className="font-semibold mb-1">Password</label>

          <Password
            autoComplete="off"
            feedback={false}
            tabIndex={1}
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="w-full btn text-center h-10 flex items-center justify-center cursor-pointer
                              bg-violet-500 hover:bg-violet-600 rounded-md text-white ra mt-5" onSubmit={onSubmitForm}
                type="submit">
          {
            isLoading ?
              <i className=" ml-2 pi pi-spin pi-spinner"></i> : "Login"
          }
        </button>
      </div>
    </form>
  </div>;

};