import { Outlet } from "react-router";
import Header from './Header';
import classes from './DefaultLayout.module.css';
const DefaultLayout = () => {
    return (
        <>
            {/* <div className={classes.menu}> */}
                <Header />
            {/* </div> */}
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;