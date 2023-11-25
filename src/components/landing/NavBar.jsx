import { Link, Navigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import AuthService from "../../services/Auth.service";

import styles from "./NavBar.module.scss";
import { Search } from "../search/Search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faGears,
  faAddressCard,
  faRightFromBracket,
  faHouse,
  faChildReaching,
  faChalkboardUser,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

export function NavBar({
  toggleForoVisibility,
  foroVisible,
  toggleSearchVisibility,
}) {
  const [currentUser, setCurrentUser] = useState({});

  const closeForo = () => {
    if (foroVisible) {
      toggleForoVisibility();
    }
    scrollToSection("tutoriales");
  };

  const toTutorials = () => {
    if (foroVisible) {
      toggleForoVisibility();
    }
    setTimeout(() => {
      scrollToSection("tutoriales");
    }, 50);
  };

  const toGames = () => {
    if (foroVisible) {
      toggleForoVisibility();
    }
    setTimeout(() => {
      scrollToSection("juegos");
    }, 50);
  };

  const toCapsules = () => {
    if (foroVisible) {
      toggleForoVisibility();
    }
    setTimeout(() => {
      scrollToSection("capsulas");
    }, 50);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.location.reload();
    AuthService.logout();
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`${styles.navContainer} ${styles.fixedNavBar}`}>
        <div className={styles.left}>
          <Link className={styles.linkMain} to="/" onClick={closeForo}>
            <div className={styles.logoBox}>
              <h1 className={styles.index}>KINEVERSO</h1>
              <span className={styles.slogan}>
                Red de aprendizaje digital kinesiología ULS
              </span>
            </div>
          </Link>
          <div>
            <Link
              className={styles.linkContent}
              to="/"
              onClick={() => toTutorials()}
            >
              <h2 className={styles.textNav}>Tutoriales</h2>
            </Link>
          </div>
          <div>
            <Link
              className={styles.linkContent}
              to="/"
              onClick={() => toCapsules()}
            >
              <h2 className={styles.textNav}>Capsulas</h2>
            </Link>
          </div>
          <div>
            <Link
              className={styles.linkContent}
              to="/"
              onClick={() => toGames()}
            >
              <h2 className={styles.textNav}>Juegos</h2>
            </Link>
          </div>
          {currentUser && currentUser.role && (
            <div>
              {currentUser.role.includes("admin") && (
                <Link className={styles.linkContent} to="/admin">
                  <h2 className={styles.textNav}>Administrador</h2>
                </Link>
              )}

              {currentUser.role.includes("profesor") && (
                <Link className={styles.linkContent} to="/admin">
                  <h2 className={styles.textNav}>Avanzado</h2>
                </Link>
              )}
            </div>
          )}
        </div>
        <div
          className={styles.rigthMQ}
          style={{ justifyContent: !toggleSearchVisibility ? "end" : "" }}
        >
          {toggleSearchVisibility ? (
            <Search className={styles.buscador} />
          ) : null}

          <div className={styles.right}>
            <Dropdown as={ButtonGroup} align="end">
              <div className={styles.dropdownButon}>
                <Dropdown.Toggle>
                  <span className={styles.dropDownText}>
                    {currentUser &&
                    currentUser.name &&
                    currentUser.name.split(" ").length >= 1 ? (
                      currentUser.name.split(" ").slice(0, 1).join(" ")
                    ) : (
                      <span>Usuario</span>
                    )}
                  </span>
                  <FontAwesomeIcon
                    icon={faBars}
                    className={styles.dropdownIcon}
                  />
                </Dropdown.Toggle>
              </div>
              <Dropdown.Menu className={styles.dropdownOptions}>
                <Dropdown.Item
                  as={Link}
                  to="/"
                  className={styles.dropdownLink}
                  onClick={() => toTutorials()}
                >
                  <div className={styles.dropdownItem}>
                    <FontAwesomeIcon
                      icon={faHouse}
                      className={styles.dropdownOptionIcon}
                    />
                    <span>Inicio</span>
                  </div>
                </Dropdown.Item>
                <div className={styles.foroLink}>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    className={styles.dropdownLink}
                    onClick={toggleForoVisibility}
                    to="/"
                  >
                    <div className={styles.dropdownItem}>
                      <FontAwesomeIcon
                        icon={faComments}
                        className={styles.dropdownOptionIcon}
                      />
                      <span>Foro</span>
                    </div>
                  </Dropdown.Item>
                </div>
                <div className={styles.foroLink}>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    className={styles.dropdownLink}
                    onClick={() => toTutorials()}
                    to="/"
                  >
                    <div className={styles.dropdownItem}>
                      <FontAwesomeIcon
                        icon={faChildReaching}
                        className={styles.dropdownOptionIcon}
                      />
                      <span>Tutoriales</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    className={styles.dropdownLink}
                    onClick={() => toCapsules()}
                    to="/"
                  >
                    <div className={styles.dropdownItem}>
                      <FontAwesomeIcon
                        icon={faChalkboardUser}
                        className={styles.dropdownOptionIcon}
                      />
                      <span>Capsulas</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    className={styles.dropdownLink}
                    onClick={() => toGames()}
                    to="/"
                  >
                    <div className={styles.dropdownItem}>
                      <FontAwesomeIcon
                        icon={faGamepad}
                        className={styles.dropdownOptionIcon}
                      />
                      <span>Juegos</span>
                    </div>
                  </Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item
                  as={Link}
                  to="/profile"
                  className={styles.dropdownLink}
                >
                  <div className={styles.dropdownItem}>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className={styles.dropdownOptionIcon}
                    />
                    <span>Perfil</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />

                {currentUser &&
                  currentUser.role &&
                  currentUser.role.includes("admin") && (
                    <div className={styles.dropdownAdmin}>
                      <Dropdown.Item
                        as={Link}
                        className={styles.dropdownLink}
                        to="/admin"
                      >
                        <div className={styles.dropdownItem}>
                          <FontAwesomeIcon
                            icon={faGears}
                            className={styles.dropdownOptionIcon}
                          />
                          <span>Administrador</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </div>
                  )}

                <Dropdown.Item as={Link} className={styles.dropdownLink}>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className={styles.dropdownOptionIcon}
                    />
                    <span>Cerrar Sesión</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}
