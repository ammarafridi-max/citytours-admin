import styles from "./Navigation.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className={styles.Navigation}>
      <div className={styles.NavigationContent}>
        <NavButton>Dashboard</NavButton>

        <NavDropdown title="Blogs">
          <NavDropdownOption to="/blogs">All Blogs</NavDropdownOption>
          <NavDropdownOption to="/blogs/create">New Blog</NavDropdownOption>
        </NavDropdown>

        <NavDropdown title="Destinations">
          <NavDropdownOption to="/destinations">
            All destinations
          </NavDropdownOption>
          <NavDropdownOption to="/destinations/create">
            New Destination
          </NavDropdownOption>
        </NavDropdown>

        <NavDropdown title="Tours">
          <NavDropdownOption to="/tours">All tours</NavDropdownOption>
          <NavDropdownOption to="/tours/create">New tour</NavDropdownOption>
        </NavDropdown>

        {/* <NavButton to="/bookings">Bookings</NavButton> */}

        {/* <NavDropdown title="users">
          <NavDropdownOption to="/users">All Users</NavDropdownOption>
          <NavDropdownOption to="/users/create">Add User</NavDropdownOption>
        </NavDropdown> */}
      </div>
    </nav>
  );
}

function NavButton(props) {
  return (
    <a to={props.to}>
      <button className={styles.Btn}>{props.children}</button>
    </a>
  );
}

function NavDropdown(props) {
  const [showOptions, setShowOptions] = useState(false);

  function toggleOptions() {
    !showOptions ? setShowOptions(true) : setShowOptions(false);
  }

  return (
    <>
      <button
        className={`${styles.Btn} ${styles.Dropdown}`}
        onClick={toggleOptions}
      >
        {props.title}{" "}
        <FaChevronDown className={showOptions ? styles.Up : styles.Down} />
      </button>
      <div className={showOptions ? styles.Options : styles.Hidden}>
        {props.children}
      </div>
    </>
  );
}

function NavDropdownOption(props) {
  return (
    <a href={props.to}>
      <button className={styles.Btn}>{props.children}</button>
    </a>
  );
}
