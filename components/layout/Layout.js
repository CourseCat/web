import { Container } from "@mui/material";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <Container className={styles.main}>{children}</Container>
      <Footer />
    </>
  );
}

export default Layout;
