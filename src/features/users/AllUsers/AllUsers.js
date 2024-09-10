import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useUsers } from "../useUsers";

export default function AllUsers() {
  const { users } = useUsers();

  console.log(users);

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>
    </>
  );
}
