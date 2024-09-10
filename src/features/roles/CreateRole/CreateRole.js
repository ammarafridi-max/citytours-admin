import { useRoles } from "../useRoles";
import InputGroup from "../../../components/FormElements/InputGroup";
import Checkbox from "../../../components/FormElements/Checkbox";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Loading from "../../../components/Loading/Loading";
import { PrimarySection } from "../../../components/Sections/Sections";

export default function CreateRole() {
  const {
    role,
    isLoading,
    handleAddNewRole,
    handleCheckboxChange,
    handleInputChange,
  } = useRoles();

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleAddNewRole}>
        <h1>Create a New Role</h1>
        <PrimarySection>
          {/* Role Name */}
          <InputGroup
            groupType="long"
            label="Role Name"
            value={role.name}
            onChange={handleInputChange("name")}
          />

          <div className="mx-4">
            <BlogPermissions
              role={role}
              handleCheckboxChange={handleCheckboxChange}
            />
            <TourPermissions
              role={role}
              handleCheckboxChange={handleCheckboxChange}
            />
            <DestinationPermissions
              role={role}
              handleCheckboxChange={handleCheckboxChange}
            />
            <UserPermissions
              role={role}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="text-center mt-4">
            <PrimaryButton onClick={handleAddNewRole}>Submit</PrimaryButton>
          </div>
        </PrimarySection>
      </form>
    </>
  );
}

function BlogPermissions({ role, handleCheckboxChange }) {
  return (
    <>
      <h4 className="mt-5 mb-4">Blog Permissions</h4>

      <Checkbox
        label="Create Blog"
        checked={role.permissions.blogs.create}
        onChange={handleCheckboxChange("blogs", "create")}
      />

      <Checkbox
        label="Update Blog"
        checked={role.permissions.blogs.update}
        onChange={handleCheckboxChange("blogs", "update")}
      />

      <Checkbox
        label="Read Blog"
        checked={role.permissions.blogs.read}
        onChange={handleCheckboxChange("blogs", "read")}
      />

      <Checkbox
        label="Delete Blog"
        checked={role.permissions.blogs.delete}
        onChange={handleCheckboxChange("blogs", "delete")}
      />
    </>
  );
}

function TourPermissions({ role, handleCheckboxChange }) {
  return (
    <>
      <h4 className="mt-5 mb-4">Tour Permissions</h4>

      <Checkbox
        label="Create Tour"
        checked={role.permissions.tours.create}
        onChange={handleCheckboxChange("tours", "create")}
      />

      <Checkbox
        label="Update Tour"
        checked={role.permissions.tours.update}
        onChange={handleCheckboxChange("tours", "update")}
      />

      <Checkbox
        label="Read Tour"
        checked={role.permissions.tours.read}
        onChange={handleCheckboxChange("tours", "read")}
      />

      <Checkbox
        label="Delete Tour"
        checked={role.permissions.tours.delete}
        onChange={handleCheckboxChange("tours", "delete")}
      />
    </>
  );
}

function DestinationPermissions({ role, handleCheckboxChange }) {
  return (
    <>
      <h4 className="mt-5 mb-4">Destination Permissions</h4>

      <Checkbox
        label="Create Destination"
        checked={role.permissions.destinations.create}
        onChange={handleCheckboxChange("destinations", "create")}
      />

      <Checkbox
        label="Update Destination"
        checked={role.permissions.destinations.update}
        onChange={handleCheckboxChange("destinations", "update")}
      />

      <Checkbox
        label="Read Destination"
        checked={role.permissions.destinations.read}
        onChange={handleCheckboxChange("destinations", "read")}
      />

      <Checkbox
        label="Delete Destination"
        checked={role.permissions.destinations.delete}
        onChange={handleCheckboxChange("destinations", "delete")}
      />
    </>
  );
}

function UserPermissions({ role, handleCheckboxChange }) {
  return (
    <>
      <h4 className="mt-5 mb-4">User Permissions</h4>

      <Checkbox
        label="Create User"
        checked={role.permissions.users.create}
        onChange={handleCheckboxChange("users", "create")}
      />

      <Checkbox
        label="Update User"
        checked={role.permissions.users.update}
        onChange={handleCheckboxChange("users", "update")}
      />

      <Checkbox
        label="Read User"
        checked={role.permissions.users.read}
        onChange={handleCheckboxChange("users", "read")}
      />

      <Checkbox
        label="Delete User"
        checked={role.permissions.users.delete}
        onChange={handleCheckboxChange("users", "delete")}
      />
    </>
  );
}
