import { useEffect } from "react";
import { Helmet } from "react-helmet";
import AlertBox from "../../../components/AlertBox/AlertBox";
import { useUsers } from "../useUsers";

export default function AllUsers() {
  const { users, alertBox } = useUsers();

  console.log(users);

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <AlertBox
        showAlertBox={alertBox.showAlertBox}
        title={alertBox.title}
        type={alertBox.type}
      >
        {alertBox.message}
      </AlertBox>
      <h1>Users</h1>
    </>
  );
}
