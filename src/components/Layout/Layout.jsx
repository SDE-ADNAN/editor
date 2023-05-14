import Header from '../Header/Header';
import classes from './Layout.module.css';

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
