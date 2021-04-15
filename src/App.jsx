import React from 'react';
import Router from './Router';
import { Header } from './components/Header/index';
//CSS適用する場合はここにimport
import "./assets/style.css"
// import "./assets/reset.css"


const App = () => {
  return(
    <>
      <Header />
      <main className="app-padding">
        <Router />
      </main>
    </>
  );
};

export default App;
