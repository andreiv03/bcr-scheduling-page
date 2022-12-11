import Image from "next/image";
import styles from "styles/components/footer-logo.module.scss";

const FooterLogo: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <Image
        className={styles["footer-type"]}
        width={80}
        height={30}
        src="/BCR_logo_1.png"
        alt="/"
      />
    </main>
  );
};

export default FooterLogo;
