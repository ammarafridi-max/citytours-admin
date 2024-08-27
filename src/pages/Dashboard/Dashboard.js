import styles from "./Dashboard";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { PrimarySection } from "../../components/Sections/Sections";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <PrimarySection>
        <h1>Home</h1>
      </PrimarySection>
    </>
  );
}
