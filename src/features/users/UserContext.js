import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// -------------------- HOOK --------------------

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
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    ...initialUserState,
  });
  const [currentUser, setCurrentUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const statusOptions = ["Active", "Inactive", "Suspended"];
  const navigate = useNavigate();

  // -------------------- CREATE NEW USER --------------------

  async function handleCreateUser(e) {
    try {
      e.preventDefault();
      console.log(newUser);
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // -------------------- GET A USER --------------------

  useEffect(() => {
    async function fetchUser() {
      if (!username) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/get/${username}`
        );
        if (!res.ok) throw new Error("Could not fetch user");
        const data = await res.json();
        setCurrentUser(data.data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  // -------------------- UPDATE A USER --------------------

  async function handleUpdateUser(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const updatedUser = {
        ...currentUser,
        dateUpdated: new Date(),
        password: newPassword,
      };
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${username}`,
        { method: "put", body: JSON.stringify(updatedUser) }
      );
      const data = res.json();
      console.log(updatedUser);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // -------------------- DELETE A USER --------------------

  async function handleDeleteUser(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/delete/${username}`,
        { method: "delete" }
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // RETURN

  return {
    navigate,
    isLoading,
    newUser,
    currentUser,
    newPassword,
    showModal,
    setIsLoading,
    setNewPassword,
    setNewUser,
    setCurrentUser,
    setShowModal,
    statusOptions,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  };
}
