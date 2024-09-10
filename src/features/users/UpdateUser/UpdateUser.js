import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useUsers } from "../UserContext";
import { useRoles } from "../../roles/useRoles";
import { PrimarySection } from "../../../components/Sections/Sections";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { formatDate } from "../../../utils/formatDate";

export default function UpdateUser() {
  const { username } = useParams();
  const {
    currentUser,
    setCurrentUser,
    statusOptions,
    newPassword,
    setNewPassword,
    setIsLoading,
  } = useUsers(username);
  const { roles } = useRoles();

  const handleChange = (state) => (e) => {
    const value =
      state === "profilePicture" ? e.target.files[0] : e.target.value;
    setCurrentUser((prevState) => {
      let newState = { ...prevState, [state]: value };
      if (state === "role") {
        const selectedRole = roles.find((role) => role.name === value);
        if (selectedRole) {
          newState = {
            ...newState,
            permissions: selectedRole.permissions,
          };
        }
      }
      return newState;
    });
  };

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
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Include this to specify JSON
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await res.json(); // Add await here to properly resolve the JSON
      console.log(updatedUser);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Update User</title>
      </Helmet>
      <h1>Update User</h1>
      <PrimarySection>
        <form onSubmit={handleUpdateUser}>
          <InputGroup
            groupType="long"
            label="Date Created"
            name="dateCreated"
            value={formatDate(currentUser.dateCreated)}
            disabled
          />

          <InputGroup
            groupType="long"
            label="Date Updated"
            name="dateUpdated"
            value={currentUser.dateUpdated}
            disabled
          />

          <InputGroup
            groupType="long"
            label="Name"
            name="name"
            type="text"
            value={currentUser.name}
            onChange={handleChange("name")}
          />

          <InputGroup
            groupType="long"
            label="Username"
            name="username"
            type="text"
            value={currentUser.username}
            onChange={handleChange("username")}
          />

          <InputGroup
            groupType="long"
            label="Email"
            name="email"
            type="text"
            value={currentUser.email}
            onChange={handleChange("email")}
          />

          <InputGroup
            groupType="long"
            label="Password"
            name="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputGroup
            groupType="long"
            label="Profile Picture"
            name="profilePicture"
            type="file"
            // value={currentUser.profilePicture}
          />

          <SelectGroup
            groupType="long"
            label="Role"
            value={currentUser.role}
            onChange={handleChange("role")}
          >
            {roles.map((role, i) => (
              <option key={i} value={role.name}>
                {role.name}
              </option>
            ))}
          </SelectGroup>

          <SelectGroup
            groupType="long"
            label="Role"
            value={currentUser.status}
            onChange={handleChange("status")}
          >
            {statusOptions.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </SelectGroup>

          <div className="text-center mt-5">
            <PrimaryButton type="submit">Update</PrimaryButton>
          </div>
        </form>
      </PrimarySection>
    </>
  );
}
