import NavBar from "../EditorDesign/NavBar/NavBar";

function Layout(props) {
  return (
    <div className={classes.wrapper}>
      <NavBar />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
