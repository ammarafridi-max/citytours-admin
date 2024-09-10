import styles from "./Login.module.css";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading/Loading";
import Feedback from "../../../components/Feedback/Feedback";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, setIsLoading } = useContext(AuthContext);
  const credentials = { username, password };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(credentials);
    try {
      if (!username && !password)
        return setFeedback("Both fields are required");

      if (!username) return setFeedback("Username is required");

      if (!password) return setFeedback("Password is required");
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        login(data.data);
        navigate("/");
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
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
              onChange={(e) => {
                setFeedback("");
                setUsername(e.target.value);
              }}
            />
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setFeedback("");
                setPassword(e.target.value);
              }}
            />
            {feedback && <Feedback type="error">{feedback}</Feedback>}
            <div className="text-center">
              <PrimaryButton type="submit">Login</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
