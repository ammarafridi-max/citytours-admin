import { formatDate } from "../../../utils/formatDate";
import { Helmet } from "react-helmet";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import Loading from "../../../components/Loading/Loading";
import { PrimarySection } from "../../../components/Sections/Sections";
import { useUsers } from "../useUsers";
import { useRoles } from "../../roles/useRoles";

export default function CreateUser() {
  const { isLoading, newUser, setNewUser, statusOptions, handleCreateUser } =
    useUsers();
  const { roles } = useRoles();

  const handleChange = (state) => (e) => {
    const value =
      state === "profilePicture" ? e.target.files[0] : e.target.value;
    setNewUser((prevState) => {
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

  return (
    <>
      {isLoading && <Loading />}

      <Helmet>
        <title>Create User</title>
      </Helmet>

      <h1>Create User</h1>

      <BasicInformation
        newUser={newUser}
        handleChange={handleChange}
        roles={roles}
        statusOptions={statusOptions}
      />

      <div className="text-center mt-5">
        <PrimaryButton type="submit" onClick={handleCreateUser}>
          Create User
        </PrimaryButton>
      </div>
    </>
  );
}

function BasicInformation({ newUser, handleChange, roles, statusOptions }) {
  return (
    <PrimarySection>
      <h2>Basic Information</h2>

      <InputGroup
        groupType="long"
        label="Date Created"
        name="dateCreated"
        value={formatDate(newUser.dateCreated)}
        type="text"
        onChange={handleChange("dateCreated")}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Name"
        name="name"
        value={newUser.name}
        type="text"
        onChange={handleChange("name")}
      />

      <InputGroup
        groupType="long"
        label="Username"
        name="username"
        value={newUser.username}
        type="text"
        onChange={handleChange("username")}
      />

      <InputGroup
        groupType="long"
        label="Email"
        name="email"
        value={newUser.email}
        type="text"
        onChange={handleChange("email")}
      />

      <InputGroup
        groupType="long"
        label="Password"
        name="password"
        value={newUser.password}
        type="password"
        onChange={handleChange("password")}
      />

      <InputGroup
        groupType="long"
        label="Profile Picture"
        name="profilePicture"
        type="file"
        onChange={handleChange("profilePicture")}
      />

      <SelectGroup
        groupType="long"
        value={newUser.role}
        label="Role"
        onChange={handleChange("role")}
      >
        <option value=""></option>
        {roles.map((role, i) => (
          <option key={i} value={role.name}>
            {role.name}
          </option>
        ))}
      </SelectGroup>

      <SelectGroup
        groupType="long"
        value={newUser.status}
        label="Status"
        onChange={handleChange("status")}
      >
        <option value=""></option>
        {statusOptions.map((status, i) => (
          <option value={status} key={i}>
            {status}
          </option>
        ))}
      </SelectGroup>
    </PrimarySection>
  );
}
