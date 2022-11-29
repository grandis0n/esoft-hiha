import React from "react";
import { Link } from "react-router-dom";
import classes from './MyNavBar.module.css'

const MyNavBar = () => {
    return(
        <div className={classes.MyNvBr}>
            <img className= {classes.MyLogo} src="/resources/logo.png" alt="logo"/>
            <ul className = {classes.MyList}>
                <li>
                    <Link className={classes.MyLink} to="/clients">Клиенты</Link>
                </li>
                <li>
                    <Link className={classes.MyLink} to="/agents">Риэлторы</Link>
                </li>
                <li>
                    <Link className={classes.MyLink} to="/realties">Недвижимость</Link>
                </li>
                <li>
                    <Link className={classes.MyLink} to="/suggestions">Предложения</Link>
                </li>
            
                <li>
                    <Link className={classes.MyLink} to="/demands">Потребности</Link>
                </li>

                <li>
                    <Link className={classes.MyLink} to="/deals">Сделки</Link>
                </li>
            </ul>
        </div>
    );
};

export default MyNavBar;