import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DB from "./Util/DB";

const db = new DB("CGPET", 1);
db.open();

ReactDOM.render(
  <React.StrictMode>
    <App
      db = {db}
    />
  </React.StrictMode>,
  document.getElementById('root')
);