import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUsers(username) {
  const initialUserState = {
    dateCreated: new Date(),
    dateUpdated: "",
    lastLogin: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    permissions: {},
    status: "",
    profilePicture: "",
  };
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    ...initialUserState,
  });
  const [currentUser, setCurrentUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertBox, setAlertBox] = useState({
    showAlertBox: false,
    title: "",
    type: "info",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const statusOptions = ["Active", "Inactive", "Suspended"];
  const navigate = useNavigate();

  // -------------------- GET ALL USERS --------------------

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.data);
        } else {
          setAlertBox({
            showAlertBox: true,
            type: "error",
            title: data.message,
            message: "Could not fetch users!",
          });
        }
      } catch (error) {
        setAlertBox({
          showAlertBox: true,
          type: "error",
          title: "An error occurred",
          message: "Could not fetch users!",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllUsers();
  }, []);

  // -------------------- GET A USER --------------------

  useEffect(() => {
    async function fetchUser() {
      if (!username) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/read/${username}`
        );
        if (!res.ok) {
          setAlertBox({
            showAlertBox: true,
            type: "error",
            title: "Error",
            message: `Could not fetch user with username: ${username}!`,
          });
          return; // Exit function if the response is not okay
        }

        const data = await res.json();
        setCurrentUser(data.data);

        setAlertBox({
          showAlertBox: true,
          type: "success",
          title: "Success",
          message: `User data for ${username} has been successfully fetched!`,
        });
      } catch (error) {
        setAlertBox({
          showAlertBox: true,
          type: "error",
          title: "Error",
          message: `An error occurred while fetching the user: ${error.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  // -------------------- CREATE NEW USER --------------------

  async function handleCreateUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("User created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error creating user: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  // -------------------- UPDATE A USER --------------------

  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedUser = {
        ...currentUser,
        dateUpdated: new Date(),
        password: newPassword || currentUser.password, // Maintain password if not changed
      };
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/update/${username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("User updated successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error updating user: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  // -------------------- DELETE A USER --------------------

  async function handleDeleteUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/delete/${username}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error deleting user: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  // RETURN

  return {
    navigate,
    users,
    newUser,
    currentUser,
    isLoading,
    newPassword,
    showModal,
    statusOptions,
    alertBox,
    setUsers,
    setNewUser,
    setCurrentUser,
    setIsLoading,
    setNewPassword,
    setShowModal,
    setAlertBox,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  };
}
