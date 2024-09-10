import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialData = {
  name: "",
  permissions: {
    blogs: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    destinations: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    tours: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    users: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  },
};

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // GET ALL ROLES

  useEffect(() => {
    async function getRoles() {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`);
        const data = await res.json();
        setRoles(data.data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
      }
    }
    getRoles();
  }, []);

  // SUBMIT A NEW ROLE

  const handleAddNewRole = async (e) => {
    try {
      e.preventDefault();
      console.log(role);
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/roles/create`,
        {
          method: "post",
          body: JSON.stringify(role),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      alert(data.message);
      navigate("/roles");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // CHECKBOX CHANGE HANDLER

  const handleCheckboxChange = (section, field) => (e) => {
    const value = e.target.checked;
    setRole((prevState) => ({
      ...prevState,
      permissions: {
        ...prevState.permissions,
        [section]: {
          ...prevState.permissions[section],
          [field]: value,
        },
      },
    }));
  };

  // INPUT CHANGE HANDLER

  const handleInputChange = (state) => (e) => {
    setRole((prevState) => {
      const newState = { ...prevState, [state]: e.target.value };
      return newState;
    });
  };

  return {
    initialData,
    roles,
    role,
    isLoading,
    setRole,
    navigate,
    setIsLoading,
    handleAddNewRole,
    handleInputChange,
    handleCheckboxChange,
  };
}
