import styles from "./Login.module.css";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { Helmet } from "react-helmet";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    if (username === "ammar.afridi" && password === "password") {
      const userData = { username };
      login(userData);
      alert("Login successful");
      navigate("/");
    } else {
      return alert("Invalid credentials");
    }
  }

  return (
    <div className={styles.background}>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center">
            <PrimaryButton type="submit">Login</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
