import CenterText from "components/center-text";
import FooterLogo from "components/footer-logo";
import PageHeader from "components/page-header";
import SearchBar from "components/searchbar";
import Step2 from "components/step2";
import Step1 from "components/step1";
import styles from "styles/pages/home.module.scss";
import CenterTextStep1 from "components/center-text-step1";
import OptionStep1 from "components/option-step1";
import SearchBarStep3 from "components/step3/searchbar";
import CenterTextStep3 from "components/step3/center-text";
import Step3 from "components/step3/step3";

const Home = () => {
  return (
    <div className={styles["page"]}>
      { <PageHeader />}
      {/*<Step2 />*/}
      {/* <Step1/> */}
      {/*<CenterText />*/}
      {/* <CenterTextStep1/>
      <OptionStep1/> */}
      {/*<SearchBar />*/}
      <Step3/>
      <CenterTextStep3/>
      <SearchBarStep3/>
      { <FooterLogo/>   }
      
    </div>
  );
};

export default Home;
