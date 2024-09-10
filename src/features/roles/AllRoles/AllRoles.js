import { useRoles } from "../useRoles";

export default function AllRoles() {
  const { roles } = useRoles();

  return <h1>All Roles</h1>;
}
