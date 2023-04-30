import Footer from "./Footer";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

function Layout({ children }) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
