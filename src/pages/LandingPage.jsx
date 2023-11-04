
import styles from './LandingPage.module.scss';

import { NavBar } from '../components/landing/NavBar';
import { Foro } from '../components/landing/Foro';
import { Tutoriales } from './Tutoriales';
import { Capsulas } from './Capsulas';
import { Juegos } from './Juegos';

import { Outlet } from 'react-router-dom';


export function LandingPage() {

    return (
    <div className={styles.container}>
        <NavBar />
        <section className={styles.contentContainer}>
        <div className={styles.content}>
            <Tutoriales />
            <Capsulas />
            <Juegos />
        </div>
        </section>
        <Foro />
    </div>
    );
  }