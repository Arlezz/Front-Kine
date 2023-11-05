
import { Link } from 'react-router-dom'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import AuthService from '../../services/Auth.service';

import styles from './NavBar.module.scss'
import { Search } from "../search/Search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faGear,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export function NavBar(){

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }
    ,[]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <nav className={`${styles.navContainer} ${styles.fixedNavBar}`}>
                <div className={styles.left}>
                    <Link to="/">
                            <div className={styles.logoBox}>
                                <h1 className={styles.index}>KineHub</h1>
                            </div>
                    </Link>
                    <div>
                        <Link to="/" onClick={() => scrollToSection("tutoriales")}>
                            <h2 className={styles.textNav}>Tutoriales</h2>
                        </Link> 
                    </div>
                    <div>
                        <Link to="/" onClick={() => scrollToSection("capsulas")}>
                            <h2 className={styles.textNav}>Capsulas</h2>
                        </Link> 
                    </div>
                    <div>
                        <Link to="/" onClick={() => scrollToSection("juegos")}>
                            <h2 className={styles.textNav}>Juegos</h2>
                        </Link> 
                    </div>
                    {currentUser && currentUser.role && currentUser.role.includes("admin") && (
                        <div>
                            <Link to="/admin">
                                <h2 className={styles.textNav}>Administrador</h2>
                            </Link> 
                        </div>
                    )}
                </div>
                <Search/>
                <div className={styles.right}>
                    <Dropdown as={ButtonGroup}>
                        <div className={styles.dropdownButon}>
                            <span onClick={() => {
                                console.log(currentUser)
                            }}>
                               {currentUser? currentUser.name : <span>usuario</span>}
                            </span>
                            <Dropdown.Toggle id="dropdown-basic">
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className={styles.dropdownIcon}/>
                            </Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu className={styles.dropdownOptions}>
                            <Link className={styles.dropdownLink} to="/profile">
                                <div className={styles.dropdownItem}>
                                    <FontAwesomeIcon
                                        icon={faGear}
                                        className={styles.dropdownOptionIcon}
                                    />
                                    <span>Perfil</span>
                                </div>
                            </Link>
                            <Dropdown.Divider />
                            <Link className={styles.dropdownLink} to="/">
                                <div className={styles.dropdownItem}>
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className={styles.dropdownOptionIcon}
                                    />
                                    <span>Cerrar Sesión</span>
                                </div>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </nav>
        </>
    )
} 
