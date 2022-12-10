import CenterText from "components/center-text";
import PageHeader from "components/page-header";
import SearchBar from "components/searchbar";
import Step2 from "components/step2";
import styles from "styles/pages/home.module.scss";

const Home = () => {
  return (
    <div className={styles["page"]}>
      <PageHeader />
      <Step2 />
      <CenterText />
      <SearchBar />
    </div>
  );
};

export default Home;
