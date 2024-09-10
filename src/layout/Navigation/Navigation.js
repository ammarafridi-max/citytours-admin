import styles from "./Navigation.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../../features/auth/AuthContext";

export default function Navigation() {
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  function handleClick() {
    console.log(user);
  }

  return (
    <nav className={styles.Navigation}>
      <div className={styles.NavigationContent}>
        <NavButton to="/" onClick={handleClick}>
          Home
        </NavButton>

        <NavDropdown
          title="Blogs"
          pathname="/blogs"
          location={location}
          icon={<MdEdit />}
        >
          <NavDropdownOption to="/blogs">All Blogs</NavDropdownOption>
          <NavDropdownOption to="/blogs/create">New Blog</NavDropdownOption>
        </NavDropdown>

        <NavDropdown
          title="Destinations"
          pathname="/destinations"
          location={location}
          icon={<FaLocationDot />}
        >
          <NavDropdownOption to="/destinations">
            All Destinations
          </NavDropdownOption>
          <NavDropdownOption to="/destinations/create">
            New Destination
          </NavDropdownOption>
        </NavDropdown>

        <NavDropdown title="Tours" pathname="/tours" location={location}>
          <NavDropdownOption to="/tours">All Tours</NavDropdownOption>
          <NavDropdownOption to="/tours/create">New Tour</NavDropdownOption>
        </NavDropdown>

        <NavDropdown title="Users" pathname="/users" location={location}>
          <NavDropdownOption to="/users">All Users</NavDropdownOption>
          <NavDropdownOption to="/users/create">New User</NavDropdownOption>
          <NavDropdownOption to="/roles">Roles</NavDropdownOption>
          <NavDropdownOption to="/roles/create">New Role</NavDropdownOption>
        </NavDropdown>

        <NavDropdown title="General Settings" location={location}>
          <NavDropdownOption to="/tours">Terms & Conditions</NavDropdownOption>
          <NavDropdownOption to="/tours/create">
            Privacy Policy
          </NavDropdownOption>
          <NavDropdownOption to="/tours/create">Social Links</NavDropdownOption>
          <NavDropdownOption to="/tours/create">
            Contact Information
          </NavDropdownOption>
        </NavDropdown>

        <NavButton onClick={logout}>Log Out</NavButton>
      </div>
    </nav>
  );
}

function NavButton({ to, children, icon, onClick }) {
  return (
    <NavLink to={to}>
      <button className={styles.Btn} onClick={onClick}>
        {/* <span className={styles.icon}>
          <AiFillHome />
        </span> */}
        {children}
      </button>
    </NavLink>
  );
}

function NavDropdown({ title, children, pathname, location, icon, disabled }) {
  const [showOptions, setShowOptions] = useState(
    location.pathname.includes(pathname)
  );

  function toggleOptions() {
    setShowOptions((prev) => !prev);
  }

  return (
    <>
      <button
        className={`${styles.Btn} ${styles.Dropdown}`}
        onClick={toggleOptions}
        disabled={disabled}
      >
        {/* <span className={styles.icon}>{icon}</span> */}
        {title}
        <FaChevronDown className={showOptions ? styles.Up : styles.Down} />
      </button>
      <div className={showOptions ? styles.Options : styles.Hidden}>
        {children}
      </div>
    </>
  );
}

function NavDropdownOption(props) {
  return (
    <NavLink to={props.to}>
      <button className={styles.Btn}>{props.children}</button>
    </NavLink>
  );
}
