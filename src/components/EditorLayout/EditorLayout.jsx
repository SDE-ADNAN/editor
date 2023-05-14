import NavBar from "../EditorDesign/NavBar/NavBar";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={classes.wrapper}>
      <NavBar />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
