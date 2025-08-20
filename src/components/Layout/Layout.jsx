import Header from '../Header/Header';

function Layout(props) {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div >
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
