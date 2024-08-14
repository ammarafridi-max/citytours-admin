import styles from "./Navigation.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.Navigation}>
      <div className={styles.NavigationContent}>
        <NavButton to="/">Dashboard</NavButton>

        <NavDropdown title="Blogs" pathname="/blogs" location={location}>
          <NavDropdownOption to="/blogs">All Blogs</NavDropdownOption>
          <NavDropdownOption to="/blogs/create">New Blog</NavDropdownOption>
        </NavDropdown>

        <NavDropdown
          title="Destinations"
          pathname="/destinations"
          location={location}
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
      </div>
    </nav>
  );
}

function NavButton(props) {
  return (
    <NavLink to={props.to}>
      <button className={styles.Btn}>{props.children}</button>
    </NavLink>
  );
}

function NavDropdown({ title, children, pathname, location }) {
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
      >
        {title}{" "}
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
