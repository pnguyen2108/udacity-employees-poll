import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { IUser } from "../../models/users.model";
import { useEffect, useState } from "react";
import { fetchUsers, getUsers } from "../../store/usersSlice.store";

import { DataTable  } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";


export const LeaderboardPage = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<IUser[]>([]);

  const _getUsers = useAppSelector(getUsers);

  const _loadingUsers = useAppSelector(state => state.users.loadingUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const users: IUser[] = [];

    _getUsers.forEach((user: IUser) => {
      users.push({
        ...user,
        questionLength: user.questions.length,
        answeredLength: Object.keys(user.answers).length
      });
    });

    setUsers(users);

  }, [_getUsers]);

  const userTemplate = (rowData: IUser) => {
    return (
      <div className="flex items-center gap-3 ">
        <Avatar size="large" image={rowData.avatarURL} shape="circle" />
        <div className="flex flex-col">
          <span className="font-bold text-2xl">{rowData.name}</span>
          <span className="text-md font-light text-gray-400">{rowData.id}</span>
        </div>
      </div>
    );
  };

  const answeredTemplate = (rowData: IUser) => {
    return (
      <span className="flex w-full justify-center items-center">{rowData.answeredLength}</span>
    );
  };

  const createdTemplate = (rowData: IUser) => {
    return (
      <span className="flex w-full justify-center items-center">{rowData.questionLength}</span>
    );
  };

  return <div className="card shadow-xl bg-white">
    <DataTable value={users} sortField="answeredLength" sortOrder={-1}
               loading={_loadingUsers} tableStyle={{ minWidth: "50rem" }}>
      <Column field="users" body={userTemplate} header="UsersModel" style={{ width: "70%" }}></Column>
      <Column field="answeredLength" body={answeredTemplate} header="Answered" sortable style={{ width: "15%" }}></Column>
      <Column field="questionLength" body={createdTemplate} header="Created" sortable style={{ width: "15%" }}></Column>
    </DataTable>
  </div>;
};