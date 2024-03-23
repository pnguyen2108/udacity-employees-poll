import { MegaMenu } from "primereact/megamenu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import type { IUser } from "../../models/users.model";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice.store";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

export const NavbarComponent = () => {

  const dispatch = useAppDispatch();

  const _userData = useAppSelector(state => state.auth.userData);

  const [userData, setUserData] = useState<IUser | null>(null);

  const onClickLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setUserData(_userData);
  }, []);

  const start = (
    <ul className="flex gap-3">
      <Link to="/">
        <li className="p-menuitem-content cursor-pointer hover:bg-gray-300 hover:rounded-md p-3 flex items-center gap-2"
            key={1}>
          <i className="p-menuitem-icon pi pi-home" style={{ fontSize: "1rem" }}></i>

          <span className="p-menuitem-text">Home</span>
        </li>
      </Link>

      <Link to="/leaderboard">
        <li className="p-menuitem-content cursor-pointer hover:bg-gray-300 hover:rounded-md p-3 flex items-center gap-2"
            key={2}>
          <i className="p-menuitem-icon pi pi-list" style={{ fontSize: "1rem" }}></i>

          <span className="p-menuitem-text">Leaderboard</span>
        </li>
      </Link>

      <Link to="/add">
        <li className="p-menuitem-content cursor-pointer hover:bg-gray-300 hover:rounded-md p-3 flex items-center gap-2"
            key={3}>
          <i className="p-menuitem-icon pi pi-plus" style={{ fontSize: "1rem" }}></i>

          <span className="p-menuitem-text">New</span>
        </li>
      </Link>
    </ul>
  );

  const end = (
    <div className="flex items-center justify-center gap-3">
      <p>  {userData?.name} </p>

      <Avatar size="large" image={userData?.avatarURL} shape="circle" />

      <button
        className="text-pink-500 text-left background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear transition-all duration-150"
        onClick={onClickLogout}
        type="button"
      >
        Logout
      </button>
    </div>
  );

  return <div className="card">
    <div className="shadow-xl">
      <MegaMenu start={start} end={end} />
    </div>
  </div>;
};