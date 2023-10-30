import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import styles from './App.module.scss';
import { NavBar } from "./components/landing/NavBar";
import { Foro } from "./components/landing/Foro";

import {Tutoriales} from './pages/Tutoriales'
import { Capsulas }  from './pages/Capsulas';
import { Juegos } from './pages/Juegos';

export function App() {


  return (
    <Router>
      <div className={styles.container}>
        <NavBar/>
        

        <section className={styles.contentContainer}>
          <div className={styles.content}>
            <Tutoriales/>
            <Capsulas/>
            <Juegos/>
          </div>
        </section>

        <Foro/>
      </div>
    </Router>
  );
}